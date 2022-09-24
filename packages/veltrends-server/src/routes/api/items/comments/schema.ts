import { Type } from '@sinclair/typebox'
import { routeSchema } from '../../../../lib/routeSchema.js'
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
  likes: Type.Number(),
  subcommentsCount: Type.Number(),
  user: UserSchema,
  mentionUser: Type.Optional(Nullable(UserSchema)),
  isDeleted: Type.Boolean(),
  isLiked: Type.Boolean(),
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
  likes: Type.Number(),
  subcommentsCount: Type.Number(),
  user: UserSchema,
  mentionUser: Type.Optional(Nullable(UserSchema)),
  subcomments: Type.Optional(Type.Array(CommentSchema)),
  isDeleted: Type.Boolean(),
  isLiked: Type.Boolean(),
})

export const getCommentsSchema = routeSchema({
  tags: ['comments'],
  params: ItemParamsSchema,
  response: {
    200: Type.Array(CommentSchema),
  },
})
export const getCommentSchema = routeSchema({
  tags: ['comments'],
  params: CommentParamsSchema,
  response: {
    200: CommentSchema,
  },
})
export const getSubcommentsSchema = routeSchema({
  tags: ['comments'],
  params: CommentParamsSchema,
  response: {
    200: Type.Array(CommentSchema),
  },
})
export const createCommentSchema = routeSchema({
  tags: ['comments'],
  params: ItemParamsSchema,
  body: CreateCommentBodySchema,
  response: {
    200: CommentSchema,
  },
})
export const likeCommentSchema = routeSchema({
  tags: ['comments'],
  params: CommentParamsSchema,
  response: {
    200: CommentLikeSchema,
  },
})
export const unlikeCommentSchema = routeSchema({
  tags: ['comments'],
  params: CommentParamsSchema,
  response: {
    200: CommentLikeSchema,
  },
})
export const deleteCommentSchema = routeSchema({
  tags: ['comments'],
  params: CommentParamsSchema,
  response: {
    204: {},
  },
})
export const updateCommentSchema = routeSchema({
  tags: ['comments'],
  params: CommentParamsSchema,
  body: UpdateCommentBodySchema,
  response: {
    200: CommentSchema,
  },
})
