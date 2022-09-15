interface Pagination<T> {
  list: T[]
  totalCount: number
  pageInfo: PageInfo
}

export type GetItemsResult = Pagination<Item>

export interface Item {
  id: number
  title: string
  body: string
  link: string
  thumbnail: string | null
  createdAt: string
  updatedAt: string
  author: string
  user: User
  publisher: Publisher
  itemStats: ItemStats
  isLiked: boolean
  isBookmarked: boolean
}

export interface ItemStats {
  id: number
  likes: number
  commentsCount: number
}

export interface Publisher {
  id?: number
  name: string
  domain: string
  favicon: string | null
}

export interface User {
  id: number
  username: string
}

export interface PageInfo {
  nextOffset?: number | null
  endCursor?: number | null
  hasNextPage: boolean
}

export interface LikeItemResult {
  id: number
  itemStats: ItemStats
  isLiked: boolean
}

export type UnlikeItemResult = LikeItemResult

export interface Comment {
  id: number
  text: string
  createdAt: string
  updatedAt: string
  likes: number
  subcommentsCount: number
  user: User
  mentionUser: User | null
  subcomments?: Comment[]
  isLiked: boolean
  isDeleted: boolean
}

export interface User {
  id: number
  username: string
}

export interface LikeCommentResult {
  id: number
  likes: number
}

export type UnlikeCommentResult = LikeCommentResult

export interface SearchResultItem {
  id: number
  link: string
  publisher: Publisher
  author: null
  likes: number
  title: string
  body: string
  highlight: Highlight
}

export interface Highlight {
  title: string
  body: string
}

export type SearchItemsResult = Pagination<SearchResultItem>

export type ListMode = 'recent' | 'trending' | 'past'

export interface Bookmark {
  id: number
  item: Item
  createdAt: string
}

export type GetBookmarksResult = Pagination<Bookmark>
