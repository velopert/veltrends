import { Type } from '@sinclair/typebox'
import { createRouteSchema, RoutesType } from '../../../../lib/routeSchema.js'
import { Nullable } from '../../../../lib/typebox.js'
import { UserSchema } from '../../../../schema/userSchema.js'
import { ItemParamsSchema } from '../schema.js'

const CreateCommentBodySchema = Type.Object({
  text: Type.String(),
  parentCommentId: Type.Optional(Nullable(Type.Integer())),
})

const CommentParamsSchema = Type.Object({
  id: Type.Integer(),
  commentId: Type.Integer(),
})

const UpdateCommentBodySchema = Type.Object({
  text: Type.String(),
})

export let CommentSchema = Type.Object({
  id: Type.Integer(),
  text: Type.String(),
  createdAt: Type.String(),
  updatedAt: Type.String(),
  likesCount: Type.Number(),
  subcommentsCount: Type.Number(),
  user: UserSchema,
  mentionUser: Type.Optional(Nullable(UserSchema)),
})

const CommentLikeSchema = Type.Object({
  id: Type.Integer(),
  likes: Type.Number(),
})

CommentSchema = Type.Object({
  id: Type.Integer(),
  text: Type.String(),
  createdAt: Type.String(),
  updatedAt: Type.String(),
  likesCount: Type.Number(),
  subcommentsCount: Type.Number(),
  user: UserSchema,
  mentionUser: Type.Optional(Nullable(UserSchema)),
  subcomments: Type.Optional(Type.Array(CommentSchema)),
})

export const CommentsRouteSchema = createRouteSchema({
  GetComments: {
    params: ItemParamsSchema,
    response: {
      200: Type.Array(CommentSchema),
    },
  },
  GetComment: {
    params: CommentParamsSchema,
    response: {
      200: CommentSchema,
    },
  },
  GetSubcomments: {
    params: CommentParamsSchema,
    response: {
      200: Type.Array(CommentSchema),
    },
  },
  CreateComment: {
    params: ItemParamsSchema,
    body: CreateCommentBodySchema,
    response: {
      200: CommentSchema,
    },
  },
  LikeComment: {
    params: CommentParamsSchema,
    response: {
      200: CommentLikeSchema,
    },
  },
  UnlikeComment: {
    params: CommentParamsSchema,
    response: {
      200: CommentLikeSchema,
    },
  },
  DeleteComment: {
    params: CommentParamsSchema,
    response: {
      204: {},
    },
  },
  UpdateComment: {
    params: CommentParamsSchema,
    body: UpdateCommentBodySchema,
  },
})

export type CommentsRoute = RoutesType<typeof CommentsRouteSchema>
