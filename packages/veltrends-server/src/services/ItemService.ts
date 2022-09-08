import { Item, ItemLike, ItemStats, Publisher, User } from '@prisma/client'
import algolia from '../lib/algolia.js'
import AppError from '../lib/AppError.js'
import NextAppError from '../lib/NextAppError.js'
import db from '../lib/db.js'
import { extractPageInfo } from '../lib/extractPageInfo.js'
import { createPagination, PaginationOptionType } from '../lib/pagination.js'
import { calculateRankingScore } from '../lib/ranking.js'
import { CreateItemBodyType, ItemType } from '../routes/api/items/schema.js'

class ItemService {
  private static instance: ItemService
  public static getInstance() {
    if (!ItemService.instance) {
      ItemService.instance = new ItemService()
    }
    return ItemService.instance
  }

  private async getPublisher({ favicon, domain, name }: GetPublisherParams) {
    const exists = await db.publisher.findUnique({
      where: {
        domain,
      },
    })
    if (exists) {
      return exists
    }
    const publisher = await db.publisher.create({
      data: {
        domain,
        name,
        favicon,
      },
    })
    return publisher
  }

  async createItem(
    userId: number,
    { title, body, link, tags }: CreateItemBodyType,
  ) {
    const info = await extractPageInfo(link)
    const publisher = await this.getPublisher({
      domain: info.domain,
      favicon: info.favicon,
      name: info.publisher,
    })
    const item = await db.item.create({
      data: {
        title,
        body,
        link: info.url,
        userId,
        thumbnail: info.thumbnail,
        author: info.author ?? undefined,
        publisherId: publisher.id,
      },
      include: {
        user: true,
        publisher: true,
      },
    })

    const itemStats = await db.itemStats.create({
      data: {
        itemId: item.id,
      },
    })
    const itemWithItemStats = { ...item, itemStats }

    const itemLikedMap = userId
      ? await this.getItemLikedMap({ itemIds: [item.id], userId })
      : null

    algolia
      .sync({
        id: item.id,
        author: item.author,
        body: item.body,
        link: item.link,
        thumbnail: item.thumbnail,
        title: item.title,
        username: item.user.username,
        publisher: item.publisher,
      })
      .catch(console.error)

    return this.mergeItemLiked(itemWithItemStats, itemLikedMap?.[item.id])
  }

  async getItem(id: number, userId: number | null = null) {
    const item = await db.item.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        publisher: true,
        itemStats: true,
      },
    })
    if (!item) {
      throw new AppError('NotFoundError')
    }

    const itemLikedMap = userId
      ? await this.getItemLikedMap({ itemIds: [id], userId })
      : null

    return this.mergeItemLiked(item, itemLikedMap?.[id])
  }

  private mergeItemLiked<T extends Item>(item: T, itemLike?: ItemLike) {
    return {
      ...item,
      isLiked: !!itemLike,
    }
  }

  async getRecentItems({
    limit,
    cursor,
  }: {
    limit: number
    cursor?: number | null
  }) {
    const [totalCount, list] = await Promise.all([
      db.item.count(),
      db.item.findMany({
        orderBy: {
          id: 'desc',
        },
        where: {
          id: cursor
            ? {
                lt: cursor,
              }
            : undefined,
        },
        include: {
          user: true,
          publisher: true,
          itemStats: true,
        },
        take: limit,
      }),
    ])

    const endCursor = list.at(-1)?.id ?? null
    const hasNextPage = endCursor
      ? (await db.item.count({
          where: {
            id: {
              lt: endCursor,
            },
          },
          orderBy: {
            id: 'desc',
          },
        })) > 0
      : false

    return { totalCount, list, endCursor, hasNextPage }
  }

  async getPastItems({
    limit,
    cursor,
    startDate,
    endDate,
  }: {
    limit: number
    cursor?: number | null
    startDate?: string
    endDate?: string
  }) {
    if (!startDate || !endDate) {
      throw new NextAppError('BadRequest', {
        message: 'startDate or endDate is missing',
      })
    }

    const dateDiff = new Date(endDate).getTime() - new Date(startDate).getTime()

    // throw error if not yyyy-mm-dd format
    if (
      [startDate, endDate].some((date) => !/^\d{4}-\d{2}-\d{2}$/.test(date))
    ) {
      throw new NextAppError('BadRequest', {
        message: 'startDate or endDate is not yyyy-mm-dd format',
      })
    }

    if (dateDiff > 6 * 24 * 60 * 60 * 1000) {
      throw new NextAppError('BadRequest', {
        message: 'Date range bigger than 7 days',
      })
    }

    const d1 = new Date(`${startDate} 00:00:00`)
    const d2 = new Date(`${endDate} 23:59:59`)

    const [totalCount, list] = await Promise.all([
      db.item.count({
        where: {
          createdAt: {
            gte: d1,
            lte: d2,
          },
        },
      }),
      db.item.findMany({
        orderBy: [
          {
            itemStats: {
              likes: 'desc',
            },
          },
          {
            id: 'desc',
          },
        ],
        where: {
          id: cursor
            ? {
                lt: cursor,
              }
            : undefined,
          createdAt: {
            gte: d1,
            lte: d2,
          },
        },
        include: {
          user: true,
          publisher: true,
          itemStats: true,
        },
        take: limit,
      }),
    ])

    const endCursor = list.at(-1)?.id ?? null
    const hasNextPage = endCursor
      ? (await db.item.count({
          where: {
            id: {
              lt: endCursor,
            },
            createdAt: {
              gte: d1,
              lte: d2,
            },
          },
          orderBy: [
            {
              itemStats: {
                likes: 'desc',
              },
            },
            {
              id: 'desc',
            },
          ],
        })) > 0
      : false

    return {
      totalCount,
      list,
      endCursor,
      hasNextPage,
    }
  }

  async getTrendingItems({
    limit,
    cursor,
  }: {
    limit: number
    cursor?: number | null
  }) {
    const totalCount = await db.itemStats.count({
      where: {
        score: {
          gte: 0.001,
        },
      },
    })
    const cursorItem = cursor
      ? await db.item.findUnique({
          where: { id: cursor },
          include: {
            itemStats: true,
          },
        })
      : null

    const list = await db.item.findMany({
      where: {
        ...(cursor
          ? {
              id: { lt: cursor },
            }
          : {}),
        itemStats: {
          score: {
            gte: 0.001,
            ...(cursorItem
              ? {
                  lte: cursorItem.itemStats?.score,
                }
              : {}),
          },
        },
      },
      orderBy: [
        {
          itemStats: {
            score: 'desc',
          },
        },
        {
          itemStats: {
            itemId: 'desc',
          },
        },
      ],
      include: {
        user: true,
        publisher: true,
        itemStats: true,
      },
      take: limit,
    })

    const endCursor = list.at(-1)?.id ?? null

    const hasNextPage = endCursor
      ? (await db.item.count({
          where: {
            itemStats: {
              itemId: {
                lt: endCursor,
              },
              score: {
                gte: 0.001,
                lte: list.at(-1)?.itemStats?.score,
              },
            },
          },
          orderBy: [
            {
              itemStats: {
                score: 'desc',
              },
            },
            {
              itemStats: {
                itemId: 'desc',
              },
            },
          ],
        })) > 0
      : false

    return {
      totalCount,
      list,
      endCursor,
      hasNextPage,
    }
  }

  async getItems(
    {
      mode,
      cursor,
      limit,
      userId,
      endDate,
      startDate,
    }: GetItemsParams & PaginationOptionType & { userId?: number } = {
      mode: 'recent',
    },
  ) {
    const { totalCount, endCursor, hasNextPage, list } = await (() => {
      const _limit = limit ?? 20

      if (mode === 'trending') {
        return this.getTrendingItems({ limit: _limit, cursor })
      }
      if (mode === 'past') {
        return this.getPastItems({ limit: _limit, cursor, startDate, endDate })
      }
      return this.getRecentItems({ limit: _limit, cursor })
    })()

    const itemLikedMap = userId
      ? await this.getItemLikedMap({
          itemIds: list.map((item) => item.id),
          userId: userId,
        })
      : null

    const listWithLiked = list.map((item) =>
      this.mergeItemLiked(item, itemLikedMap?.[item.id]),
    )

    return createPagination({
      list: listWithLiked,
      totalCount,
      pageInfo: {
        endCursor: hasNextPage ? endCursor : null,
        hasNextPage,
      },
    })
  }

  async getItemsByIds(itemIds: number[]) {
    const result = await db.item.findMany({
      where: {
        id: {
          in: itemIds,
        },
      },
      include: {
        user: true,
        publisher: true,
        itemStats: true,
      },
    })

    type FullItem = Item & {
      user: User
      publisher: Publisher
      itemStats: ItemStats | null
    }

    const itemMap = result.reduce<Record<number, FullItem>>((acc, item) => {
      acc[item.id] = item
      return acc
    }, {})

    return itemMap
  }

  async updateItem({ itemId, userId, title, body }: UpdateItemParams) {
    const item = await this.getItem(itemId)
    if (item.userId !== userId) {
      throw new AppError('ForbiddenError')
    }
    const updatedItem = await db.item.update({
      where: {
        id: itemId,
      },
      data: {
        title,
        body,
      },
      include: {
        user: true,
        publisher: true,
        itemStats: true,
      },
    })

    const itemLikedMap = userId
      ? await this.getItemLikedMap({ itemIds: [item.id], userId })
      : null

    algolia
      .sync({
        id: item.id,
        author: item.author,
        body: item.body,
        link: item.link,
        thumbnail: item.thumbnail,
        title: item.title,
        username: item.user.username,
        publisher: item.publisher,
      })
      .then(console.log)
      .catch(console.error)

    return this.mergeItemLiked(updatedItem, itemLikedMap?.[item.id])
  }

  async deleteItem({ userId, itemId }: ItemActionParams) {
    const item = await this.getItem(itemId)
    if (item.userId !== userId) {
      throw new AppError('ForbiddenError')
    }
    await db.item.delete({
      where: {
        id: itemId,
      },
    })
    algolia.delete(itemId).catch(console.error)
  }

  async countLikes(itemId: number) {
    const count = await db.itemLike.count({
      where: {
        itemId,
      },
    })
    return count
  }

  async updateItemLikes({ itemId, likes }: UpdateItemLikesParams) {
    return db.itemStats.update({
      data: {
        likes,
      },
      where: {
        itemId,
      },
    })
  }

  async likeItem({ userId, itemId }: ItemActionParams) {
    const alreadyLiked = await db.itemLike.findUnique({
      where: {
        itemId_userId: {
          itemId,
          userId,
        },
      },
    })
    if (!alreadyLiked) {
      try {
        await db.itemLike.create({
          data: {
            itemId,
            userId,
          },
        })
      } catch (e) {}
    }
    const likes = await this.countLikes(itemId)
    const itemStats = await this.updateItemLikes({ itemId, likes })
    this.recalculateRanking(itemId, likes).catch(console.error)
    return itemStats
  }

  async unlikeItem({ userId, itemId }: ItemActionParams) {
    try {
      await db.itemLike.delete({
        where: {
          itemId_userId: {
            itemId,
            userId,
          },
        },
      })
    } catch (e) {}

    const likes = await this.countLikes(itemId)
    const itemStats = await this.updateItemLikes({ itemId, likes })
    this.recalculateRanking(itemId, likes).catch(console.error)
    return itemStats
  }

  private async getItemLikedMap(params: GetItemLikedParams) {
    const { itemIds, userId } = params
    const list = await db.itemLike.findMany({
      where: {
        userId,
        itemId: {
          in: itemIds,
        },
      },
    })

    return list.reduce((acc, current) => {
      acc[current.itemId] = current
      return acc
    }, {} as Record<number, ItemLike>)
  }

  async recalculateRanking(itemId: number, likesCount?: number) {
    const item = await db.item.findUnique({ where: { id: itemId } })
    if (!item) return
    const likes = likesCount ?? (await this.countLikes(itemId))
    const age =
      (Date.now() - new Date(item.createdAt).getTime()) / 1000 / 60 / 60
    const score = calculateRankingScore(likes, age)
    return db.itemStats.update({
      where: {
        itemId,
      },
      data: {
        score,
      },
    })
  }
}

type GetItemsParams = {
  mode: 'trending' | 'recent' | 'past'
  startDate?: string
  endDate?: string
}

interface UpdateItemParams {
  itemId: number
  userId: number
  title: string
  body: string
}

interface ItemActionParams {
  itemId: number
  userId: number
}

interface UpdateItemLikesParams {
  itemId: number
  likes: number
}

interface GetPublisherParams {
  domain: string
  name: string
  favicon: string | null
}

interface GetItemLikedParams {
  userId: number
  itemIds: number[]
}

export default ItemService
