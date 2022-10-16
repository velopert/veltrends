import { Publisher } from '@prisma/client'
import algoliasearch from 'algoliasearch'
import { ItemType } from '../routes/api/items/schema.js'
import { PaginationType } from './pagination.js'

const isAlgoliaDisabled = process.env.ALGOLIA_DISABLED === 'true'

if (!process.env.ALGOLIA_APP_ID && !isAlgoliaDisabled) {
  throw new Error('ALGOLIA_APP_ID is not set')
}

if (!process.env.ALGOLIA_ADMIN_KEY && !isAlgoliaDisabled) {
  throw new Error('ALGOLIA_ADMIN_KEY is not set')
}

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID!,
  process.env.ALGOLIA_ADMIN_KEY!,
)

const index = client.initIndex('veltrends_items')

const algolia = {
  async search(query: string, { offset = 0, length = 20 }: SearchOption = {}) {
    if (isAlgoliaDisabled) {
      return {
        list: [],
        totalCount: 0,
        nextOffset: null,
        hasNextPage: false,
      }
    }
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
  sync(item: ItemSchemaForAlgolia) {
    if (isAlgoliaDisabled) return
    return index.saveObject({ ...item, objectID: item.id })
  },
  delete(objectID: number) {
    if (isAlgoliaDisabled) return
    return index.deleteObject(objectID.toString())
  },
}

interface SearchOption {
  offset?: number
  length?: number
}

interface ItemSchemaForAlgolia {
  id: number
  title: string
  body: string
  author: string | null
  link: string | null
  thumbnail: string | null
  username: string
  publisher: Publisher
}

export default algolia
