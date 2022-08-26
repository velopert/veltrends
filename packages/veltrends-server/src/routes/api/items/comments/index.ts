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
      return commentService.getComments({
        itemId: request.params.id,
        userId: request.user?.id,
      })
    },
  )

  fastify.get<CommentsRoute['GetComment']>(
    '/:commentId',
    {
      schema: CommentsRouteSchema.GetComment,
    },
    async (request) => {
      return commentService.getComment({
        commentId: request.params.commentId,
        userId: request.user?.id,
        withSubcomments: true,
      })
    },
  )

  fastify.get<CommentsRoute['GetSubcomments']>(
    '/:commentId/subcomments',
    { schema: CommentsRouteSchema.GetSubcomments },
    async (request) => {
      return commentService.getSubcomments({
        commentId: request.params.commentId,
        userId: request.user?.id,
      })
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
    { schema: CommentsRouteSchema.LikeComment },
    async (request) => {
      const { id, commentId } = request.params
      const userId = request.user?.id!
      const likes = await commentService.likeComment({
        commentId,
        userId,
      })
      return {
        id: commentId,
        likes,
      }
    },
  )

  fastify.delete<CommentsRoute['UnlikeComment']>(
    '/:commentId/likes',
    { schema: CommentsRouteSchema.UnlikeComment },
    async (request) => {
      const { commentId } = request.params
      const userId = request.user?.id!
      const likes = await commentService.unlikeComment({
        commentId,
        userId,
      })
      return {
        id: commentId,
        likes,
      }
    },
  )

  fastify.delete<CommentsRoute['DeleteComment']>(
    '/:commentId',
    { schema: CommentsRouteSchema.DeleteComment },
    async (request, response) => {
      const { commentId } = request.params
      const userId = request.user?.id!
      await commentService.deleteComment({
        commentId,
        userId,
      })
      response.status(204)
    },
  )
  fastify.patch<CommentsRoute['UpdateComment']>(
    '/:commentId',
    { schema: CommentsRouteSchema.UpdateComment },
    async (request) => {
      const { commentId } = request.params
      const userId = request.user?.id!
      const { text } = request.body
      return commentService.updateComment({
        commentId,
        text,
        userId,
      })
    },
  )
})
