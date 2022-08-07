export interface GetItemsResult {
  list: Item[]
  totalCount: number
  pageInfo: PageInfo
}

export interface Item {
  id: number
  title: string
  body: string
  link: string
  thumbnail: string
  createdAt: string
  updatedAt: string
  author: string
  user: User
  publisher: Publisher
}

export interface Publisher {
  id: number
  name: string
  domain: string
  favicon: string | null
}

export interface User {
  id: number
  username: string
}

export interface PageInfo {
  endCursor: number | null
  hasNextPage: boolean
}
