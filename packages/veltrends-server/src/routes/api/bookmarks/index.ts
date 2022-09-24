import { FastifyPluginAsync } from 'fastify'
import requireAuthPlugin, {
  createAuthorizedRoute,
} from '../../../plugins/requireAuthPlugin.js'
import BookmarkService from '../../../services/BookmarkService.js'
import {
  createBookmarkSchema,
  deleteBookmarkSchema,
  getBookmarksSchema,
} from './schema.js'

export const bookmarksRoute = createAuthorizedRoute(async (fastify) => {
  const bookmarkService = BookmarkService.getInstance()

  fastify.post('/', { schema: createBookmarkSchema }, async (request) => {
    const { itemId } = request.body
    const userId = request.user?.id!
    return bookmarkService.createBookmark({ itemId, userId }) as any
  })

  fastify.get('/', { schema: getBookmarksSchema }, async (request) => {
    const userId = request.user?.id!
    return bookmarkService.getBookmarks({
      userId,
      limit: 5,
      cursor: request.query.cursor,
    }) as any
  })

  fastify.delete(
    '/',
    { schema: deleteBookmarkSchema },
    async (request, reply) => {
      const { itemId } = request.query
      const userId = request.user?.id!
      await bookmarkService.deleteBookmark({ itemId, userId })
      reply.status(204)
    },
  )
})
