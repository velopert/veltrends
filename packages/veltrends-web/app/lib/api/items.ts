import { client } from '../client'
import {
  type Item,
  type GetItemsResult,
  type LikeItemResult,
  type Comment,
  type LikeCommentResult,
  type UnlikeCommentResult,
} from './types'
import qs from 'qs'

export async function createItem(params: CreateItemParams) {
  const response = await client.post<Item>('/api/items', params)
  return response.data
}

export async function getItems(cursor?: number) {
  const response = await client.get<GetItemsResult>(
    '/api/items'.concat(
      qs.stringify(
        { cursor },
        {
          addQueryPrefix: true,
        },
      ),
    ),
  )
  return response.data
}

export async function getItem(itemId: number) {
  const response = await client.get<Item>(`/api/items/${itemId}`)
  return response.data
}

export async function likeItem(itemId: number, controller?: AbortController) {
  const response = await client.post<LikeItemResult>(
    `/api/items/${itemId}/likes`,
    {},
    {
      signal: controller?.signal,
    },
  )
  return response.data
}

export async function unlikeItem(itemId: number, controller?: AbortController) {
  const response = await client.delete<LikeItemResult>(`/api/items/${itemId}/likes`, {
    signal: controller?.signal,
  })
  return response.data
}

export async function updateItem({
  itemId,
  title,
  body,
}: {
  itemId: number
  title: string
  body: string
}) {
  const response = await client.patch<Item>(`/api/items/${itemId}`, {
    title,
    body,
    tags: [],
  })
  return response.data
}

interface CreateItemParams {
  link: string
  title: string
  body: string
}

export async function deleteItem(itemId: number) {
  return client.delete(`/api/items/${itemId}`)
}

export async function getComments(itemId: number) {
  const response = await client.get<Comment[]>(`/api/items/${itemId}/comments`)
  return response.data
}

export async function createComment({
  itemId,
  text,
  parentCommentId,
}: {
  itemId: number
  parentCommentId?: number
  text: string
}) {
  const response = await client.post<Comment>(`/api/items/${itemId}/comments`, {
    itemId,
    parentCommentId,
    text,
  })
  return response.data
}

export async function likeComment({
  itemId,
  commentId,
  controller,
}: {
  itemId: number
  commentId: number
  controller?: AbortController
}) {
  const response = await client.post<LikeCommentResult>(
    `/api/items/${itemId}/comments/${commentId}/likes`,
    {},
    {
      signal: controller?.signal,
    },
  )
  return response.data
}

export async function unlikeComment({
  itemId,
  commentId,
  controller,
}: {
  itemId: number
  commentId: number
  controller?: AbortController
}) {
  const response = await client.delete<UnlikeCommentResult>(
    `/api/items/${itemId}/comments/${commentId}/likes`,
    {
      signal: controller?.signal,
    },
  )
  return response.data
}

export async function deleteComment({ itemId, commentId }: { itemId: number; commentId: number }) {
  const response = await client.delete(`/api/items/${itemId}/comments/${commentId}`)
  return response.data
}

export async function editComment({
  itemId,
  text,
  commentId,
}: {
  itemId: number
  commentId?: number
  text: string
}) {
  const response = await client.patch<Comment>(`/api/items/${itemId}/comments/${commentId}`, {
    itemId,
    text,
  })
  return response.data
}
