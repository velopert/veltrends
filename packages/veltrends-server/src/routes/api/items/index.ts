import { FastifyPluginAsync } from 'fastify'
import requireAuthPlugin, {
  createAuthorizedRoute,
} from '../../../plugins/requireAuthPlugin.js'
import ItemService from '../../../services/ItemService.js'
import { WriteItemRoute, writeItemSchema } from './schema.js'

export const itemsRoute: FastifyPluginAsync = async (fastify) => {
  fastify.register(authorizedItemRoute)
  fastify.get('/', async () => {
    return 'Hola'
  })
}

const authorizedItemRoute = createAuthorizedRoute(async (fastify) => {
  const itemService = ItemService.getInstance()
  fastify.post<WriteItemRoute>(
    '/',
    { schema: writeItemSchema },
    async (request) => {
      const item = await itemService.createItem(request.user!.id, request.body)
      return item
    },
  )
})
