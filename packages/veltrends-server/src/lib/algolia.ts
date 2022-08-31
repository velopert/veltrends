import algoliasearch from 'algoliasearch'
import { ItemType } from '../routes/api/items/schema.js'
import { PaginationType } from './pagination.js'

if (!process.env.ALGOLIA_APP_ID) {
  throw new Error('ALGOLIA_APP_ID is not set')
}

if (!process.env.ALGOLIA_ADMIN_KEY) {
  throw new Error('ALGOLIA_ADMIN_KEY is not set')
}

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_KEY,
)

const index = client.initIndex('veltrends_items')

const algolia = {
  async search(query: string, { offset = 0, length = 20 }: SearchOption = {}) {
    const result = await index.search<ItemType>(query, {
      offset,
      length,
    })

    const hasNextPage = offset + length < result.nbHits

    const pagination: PaginationType<typeof result.hits[0]> = {
      list: result.hits,
      totalCount: result.nbHits,
      pageInfo: {
        nextOffset: hasNextPage ? offset + length : null,
        hasNextPage,
      },
    }
    return pagination
  },
}

interface SearchOption {
  offset?: number
  length?: number
}

export default algolia
