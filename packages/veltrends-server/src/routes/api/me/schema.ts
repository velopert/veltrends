import { Type } from '@sinclair/typebox'
import { createAppErrorSchema } from '../../../lib/AppError.js'
import { routeSchema } from '../../../lib/routeSchema.js'
import { UserSchema } from '../../../schema/userSchema.js'

const UnauthorizedErrorSchema = createAppErrorSchema(
  'Unauthorized',
  {
    isExpiredToken: true,
  },
  Type.Object({
    isExpiredToken: Type.Boolean(),
  }),
)

export const getAccountSchema = routeSchema({
  tags: ['me'],
  response: {
    200: UserSchema,
    401: UnauthorizedErrorSchema,
  },
})

export const updatePasswordSchema = routeSchema({
  tags: ['me'],
  body: Type.Object({
    oldPassword: Type.String(),
    newPassword: Type.String(),
  }),
  response: {
    204: Type.Null(),
    401: UnauthorizedErrorSchema,
    403: createAppErrorSchema('Forbidden'),
  },
})

export const unregisterSchema = routeSchema({
  tags: ['me'],
  response: {
    204: Type.Null(),
  },
})
