import { Bookmark } from '@prisma/client'
import db from '../lib/db.js'
import AppError from '../lib/AppError.js'
import itemService from './item.service.js'

const bookmarkService = {
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
              itemLikes: userId ? { where: { userId } } : false,
            },
          },
        },
      })

      return {
        ...bookmark,
        item: { ...itemService.serialize(bookmark.item), isBookmarked: true },
      }
    } catch (e) {
      if ((e as any)?.message?.includes(['Unique constraint failed'])) {
        throw new AppError('AlreadyExists')
      }
      throw e
    }
  },
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
            itemLikes: userId ? { where: { userId } } : false,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    })

    const list = bookmarks.map((b) => ({
      ...b,
      item: { ...itemService.serialize(b.item), isBookmarked: true },
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
  },

  async deleteBookmark({ userId, itemId }: { userId: number; itemId: number }) {
    const bookmark = await db.bookmark.findUnique({
      where: {
        userId_itemId: {
          itemId,
          userId,
        },
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
        userId_itemId: {
          itemId,
          userId,
        },
      },
    })
  },

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
  },
}

export default bookmarkService
