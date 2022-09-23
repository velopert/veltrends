import { FastifyPluginAsync, FastifyReply } from 'fastify'
import AppError from '../../../lib/AppError.js'
import { clearCookie, setTokenCookie } from '../../../lib/cookies.js'
import { FastifyPluginAsyncTypebox } from '../../../lib/types.js'
import UserService from '../../../services/UserService.js'
import {
  loginSchema,
  logoutSchema,
  refreshTokenSchema,
  registerSchema,
} from './schema.js'

const authRoute: FastifyPluginAsyncTypebox = async (fastify) => {
  const userService = UserService.getInstance()

  fastify.post('/login', { schema: loginSchema }, async (request, reply) => {
    const authResult = await userService.login(request.body)
    setTokenCookie(reply, authResult.tokens)
    return authResult
  })

  fastify.post(
    '/register',
    {
      schema: registerSchema,
    },
    async (request, reply) => {
      const authResult = await userService.register(request.body)
      setTokenCookie(reply, authResult.tokens)
      return authResult
    },
  )

  fastify.post(
    '/refresh',
    { schema: refreshTokenSchema },
    async (request, reply) => {
      const refreshToken =
        request.body.refreshToken ?? request.cookies.refresh_token ?? ''
      if (!refreshToken) {
        throw new AppError('BadRequestError')
      }
      const tokens = await userService.refreshToken(refreshToken)
      setTokenCookie(reply, tokens)
      return tokens
    },
  )

  fastify.post(
    '/logout',
    {
      schema: logoutSchema,
    },
    async (request, reply) => {
      clearCookie(reply)
      reply.status(204)
    },
  )
}

export default authRoute
