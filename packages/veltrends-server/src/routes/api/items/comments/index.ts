import fastify, { FastifyPluginAsync } from 'fastify'
import { createAuthorizedRoute } from '../../../../plugins/requireAuthPlugin.js'
import CommentService from '../../../../services/CommentService.js'
import { CommentsRoute, CommentsRouteSchema } from './schema.js'

export const commentsRoute: FastifyPluginAsync = async (fastify) => {
  const commentService = CommentService.getInstance()

  fastify.get<CommentsRoute['GetComments']>(
    '/',
    { schema: CommentsRouteSchema.GetComments },
    async (request) => {
      return commentService.getComments(request.params.id)
    },
  )

  fastify.get<CommentsRoute['GetSubcomments']>(
    '/:commentId/subcomments',
    async (request) => {
      return commentService.getSubcomments(request.params.commentId)
    },
  )

  fastify.register(authorizedCommentsRoute)
}

const authorizedCommentsRoute = createAuthorizedRoute(async (fastify) => {
  const commentService = CommentService.getInstance()
  fastify.post<CommentsRoute['CreateComment']>(
    '/',
    { schema: CommentsRouteSchema.CreateComment },
    async (request) => {
      const { parentCommentId, text } = request.body
      const { id } = request.params
      const userId = request.user?.id!
      return commentService.createComment({
        parentCommentId: parentCommentId ?? undefined,
        text,
        itemId: id,
        userId,
      })
    },
  )

  fastify.post<CommentsRoute['LikeComment']>(
    '/:commentId/likes',
    async (request) => {
      const { id } = request.params
      const userId = request.user?.id!
      return commentService.likeComment({
        commentId: id,
        userId,
      })
    },
  )

  fastify.delete<CommentsRoute['UnlikeComment']>(
    '/:commentId/likes',
    async (request) => {
      const { id } = request.params
      const userId = request.user?.id!
      return commentService.likeComment({
        commentId: id,
        userId,
      })
    },
  )

  fastify.delete<CommentsRoute['DeleteComment']>(
    '/:commentId',
    async (request) => {
      const { id } = request.params
      const userId = request.user?.id!
      await commentService.deleteComment({
        commentId: id,
        userId,
      })
    },
  )
  fastify.patch<CommentsRoute['UpdateComment']>(
    '/:commentId',
    async (request) => {
      const { id } = request.params
      const userId = request.user?.id!
      const { text } = request.body
      await commentService.updateComment({
        commentId: id,
        text,
        userId,
      })
    },
  )
})
