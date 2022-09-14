import { Bookmark } from '@prisma/client'
import db from '../lib/db.js'
import AppError from '../lib/NextAppError.js'
import ItemService from './ItemService.js'

class BookmarkService {
  private static instance: BookmarkService
  public static getInstance() {
    if (!BookmarkService.instance) {
      BookmarkService.instance = new BookmarkService()
    }
    return BookmarkService.instance
  }

  async createBookmark({ userId, itemId }: { userId: number; itemId: number }) {
    try {
      const bookmark = await db.bookmark.create({
        data: {
          userId,
          itemId,
        },
        include: {
          item: {
            include: {
              user: true,
              publisher: true,
              itemStats: true,
            },
          },
        },
      })

      return bookmark
    } catch (e) {
      if ((e as any)?.message?.includes(['Unique constraint failed'])) {
        throw new AppError('AlreadyExists')
      }
      throw e
    }
  }

  async getBookmarks({
    userId,
    limit,
    cursor,
  }: {
    userId: number
    limit: number
    cursor?: number | null
  }) {
    const totalCount = await db.bookmark.count({
      where: {
        userId,
      },
    })
    const cursorDate = cursor
      ? (await db.bookmark.findUnique({ where: { id: cursor } }))?.createdAt ??
        null
      : null
    const bookmarks = await db.bookmark.findMany({
      where: {
        userId,
        createdAt: cursorDate ? { lt: cursorDate } : undefined,
      },
      include: {
        item: {
          include: {
            user: true,
            publisher: true,
            itemStats: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    })

    const itemService = ItemService.getInstance()

    const list = bookmarks.map((b) => ({
      ...b,
      item: itemService.serialize(b.item),
    }))

    const endCursor = list.at(-1)?.id ?? null
    const hasNextPage = endCursor
      ? (await db.bookmark.count({
          where: {
            userId,
            createdAt: {
              lt: list.at(-1)?.createdAt,
            },
          },
        })) > 0
      : false

    return { totalCount, list, pageInfo: { endCursor, hasNextPage } }
  }

  async deleteBookmark({
    userId,
    bookmarkId,
  }: {
    userId: number
    bookmarkId: number
  }) {
    const bookmark = await db.bookmark.findUnique({
      where: {
        id: bookmarkId,
      },
    })
    if (!bookmark) {
      throw new AppError('NotFound')
    }
    if (bookmark.userId !== userId) {
      throw new AppError('Forbidden')
    }
    await db.bookmark.delete({
      where: {
        id: bookmarkId,
      },
    })
  }

  async getBookmarkMap({
    itemIds,
    userId,
  }: {
    itemIds: number[]
    userId: number
  }) {
    const bookmarks = await db.bookmark.findMany({
      where: {
        userId,
        itemId: {
          in: itemIds,
        },
      },
    })

    return bookmarks.reduce((acc, current) => {
      acc[current.itemId] = current
      return acc
    }, {} as Record<number, Bookmark>)
  }
}

export default BookmarkService
