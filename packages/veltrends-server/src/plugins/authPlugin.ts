import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import jwt from 'jsonwebtoken'
import { AccessTokenPayload, validateToken } from '../lib/tokens.js'

const { JsonWebTokenError } = jwt

const authPluginAsync: FastifyPluginAsync = async (fastify) => {
  fastify.decorateRequest('user', null)
  fastify.addHook('preHandler', async (request) => {
    const { authorization } = request.headers
    if (!authorization || !authorization.includes('Bearer')) {
      return
    }
    const token = authorization.split('Bearer ')[1]
    try {
      const decoded = await validateToken<AccessTokenPayload>(token)
      console.log(decoded)
    } catch (e: any) {
      if (e instanceof JsonWebTokenError) {
        if (e.name === 'TokenExpiredError') {
          // todo: handle token expired
        }
      }
    }
  })
}

export const authPlugin = fp(authPluginAsync, {
  name: 'authPlugin',
})

declare module 'fastify' {
  interface FastifyRequest {
    user: {
      id: number
      username: string
    } | null
  }
}
