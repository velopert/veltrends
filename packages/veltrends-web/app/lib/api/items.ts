import { client } from '../client'
import { type Item, type GetItemsResult } from './types'

export async function createItem(params: CreateItemParams) {
  const response = await client.post<Item>('/api/items', params)
  return response.data
}

export async function getItems() {
  const response = await client.get<GetItemsResult>('/api/items')
  return response.data
}

interface CreateItemParams {
  link: string
  title: string
  body: string
}
