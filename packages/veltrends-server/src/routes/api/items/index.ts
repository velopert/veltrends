import { FastifyPluginAsync } from 'fastify'
import requireAuthPlugin, {
  createAuthorizedRoute,
} from '../../../plugins/requireAuthPlugin.js'
import ItemService from '../../../services/ItemService.js'
import {
  DeleteItemRoute,
  DeleteItemSchema,
  GetItemRoute,
  GetItemSchema,
  GetItemsRoute,
  GetItemsSchema,
  UpdateItemRoute,
  UpdateItemSchema,
  WriteItemRoute,
  WriteItemSchema,
} from './schema.js'

export const itemsRoute: FastifyPluginAsync = async (fastify) => {
  const itemService = ItemService.getInstance()

  fastify.register(authorizedItemRoute)
  fastify.get<GetItemRoute>(
    '/:id',
    { schema: GetItemSchema },
    async (request) => {
      const { id } = request.params
      const item = await itemService.getItem(id)

      return item
    },
  )

  fastify.get<GetItemsRoute>(
    '/',
    { schema: GetItemsSchema },
    async (request) => {
      const { cursor } = request.query
      return itemService.getPublicItems({
        mode: 'recent',
        cursor: cursor ? parseInt(cursor, 10) : null,
      })
    },
  )
}

const authorizedItemRoute = createAuthorizedRoute(async (fastify) => {
  const itemService = ItemService.getInstance()
  fastify.post<WriteItemRoute>(
    '/',
    { schema: WriteItemSchema },
    async (request) => {
      const item = await itemService.createItem(request.user!.id, request.body)
      return item
    },
  )

  fastify.patch<UpdateItemRoute>(
    '/:id',
    { schema: UpdateItemSchema },
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

  fastify.delete<DeleteItemRoute>(
    '/:id',
    { schema: DeleteItemSchema },
    async (request, response) => {
      const { id: itemId } = request.params
      const userId = request.user!.id

      await itemService.deleteItem({ itemId, userId })
      response.status(204)
    },
  )
})
