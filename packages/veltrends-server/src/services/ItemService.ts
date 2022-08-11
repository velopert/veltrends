import { Item, ItemLike, ItemStats } from '@prisma/client'
import AppError from '../lib/AppError.js'
import db from '../lib/db.js'
import { extractPageInfo } from '../lib/extractPageInfo.js'
import { createPagination, PaginationOptionType } from '../lib/pagination.js'
import { CreateItemBodyType } from '../routes/api/items/schema.js'

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

  async getPublicItems(
    params: GetPublicItemsParams &
      PaginationOptionType & { userId?: number } = { mode: 'recent' },
  ) {
    const limit = params.limit ?? 20
    if (params.mode === 'recent') {
      const [totalCount, list] = await Promise.all([
        db.item.count(),
        db.item.findMany({
          orderBy: {
            createdAt: 'desc',
          },
          where: {
            id: params.cursor
              ? {
                  lt: params.cursor,
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
      const itemLikedMap = params.userId
        ? await this.getItemLikedMap({
            itemIds: list.map((item) => item.id),
            userId: params.userId,
          })
        : null
      const listWithLiked = list.map((item) =>
        this.mergeItemLiked(item, itemLikedMap?.[item.id]),
      )

      const endCursor = list.at(-1)?.id ?? null
      const hasNextPage = endCursor
        ? (await db.item.count({
            where: {
              id: {
                lt: endCursor,
              },
            },
            orderBy: {
              createdAt: 'desc',
            },
          })) > 0
        : false

      return createPagination({
        list: listWithLiked,
        totalCount,
        pageInfo: {
          endCursor,
          hasNextPage,
        },
      })
    }
    return []
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
    return itemStats
  }

  async unlikeItem({ userId, itemId }: ItemActionParams) {
    await db.itemLike.delete({
      where: {
        itemId_userId: {
          itemId,
          userId,
        },
      },
    })
    const likes = await this.countLikes(itemId)
    const itemStats = await this.updateItemLikes({ itemId, likes })
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
}

type GetPublicItemsParams =
  | {
      mode: 'trending' | 'recent'
    }
  | {
      mode: 'past'
      date: string
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
