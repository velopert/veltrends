import {
  Bookmark,
  Item,
  ItemLike,
  ItemStats,
  Publisher,
  User,
} from '@prisma/client'
import algolia from '../lib/algolia.js'
import AppError from '../lib/AppError.js'
import NextAppError from '../lib/AppError.js'
import db from '../lib/db.js'
import { extractPageInfo } from '../lib/extractPageInfo.js'
import { createPagination, PaginationOptionType } from '../lib/pagination.js'
import { calculateRankingScore } from '../lib/ranking.js'

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
    {
      title,
      body,
      link,
      tags,
    }: { title: string; body: string; link: string; tags?: string[] },
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

    return this.serialize(itemWithItemStats)
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
        bookmarks: userId ? { where: { userId } } : false,
        itemLikes: userId ? { where: { userId } } : false,
      },
    })
    if (!item) {
      throw new AppError('NotFound')
    }

    return this.serialize(item)
  }

  serialize<
    T extends Item & { itemLikes?: ItemLike[]; bookmarks?: Bookmark[] },
  >(item: T) {
    return {
      ...item,
      isLiked: !!item.itemLikes?.length,
      isBookmarked: !!item.bookmarks?.length,
    }
  }

  async getRecentItems({
    limit,
    cursor,
    userId,
  }: {
    limit: number
    cursor?: number | null
    userId?: number
  }) {
    console.log({ userId })
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
          bookmarks: userId ? { where: { userId } } : false,
          itemLikes: userId ? { where: { userId } } : false,
        },
        take: limit,
      }),
    ])

    console.log(JSON.stringify(list[0], null, 2))

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
    userId,
  }: {
    limit: number
    cursor?: number | null
    startDate?: string
    endDate?: string
    userId?: number
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

    const cursorItem = cursor
      ? await db.item.findUnique({
          where: { id: cursor },
          include: {
            itemStats: true,
          },
        })
      : null

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
          itemStats: cursorItem
            ? {
                likes: {
                  lte: cursorItem.itemStats?.likes ?? 0,
                },
              }
            : undefined,
        },
        include: {
          user: true,
          publisher: true,
          itemStats: true,
          bookmarks: userId ? { where: { userId } } : false,
          itemLikes: userId ? { where: { userId } } : false,
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
    userId,
  }: {
    limit: number
    cursor?: number | null
    userId?: number
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
        bookmarks: userId ? { where: { userId } } : false,
        itemLikes: userId ? { where: { userId } } : false,
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
        return this.getTrendingItems({ limit: _limit, cursor, userId })
      }
      if (mode === 'past') {
        return this.getPastItems({
          limit: _limit,
          cursor,
          startDate,
          endDate,
          userId,
        })
      }
      return this.getRecentItems({ limit: _limit, cursor, userId })
    })()

    const serializedList = list.map(this.serialize)

    return createPagination({
      list: serializedList,
      totalCount,
      pageInfo: {
        endCursor: hasNextPage ? endCursor : null,
        hasNextPage,
      },
    })
  }

  async getItemsByIds(itemIds: number[], userId?: number) {
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
        bookmarks: userId ? { where: { userId } } : false,
        itemLikes: userId ? { where: { userId } } : false,
      },
    })

    type FullItem = Item & {
      user: User
      publisher: Publisher
      itemStats: ItemStats | null
    }

    const itemMap = result.reduce<Record<number, FullItem>>((acc, item) => {
      acc[item.id] = this.serialize(item)
      return acc
    }, {})

    return itemMap
  }

  async updateItem({ itemId, userId, title, body }: UpdateItemParams) {
    const item = await this.getItem(itemId)
    if (item.userId !== userId) {
      throw new AppError('Forbidden')
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
        bookmarks: userId ? { where: { userId } } : false,
        itemLikes: userId ? { where: { userId } } : false,
      },
    })

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

    return this.serialize(updatedItem)
  }

  async deleteItem({ userId, itemId }: ItemActionParams) {
    const item = await this.getItem(itemId)
    if (item.userId !== userId) {
      throw new AppError('Forbidden')
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
