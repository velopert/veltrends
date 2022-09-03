import { client } from '../client'
import { type SearchItemsResult } from './types'

export async function searchItems({ q, offset }: { q: string; offset?: number }) {
  const response = await client.get<SearchItemsResult>('/api/search', {
    params: {
      q,
      offset,
    },
  })
  return response.data
}
