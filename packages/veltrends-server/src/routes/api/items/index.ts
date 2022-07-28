import { FastifyPluginAsync } from 'fastify'

export const itemsRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', async () => {
    return 'Hola'
  })
}
