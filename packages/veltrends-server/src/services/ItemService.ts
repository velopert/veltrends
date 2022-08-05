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

  private async getPublisher({ favicon, domain, name }: getPublisherParams) {
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
    return item
  }

  async getItem(id: number) {
    const item = await db.item.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        publisher: true,
      },
    })
    if (!item) {
      throw new AppError('NotFoundError')
    }
    return item
  }

  async getPublicItems(
    params: GetPublicItemsParams & PaginationOptionType = { mode: 'recent' },
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
              createdAt: 'desc',
            },
          })) > 0
        : false

      return createPagination({
        list,
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
      },
    })
    return updatedItem
  }

  async deleteItem({ userId, itemId }: DeleteItemParams) {
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

interface DeleteItemParams {
  itemId: number
  userId: number
}

interface getPublisherParams {
  domain: string
  name: string
  favicon: string | null
}

export default ItemService
