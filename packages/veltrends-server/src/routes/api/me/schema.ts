import { FastifySchema } from 'fastify'
import { appErrorSchema, createAppErrorSchema } from '../../../lib/AppError.js'
import { userSchema } from '../../../schema/userSchema.js'

export const getMeSchema: FastifySchema = {
  response: {
    200: userSchema,
    401: createAppErrorSchema({
      name: 'UnauthorizedError',
      message: 'Unauthorized',
      statusCode: 401,
    }),
  },
}
