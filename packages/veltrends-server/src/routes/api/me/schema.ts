import { Type } from '@sinclair/typebox'
import { createAppErrorSchema } from '../../../lib/AppError.js'
import { createRouteSchema, RoutesType } from '../../../lib/routeSchema.js'
import { UserSchema } from '../../../schema/userSchema.js'

const UnauthorizedErrorSchema = createAppErrorSchema(
  {
    name: 'UnauthorizedError',
    message: 'Unauthorized',
    statusCode: 401,
    payload: {
      isExpiredToken: true,
    },
  },
  Type.Object({
    isExpiredToken: Type.Boolean(),
  }),
)

export const MeRouteSchema = createRouteSchema({
  GetAccount: {
    tags: ['me'],
    response: {
      200: UserSchema,
      401: UnauthorizedErrorSchema,
    },
  },
  UpdatePassword: {
    tags: ['me'],
    body: Type.Object({
      oldPassword: Type.String(),
      newPassword: Type.String(),
    }),
    response: {
      204: Type.Null(),
      401: UnauthorizedErrorSchema,
      403: createAppErrorSchema({
        name: 'ForbiddenError',
        message: 'Password does not match',
        statusCode: 403,
      }),
    },
  },
  Unregister: {
    tags: ['me'],
    response: {
      204: Type.Null(),
    },
  },
})

export type MeRoute = RoutesType<typeof MeRouteSchema>
