import { Type } from '@sinclair/typebox'
import { PaginationSchema } from '../../../lib/pagination.js'
import {
  createRouteSchema,
  routeSchema,
  RoutesType,
} from '../../../lib/routeSchema.js'
import { ItemSchema } from '../items/schema.js'

const BookmarkSchema = Type.Object({
  id: Type.Integer(),
  item: ItemSchema,
  createdAt: Type.String(),
})

export const getBookmarksSchema = routeSchema({
  tags: ['bookmarks'],
  querystring: Type.Object({
    cursor: Type.Optional(Type.Number()),
  }),
  response: {
    200: PaginationSchema(BookmarkSchema),
  },
})
export const createBookmarkSchema = routeSchema({
  tags: ['bookmarks'],
  body: Type.Object({
    itemId: Type.Number(),
  }),
  response: {
    200: BookmarkSchema,
  },
})
export const deleteBookmarkSchema = routeSchema({
  tags: ['bookmarks'],
  querystring: Type.Object({
    itemId: Type.Number(),
  }),
  response: {
    204: Type.Null(),
  },
})
