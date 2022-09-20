import { FastifyPluginAsync } from 'fastify'
import { clearCookie } from '../../../lib/cookies.js'
import requireAuthPlugin from '../../../plugins/requireAuthPlugin.js'
import UserService from '../../../services/UserService.js'
import { MeRoute, MeRouteSchema } from './schema.js'

export const meRoute: FastifyPluginAsync = async (fastify) => {
  const userService = UserService.getInstance()

  fastify.register(requireAuthPlugin)

  fastify.get<MeRoute['GetAccount']>(
    '/',
    { schema: MeRouteSchema.GetAccount },
    async (request) => {
      return request.user
    },
  )

  fastify.post<MeRoute['UpdatePassword']>(
    '/change-password',
    { schema: MeRouteSchema.UpdatePassword },
    async (request, reply) => {
      const { oldPassword, newPassword } = request.body
      await userService.changePassword({
        oldPassword,
        newPassword,
        userId: request.user?.id!,
      })
      reply.status(204)
    },
  )

  fastify.delete<MeRoute['Unregister']>('/', async (request, reply) => {
    await userService.unregister(request.user?.id!)
    reply.status(204)
    clearCookie(reply)
  })
}
