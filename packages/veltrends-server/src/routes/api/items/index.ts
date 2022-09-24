import { FastifyPluginAsync } from 'fastify'
import { FastifyPluginAsyncTypebox } from '../../../lib/types.js'
import requireAuthPlugin, {
  createAuthorizedRoute,
} from '../../../plugins/requireAuthPlugin.js'
import ItemService from '../../../services/ItemService.js'
import { commentsRoute } from './comments/index.js'
import {
  deleteItemSchema,
  getItemSchema,
  getItemsSchema,
  likeItemSchema,
  unlikeItemSchema,
  updateItemSchema,
  writeItemSchema,
} from './schema.js'

export const itemsRoute: FastifyPluginAsyncTypebox = async (fastify) => {
  const itemService = ItemService.getInstance()

  fastify.register(authorizedItemRoute)
  fastify.get('/:id', { schema: getItemSchema }, async (request) => {
    const { id } = request.params
    const item = await itemService.getItem(id, request.user?.id)

    return item as any
  })

  fastify.get('/', { schema: getItemsSchema }, async (request) => {
    const { cursor, mode, startDate, endDate } = request.query
    return itemService.getItems({
      mode: mode ?? 'recent',
      cursor: cursor ?? null,
      userId: request.user?.id,
      limit: 20,
      startDate,
      endDate,
    }) as any
  })

  fastify.register(commentsRoute, { prefix: '/:id/comments' })
}

const authorizedItemRoute = createAuthorizedRoute(async (fastify) => {
  const itemService = ItemService.getInstance()
  fastify.post('/', { schema: writeItemSchema }, async (request) => {
    const item = await itemService.createItem(request.user!.id, request.body)
    return item as any
  })

  fastify.patch('/:id', { schema: updateItemSchema }, async (request) => {
    const { id: itemId } = request.params
    const userId = request.user!.id
    const { title, body } = request.body

    return itemService.updateItem({
      itemId,
      userId,
      title,
      body,
    }) as any
  })

  fastify.delete(
    '/:id',
    { schema: deleteItemSchema },
    async (request, response) => {
      const { id: itemId } = request.params
      const userId = request.user!.id

      await itemService.deleteItem({ itemId, userId })
      response.status(204)
    },
  )

  fastify.post('/:id/likes', { schema: likeItemSchema }, async (request) => {
    const { id: itemId } = request.params
    const userId = request.user!.id
    const itemStats = await itemService.likeItem({ userId, itemId })
    return { id: itemId, itemStats, isLiked: true }
  })
  fastify.delete(
    '/:id/likes',
    { schema: unlikeItemSchema },
    async (request) => {
      const { id: itemId } = request.params
      const userId = request.user!.id
      const itemStats = await itemService.unlikeItem({ userId, itemId })
      return { id: itemId, itemStats, isLiked: false }
    },
  )
})
