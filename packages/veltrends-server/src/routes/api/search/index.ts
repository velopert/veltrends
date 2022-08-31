import { FastifyPluginAsync } from 'fastify'
import algolia from '../../../lib/algolia.js'
import { SearchRoute, SearchRouteSchema } from './schema.js'

export const searchRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get<SearchRoute['Search']>(
    '/',
    { schema: SearchRouteSchema.Search },
    async (request) => {
      const { q, limit, offset } = request.query
      const hits = await algolia.search(q, { length: limit, offset })
      return hits
    },
  )
}
