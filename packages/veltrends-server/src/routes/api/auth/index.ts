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
    async (fastify) => {
      const user = await userService.register(fastify.body)
      return {
        user,
      }
    },
  )
}
export default authRoute
