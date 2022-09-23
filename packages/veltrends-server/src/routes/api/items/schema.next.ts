import { Type } from '@sinclair/typebox'
import { PaginationSchema } from '../../../lib/pagination.js'
import { createRouteSchema, RoutesType } from '../../../lib/routeSchema.js'
import { Nullable } from '../../../lib/typebox.js'
import { UserSchema } from '../../../schema/userSchema.js'

const ItemStatsSchema = Type.Object({
  id: Type.Integer(),
  likes: Type.Integer(),
  commentsCount: Type.Integer(),
})

ItemStatsSchema.example = {
  id: 1,
  likes: 10,
}

export const ItemSchema = Type.Object({
  id: Type.Integer(),
  title: Type.String(),
  body: Type.String(),
  link: Type.String(),
  thumbnail: Nullable(Type.String()),
  createdAt: Type.String(),
  updatedAt: Type.String(),
  author: Type.String(),
  user: UserSchema,
  publisher: Type.Object({
    id: Type.Integer(),
    name: Type.String(),
    domain: Type.String(),
    favicon: Nullable(Type.String()),
  }),
  itemStats: ItemStatsSchema,
  isLiked: Type.Boolean(),
  isBookmarked: Type.Boolean(),
})

ItemSchema.example = {
  id: 1,
  title: 'HLELLO',
  body: 'hohohlalal',
  link: 'https://velog.io',
  thumbnail: null,
  createdAt: '2022-07-29T14:42:40.827Z',
  updatedAt: '2022-07-29T14:42:40.827Z',
  user: {
    id: 1,
    username: 'velooo',
  },
  itemStats: {
    id: 1,
    likes: 1,
  },
  isLiked: true,
}

const ItemParamsSchema = Type.Object({
  id: Type.Integer(),
})

const ItemLikeSchema = Type.Object({
  id: Type.Integer(),
  itemStats: ItemStatsSchema,
  isLiked: Type.Boolean(),
})

export const ItemsRouteSchema = createRouteSchema({
  GetItem: {
    tags: ['item'],
    params: ItemParamsSchema,
    response: {
      200: ItemSchema,
    },
  },
  GetItems: {
    tags: ['item'],
    querystring: Type.Object({
      cursor: Type.Optional(Type.Integer()),
      mode: Type.Optional(
        Type.Union([
          Type.Literal('recent'),
          Type.Literal('trending'),
          Type.Literal('past'),
        ]),
      ),
      startDate: Type.Optional(Type.String()),
      endDate: Type.Optional(Type.String()),
    }),
    response: {
      200: PaginationSchema(ItemSchema),
    },
  },
  WriteItem: {
    tags: ['item'],
    body: Type.Object({
      title: Type.String(),
      body: Type.String(),
      link: Type.String(),
      tags: Type.Optional(Type.Array(Type.String())),
    }),
    response: {
      200: ItemSchema,
    },
  },
  UpdateItem: {
    tags: ['item'],
    params: ItemParamsSchema,
    body: Type.Object({
      title: Type.String(),
      body: Type.String(),
      tags: Type.Array(Type.String()),
    }),
    response: {
      200: ItemSchema,
    },
  },
  DeleteItem: {
    tags: ['item'],
    params: ItemParamsSchema,
    response: {
      204: Type.Null(),
    },
  },
  LikeItem: {
    tags: ['item'],
    params: ItemParamsSchema,
    response: {
      200: ItemLikeSchema,
    },
  },
  UnlikeItem: {
    tags: ['item'],
    params: ItemParamsSchema,
    response: {
      200: ItemLikeSchema,
    },
  },
})

export type ItemsRoute = RoutesType<typeof ItemsRouteSchema>
