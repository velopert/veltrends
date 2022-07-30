import { Static, TSchema, Type } from '@sinclair/typebox'
import { Nullable } from './typebox.js'

export const PaginationSchema = <T extends TSchema>(type: T) =>
  Type.Object({
    list: Type.Array(type),
    totalCount: Type.Integer(),
    pageInfo: Type.Object({
      endCursor: Nullable(Type.Integer()),
      hasNextPage: Type.Boolean(),
    }),
  })

export interface PaginationType<T> {
  list: T[]
  totalCount: number
  pageInfo: {
    endCursor: number | null
    hasNextPage: boolean
  }
}

export const PaginationOptionSchema = Type.Object({
  limit: Type.Optional(Nullable(Type.Integer())),
  cursor: Type.Optional(Nullable(Type.Integer())),
})

export type PaginationOptionType = Static<typeof PaginationOptionSchema>

export function createPagination<T>(params: PaginationType<T>) {
  return params
}
