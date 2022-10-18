import { FastifyPluginAsyncTypebox } from '../../../../lib/types.js'
import { createAuthorizedRoute } from '../../../../plugins/requireAuthPlugin.js'
import commentService from '../../../../services/comment.service.js'
import {
  createCommentSchema,
  deleteCommentSchema,
  getCommentSchema,
  getCommentsSchema,
  getSubcommentsSchema,
  likeCommentSchema,
  unlikeCommentSchema,
  updateCommentSchema,
} from './schema.js'

export const commentsRoute: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.get('/', { schema: getCommentsSchema }, async (request) => {
    return commentService.getComments({
      itemId: request.params.id,
      userId: request.user?.id,
    }) as any
  })

  fastify.get(
    '/:commentId',
    {
      schema: getCommentSchema,
    },
    async (request) => {
      return commentService.getComment({
        commentId: request.params.commentId,
        userId: request.user?.id,
        withSubcomments: true,
      }) as any
    },
  )

  fastify.get(
    '/:commentId/subcomments',
    { schema: getSubcommentsSchema },
    async (request) => {
      return commentService.getSubcomments({
        commentId: request.params.commentId,
        userId: request.user?.id,
      }) as any
    },
  )

  fastify.register(authorizedCommentsRoute)
}

const authorizedCommentsRoute = createAuthorizedRoute(async (fastify) => {
  fastify.post('/', { schema: createCommentSchema }, async (request) => {
    const { parentCommentId, text } = request.body
    const { id } = request.params
    const userId = request.user?.id!

    return commentService.createComment({
      parentCommentId: parentCommentId ?? undefined,
      text,
      itemId: id,
      userId,
    }) as any
  })

  fastify.post(
    '/:commentId/likes',
    { schema: likeCommentSchema },
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

  fastify.delete(
    '/:commentId/likes',
    { schema: unlikeCommentSchema },
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

  fastify.delete(
    '/:commentId',
    { schema: deleteCommentSchema },
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
  fastify.patch(
    '/:commentId',
    { schema: updateCommentSchema },
    async (request) => {
      const { commentId } = request.params
      const userId = request.user?.id!
      const { text } = request.body
      return commentService.updateComment({
        commentId,
        text,
        userId,
      }) as any
    },
  )
})
