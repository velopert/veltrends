import { Type } from '@sinclair/typebox'
import { PaginationSchema } from '../../../lib/pagination.js'
import { createRouteSchema, RoutesType } from '../../../lib/routeSchema.js'
import { ItemSchema } from '../items/schema.js'

const BookmarkSchema = Type.Object({
  id: Type.Integer(),
  item: ItemSchema,
  createdAt: Type.String(),
})

export const BookmarksRouteSchema = createRouteSchema({
  GetBookmarks: {
    querystring: Type.Object({
      cursor: Type.Optional(Type.Number()),
    }),
    response: {
      200: PaginationSchema(BookmarkSchema),
    },
  },
  CreateBookmark: {
    body: Type.Object({
      itemId: Type.Number(),
    }),
    response: {
      200: BookmarkSchema,
    },
  },
  DeleteBookmark: {
    querystring: Type.Object({
      itemId: Type.Number(),
    }),
    response: {
      204: Type.Null(),
    },
  },
})

export type BookmarksRoute = RoutesType<typeof BookmarksRouteSchema>
