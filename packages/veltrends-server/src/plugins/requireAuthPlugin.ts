import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import AppError from '../lib/AppError.js'
import { FastifyPluginAsyncTypebox } from '../lib/types.js'

const requireAuthPluginAsync: FastifyPluginAsync = async (fastify) => {
  fastify.addHook('preHandler', async (request, reply) => {
    if (request.isExpiredToken) {
      throw new AppError('Unauthorized', {
        isExpiredToken: true,
      })
    }
    if (!request.user) {
      throw new AppError('Unauthorized', {
        isExpiredToken: false,
      })
    }
  })
}

const requireAuthPlugin = fp(requireAuthPluginAsync, {
  name: 'requireAuthPlugin',
})

export function createAuthorizedRoute(plugin: FastifyPluginAsyncTypebox) {
  const wrappedPlugin: FastifyPluginAsyncTypebox = async (fastify, opts) => {
    fastify.register(requireAuthPlugin)
    return plugin(fastify, opts)
  }
  return wrappedPlugin
}

export default requireAuthPlugin
