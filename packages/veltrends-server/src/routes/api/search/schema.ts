import { Type } from '@sinclair/typebox'
import { createRouteSchema, RoutesType } from '../../../lib/routeSchema.js'

const SearchQuerySchema = Type.Object({
  q: Type.String(),
  offset: Type.Optional(Type.Integer()),
  limit: Type.Optional(Type.Integer()),
})

export const SearchRouteSchema = createRouteSchema({
  Search: {
    querystring: SearchQuerySchema,
  },
})

export type SearchRoute = RoutesType<typeof SearchRouteSchema>
