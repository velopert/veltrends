import { FastifyPluginAsync } from 'fastify'
import algolia from '../../../lib/algolia.js'
import { searchSchema } from './schema.js'
import sanitize from 'sanitize-html'
import { FastifyPluginAsyncTypebox } from '../../../lib/types.js'
import { Type } from '@sinclair/typebox'
import itemService from '../../../services/item.service.js'

export const searchRoute: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.get('/', { schema: searchSchema }, async (request) => {
    const { q, limit, offset } = request.query
    const hits = await algolia.search(q, { length: limit, offset })
    const items = await itemService.getItemsByIds(
      hits.list.map((item) => item.id),
      request.user?.id,
    )
    const serializedList = hits.list
      .filter((item) => items[item.id])
      .map((hit) => {
        const item = items[hit.id]
        return {
          id: item.id,
          link: item.link!,
          author: item.author === '' ? null : item.author,
          publisher: item.publisher,
          likes: item.itemStats?.likes ?? 0,
          title: item.title,
          body: item.body,
          highlight: {
            title: sanitize(hit._highlightResult?.title?.value ?? '') ?? null,
            body: sanitize(hit._highlightResult?.body?.value ?? '') ?? null,
          },
        }
      })

    return { ...hits, list: serializedList }
  })
}
