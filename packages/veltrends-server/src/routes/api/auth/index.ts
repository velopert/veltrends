import { FastifyPluginAsync, FastifyReply } from 'fastify'
import AppError from '../../../lib/AppError.js'
import { clearCookie, setTokenCookie } from '../../../lib/cookies.js'
import UserService from '../../../services/UserService.js'
import { AuthRouteSchema, AuthRoute } from './schema.js'

const authRoute: FastifyPluginAsync = async (fastify) => {
  const userService = UserService.getInstance()

  fastify.post<AuthRoute['Login']>(
    '/login',
    { schema: AuthRouteSchema.Login },
    async (request, reply) => {
      const authResult = await userService.login(request.body)
      setTokenCookie(reply, authResult.tokens)
      return authResult
    },
  )

  fastify.post<AuthRoute['Register']>(
    '/register',
    {
      schema: AuthRouteSchema.Register,
    },
    async (request, reply) => {
      const authResult = await userService.register(request.body)
      setTokenCookie(reply, authResult.tokens)
      return authResult
    },
  )

  fastify.post<AuthRoute['RefreshToken']>(
    '/refresh',
    { schema: AuthRouteSchema.RefreshToken },
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

  fastify.post<AuthRoute['Logout']>(
    '/logout',
    {
      schema: AuthRouteSchema.Logout,
    },
    async (request, reply) => {
      clearCookie(reply)
      reply.status(204)
    },
  )
}

export default authRoute
