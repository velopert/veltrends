import fastify, { FastifyPluginAsync } from 'fastify'
import { createAuthorizedRoute } from '../../../../plugins/requireAuthPlugin.js'
import { CommentsRoute, CommentsRouteSchema } from './schema.js'

export const commentsRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get<CommentsRoute['GetComments']>(
    '/',
    { schema: CommentsRouteSchema.GetComments },
    async (request) => {},
  )

  fastify.get<CommentsRoute['GetSubcomments']>(
    '/:commentId/subcomments',
    async () => {},
  )

  fastify.register(authorizedCommentsRoute)
}

const authorizedCommentsRoute = createAuthorizedRoute(async (fastify) => {
  fastify.post<CommentsRoute['CreateComment']>(
    '/',
    { schema: CommentsRouteSchema.CreateComment },
    async (request) => {},
  )

  fastify.post<CommentsRoute['LikeComment']>(
    '/:commentId/likes',
    async () => {},
  )

  fastify.delete<CommentsRoute['UnlikeComment']>(
    '/:commentId/likes',
    async () => {},
  )

  fastify.delete<CommentsRoute['DeleteComment']>('/:commentId', async () => {})
  fastify.patch<CommentsRoute['UpdateComment']>('/:commentId', async () => {})
})
