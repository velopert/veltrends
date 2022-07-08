import { FastifySchema } from 'fastify'
import { appErrorSchema } from '../../../lib/AppError.js'

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
    user: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        username: { type: 'string' },
      },
    },
  },
}

const authBodySchema = {
  type: 'object',
  properties: {
    username: { type: 'string' },
    password: { type: 'string' },
  },
}

export const registerSchema: FastifySchema = {
  body: authBodySchema,
  response: {
    200: authResultSchema,
    409: {
      ...appErrorSchema,
      example: {
        name: 'UserExistsError',
        message: 'User already exists',
        statusCode: 409,
      },
    },
  },
}

export const loginSchema = {
  body: authBodySchema,
  response: {
    200: authResultSchema,
  },
}
