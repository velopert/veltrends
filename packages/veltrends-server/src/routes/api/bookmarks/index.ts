import { FastifyPluginAsync } from 'fastify'
import requireAuthPlugin, {
  createAuthorizedRoute,
} from '../../../plugins/requireAuthPlugin.js'
import BookmarkService from '../../../services/BookmarkService.js'
import { BookmarksRoute, BookmarksRouteSchema } from './schema.js'

export const bookmarksRoute = createAuthorizedRoute(async (fastify) => {
  const bookmarkService = BookmarkService.getInstance()

  fastify.post<BookmarksRoute['CreateBookmark']>(
    '/',
    { schema: BookmarksRouteSchema.CreateBookmark },
    async (request) => {
      const { itemId } = request.body
      const userId = request.user?.id!
      return bookmarkService.createBookmark({ itemId, userId })
    },
  )

  fastify.get<BookmarksRoute['GetBookmarks']>(
    '/',
    { schema: BookmarksRouteSchema.GetBookmarks },
    async (request) => {
      const userId = request.user?.id!
      return bookmarkService.getBookmarks({
        userId,
        limit: 5,
        cursor: request.query.cursor,
      })
    },
  )

  fastify.delete<BookmarksRoute['DeleteBookmark']>(
    '/:bookmarkId',
    { schema: BookmarksRouteSchema.DeleteBookmark },
    async (request, reply) => {
      const { bookmarkId } = request.params
      const userId = request.user?.id!
      await bookmarkService.deleteBookmark({ bookmarkId, userId })
      reply.status(204)
    },
  )
})
