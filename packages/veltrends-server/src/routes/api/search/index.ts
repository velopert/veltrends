import { FastifyPluginAsync } from 'fastify'
import algolia from '../../../lib/algolia.js'
import ItemService from '../../../services/ItemService.js'
import { SearchRoute, SearchRouteSchema } from './schema.js'
import sanitize from 'sanitize-html'

export const searchRoute: FastifyPluginAsync = async (fastify) => {
  const itemService = ItemService.getInstance()

  fastify.get<SearchRoute['Search']>(
    '/',
    { schema: SearchRouteSchema.Search },
    async (request) => {
      const { q, limit, offset } = request.query
      const hits = await algolia.search(q, { length: limit, offset })
      const items = await itemService.getItemsByIds(
        hits.list.map((item) => item.id),
        request.user?.id,
      )
      const serializedList = hits.list
        .map((hit) => {
          const item = items[hit.id]
          if (!item) return null
          return {
            id: item.id,
            link: item.link,
            author: item.author === '' ? null : item.author,
            publisher: item.publisher,
            likes: item.itemStats?.likes,
            title: item.title,
            body: item.body,
            highlight: {
              title: sanitize(hit._highlightResult?.title?.value) ?? null,
              body: sanitize(hit._highlightResult?.body?.value) ?? null,
            },
          }
        })
        .filter((item) => item !== null)

      return { ...hits, list: serializedList }
    },
  )
}
