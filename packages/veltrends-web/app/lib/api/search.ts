import { fetchClient } from '../client'
import { type SearchItemsResult } from './types'

export async function searchItems({ q, offset }: { q: string; offset?: number }) {
  const response = await fetchClient.get<SearchItemsResult>('/api/search', {
    params: {
      q,
      offset,
    },
  })
  return response.data
}
