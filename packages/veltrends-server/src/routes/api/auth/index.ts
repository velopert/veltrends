import { FastifyPluginAsync } from 'fastify'
import db from '../../../lib/db.js'
import UserService from '../../../services/UserService.js'
import { loginSchema, registerSchema } from './schema.js'
import { AuthBody } from './types.js'

const authRoute: FastifyPluginAsync = async (fastify) => {
  const userService = UserService.getInstance()

  fastify.post('/login', { schema: loginSchema }, async () => {
    return userService.login()
  })

  fastify.post<{ Body: AuthBody }>(
    '/register',
    {
      schema: registerSchema,
    },
    async (request) => {
      const authResult = await userService.register(request.body)
      return authResult
    },
  )
}
export default authRoute
