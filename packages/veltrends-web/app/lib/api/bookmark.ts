import { fetchClient } from '../client'
import { type GetBookmarksResult, type Bookmark } from './types'

export async function createBookmark(itemId: number, controller?: AbortController) {
  const response = await fetchClient.post<Bookmark>(
    '/api/bookmarks',
    { itemId },
    {
      signal: controller?.signal,
    },
  )
  return response.data
}

export async function deleteBookmark(itemId: number, controller?: AbortController) {
  const response = await fetchClient.delete('/api/bookmarks', {
    signal: controller?.signal,
    params: { itemId },
  })
  return response.data
}

export async function getBookmarks(cursor?: number) {
  const response = await fetchClient.get<GetBookmarksResult>('/api/bookmarks', {
    params: { cursor },
  })
  return response.data
}
