import { FastifyPluginAsync } from 'fastify'
import requireAuthPlugin, {
  createAuthorizedRoute,
} from '../../../plugins/requireAuthPlugin.js'
import ItemService from '../../../services/ItemService.js'
import { commentsRoute } from './comments/index.js'
import { ItemsRoute, ItemsRouteSchema } from './schema.js'

export const itemsRoute: FastifyPluginAsync = async (fastify) => {
  const itemService = ItemService.getInstance()

  fastify.register(authorizedItemRoute)
  fastify.get<ItemsRoute['GetItem']>(
    '/:id',
    { schema: ItemsRouteSchema.GetItem },
    async (request) => {
      const { id } = request.params
      const item = await itemService.getItem(id, request.user?.id)

      return item
    },
  )

  fastify.get<ItemsRoute['GetItems']>(
    '/',
    { schema: ItemsRouteSchema.GetItems },
    async (request) => {
      const { cursor, mode, startDate, endDate } = request.query
      return itemService.getItems({
        mode: mode ?? 'recent',
        cursor: cursor ?? null,
        userId: request.user?.id,
        limit: 20,
        startDate,
        endDate,
      })
    },
  )

  fastify.register(commentsRoute, { prefix: '/:id/comments' })
}

const authorizedItemRoute = createAuthorizedRoute(async (fastify) => {
  const itemService = ItemService.getInstance()
  fastify.post<ItemsRoute['WriteItem']>(
    '/',
    { schema: ItemsRouteSchema.WriteItem },
    async (request) => {
      const item = await itemService.createItem(request.user!.id, request.body)
      return item
    },
  )

  fastify.patch<ItemsRoute['UpdateItem']>(
    '/:id',
    { schema: ItemsRouteSchema.UpdateItem },
    async (request) => {
      const { id: itemId } = request.params
      const userId = request.user!.id
      const { title, body } = request.body

      return itemService.updateItem({
        itemId,
        userId,
        title,
        body,
      })
    },
  )

  fastify.delete<ItemsRoute['DeleteItem']>(
    '/:id',
    { schema: ItemsRouteSchema.DeleteItem },
    async (request, response) => {
      const { id: itemId } = request.params
      const userId = request.user!.id

      await itemService.deleteItem({ itemId, userId })
      response.status(204)
    },
  )

  fastify.post<ItemsRoute['LikeItem']>(
    '/:id/likes',
    { schema: ItemsRouteSchema.LikeItem },
    async (request) => {
      const { id: itemId } = request.params
      const userId = request.user!.id
      const itemStats = await itemService.likeItem({ userId, itemId })
      return { id: itemId, itemStats, isLiked: true }
    },
  )
  fastify.delete<ItemsRoute['UnlikeItem']>(
    '/:id/likes',
    { schema: ItemsRouteSchema.UnlikeItem },
    async (request) => {
      const { id: itemId } = request.params
      const userId = request.user!.id
      const itemStats = await itemService.unlikeItem({ userId, itemId })
      return { id: itemId, itemStats, isLiked: false }
    },
  )
})
