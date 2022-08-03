import { client } from '../client'
import { type Item } from './types'

export async function createItem(params: CreateItemParams) {
  const response = await client.post<Item>('/api/items', params)
  return response.data
}

interface CreateItemParams {
  link: string
  title: string
  body: string
}
