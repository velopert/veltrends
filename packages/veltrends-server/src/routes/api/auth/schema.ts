import { FastifySchema } from 'fastify'
import { appErrorSchema, createAppErrorSchema } from '../../../lib/AppError.js'
import { Static, Type } from '@sinclair/typebox'
import { UserSchema } from '../../../schema/userSchema.js'

export const AuthBody = Type.Object({
  username: Type.String(),
  password: Type.String(),
})
export const AuthResult = Type.Object({})

export type AuthBodyType = Static<typeof AuthBody>

const authResultSchema = {
  type: 'object',
  properties: {
    tokens: {
      type: 'object',
      properties: {
        accessToken: { type: 'string' },
        refreshToken: { type: 'string' },
      },
    },
    user: UserSchema,
  },
}

export const registerSchema: FastifySchema = {
  body: AuthBody,
  response: {
    200: authResultSchema,
    409: createAppErrorSchema({
      name: 'UserExistsError',
      message: 'User already exists',
      statusCode: 409,
    }),
  },
}

export const loginSchema: FastifySchema = {
  body: AuthBody,
  response: {
    200: authResultSchema,
    401: createAppErrorSchema({
      name: 'AuthenticationError',
      message: 'Invalid username or password',
      statusCode: 401,
    }),
  },
}

export const refreshTokenSchema: FastifySchema = {
  body: {
    type: 'object',
    properties: {
      refreshToken: { type: 'string' },
    },
  },
}
