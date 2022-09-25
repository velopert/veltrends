import { Type } from '@sinclair/typebox'
import { createAppErrorSchema } from '../../../lib/AppError.js'
import { routeSchema } from '../../../lib/routeSchema.js'
import { UserSchema } from '../../../schema/userSchema.js'

export const AuthBody = Type.Object({
  username: Type.String(),
  password: Type.String(),
})

const TokensSchema = Type.Object({
  accessToken: Type.String(),
  refreshToken: Type.String(),
})

const AuthResult = Type.Object({
  tokens: TokensSchema,
  user: UserSchema,
})

export const registerSchema = routeSchema({
  tags: ['auth'],
  body: AuthBody,
  response: {
    200: AuthResult,
    409: createAppErrorSchema({
      name: 'UserExistsError',
      message: 'User already exists',
      statusCode: 409,
    }),
  },
})

export const loginSchema = routeSchema({
  tags: ['auth'],
  body: AuthBody,
  response: {
    200: AuthResult,
    401: createAppErrorSchema({
      name: 'AuthenticationError',
      message: 'Invalid username or password',
      statusCode: 401,
    }),
  },
})

export const refreshTokenSchema = routeSchema({
  tags: ['auth'],
  body: Type.Object({
    refreshToken: Type.Optional(Type.String()),
  }),
  response: {
    200: TokensSchema,
    401: createAppErrorSchema({
      name: 'RefreshTokenError',
      message: 'Failed to refresh token',
      statusCode: 401,
    }),
  },
})

export const logoutSchema = routeSchema({
  tags: ['auth'],
  response: {
    204: Type.Null(),
  },
})
