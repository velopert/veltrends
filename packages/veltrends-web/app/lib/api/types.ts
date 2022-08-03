export interface Item {
  id: number
  title: string
  body: string
  link: string
  thumbnail: string | null
  createdAt: string
  updatedAt: string
  user: User
}

export interface User {
  id: number
  username: string
}
