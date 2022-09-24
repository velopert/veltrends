import { Type } from '@sinclair/typebox'
import { FastifySchema } from 'fastify'
import { PaginationSchema } from '../../../lib/pagination.js'
import {
  createRouteSchema,
  routeSchema,
  RoutesType,
} from '../../../lib/routeSchema.js'
import { Nullable } from '../../../lib/typebox.js'

const SearchQuerySchema = Type.Object({
  q: Type.String(),
  offset: Type.Optional(Type.Integer()),
  limit: Type.Optional(Type.Integer()),
})

const SearchResultItemSchema = Type.Object({
  id: Type.Number(),
  link: Type.String(),
  publisher: Type.Object({
    name: Type.String(),
    favicon: Nullable(Type.String()),
    domain: Type.String(),
  }),
  author: Nullable(Type.String()),
  likes: Type.Number(),
  title: Type.String(),
  body: Type.String(),
  highlight: Type.Object({
    title: Type.String(),
    body: Type.String(),
  }),
})

export const searchSchema = routeSchema({
  tags: ['search'],
  querystring: SearchQuerySchema,
  response: {
    200: PaginationSchema(SearchResultItemSchema),
  },
})
