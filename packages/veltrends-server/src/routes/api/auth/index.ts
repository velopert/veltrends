import { FastifyPluginAsync } from 'fastify'
import UserService from '../../../services/UserService.js'
import { loginSchema, registerSchema } from './schema.js'

const authRoute: FastifyPluginAsync = async (fastify) => {
  const userService = UserService.getInstance()

  fastify.post('/login', { schema: loginSchema }, async () => {
    return userService.login()
  })

  fastify.post(
    '/register',
    {
      schema: registerSchema,
    },
    async () => {
      return userService.register()
    },
  )
}
export default authRoute
