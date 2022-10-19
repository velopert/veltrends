import { Comment, CommentLike } from '@prisma/client'
import db from '../lib/db.js'
import AppError from '../lib/AppError.js'

const commentService = {
  async getComments({
    itemId,
    userId = null,
  }: {
    itemId: number
    userId?: number | null
  }) {
    const comments = await db.comment.findMany({
      where: {
        itemId,
      },
      orderBy: {
        id: 'asc',
      },
      include: {
        user: true,
        mentionUser: true,
      },
    })

    /** @todo: refactor me */

    const commentLikedMap = userId
      ? await this.getCommentLikedMap({
          commentIds: comments.map((c) => c.id),
          userId,
        })
      : {}

    const commentsWithIsLiked = comments.map((c) => ({
      ...c,
      isLiked: !!commentLikedMap[c.id],
    }))

    return this.groupSubcomments(this.redact(commentsWithIsLiked))
  },

  /** @todo: rename to serialize */
  redact(comments: Comment[]) {
    return comments.map((c) => {
      if (!c.deletedAt)
        return {
          ...c,
          isDeleted: false,
        }

      const someDate = new Date(0)
      return {
        ...c,
        likes: 0,
        createdAt: someDate,
        updatedAt: someDate,
        subcommentsCount: 0,
        text: '',
        user: {
          id: -1,
          username: 'deleted',
        },
        mentionUser: null,
        subcomments: [],
        isDeleted: true,
      }
    })
  },

  async groupSubcomments<T extends Comment>(comments: T[]) {
    const rootComments = comments.filter((c) => c.parentCommentId === null)
    const subcommentsMap = new Map<number, T[]>()
    comments.forEach((c) => {
      if (!c.parentCommentId) return
      if (c.deletedAt !== null) return
      const array = subcommentsMap.get(c.parentCommentId) ?? []
      array.push(c)
      subcommentsMap.set(c.parentCommentId, array)
    })
    const merged = rootComments
      .map((c) => ({
        ...c,
        subcomments: subcommentsMap.get(c.id) ?? [],
      }))
      .filter((c) => c.deletedAt === null || c.subcomments.length !== 0)

    return merged
  },

  async getComment({
    commentId,
    withSubcomments = false,
    userId = null,
  }: {
    commentId: number
    withSubcomments?: boolean
    userId?: number | null
  }) {
    const comment = await db.comment.findUnique({
      where: {
        id: commentId,
      },
      include: {
        user: true,
        mentionUser: true,
      },
    })

    const commentLike = userId
      ? await db.commentLike.findUnique({
          where: {
            commentId_userId: {
              commentId,
              userId,
            },
          },
        })
      : null
    if (!comment || comment.deletedAt) {
      throw new AppError('NotFound')
    }
    if (withSubcomments) {
      const subcomments = await this.getSubcomments({ commentId, userId })
      return {
        ...comment,
        isLiked: !!commentLike,
        subcomments,
        isDeleted: false,
      }
    }
    return { ...comment, isLiked: !!commentLike, isDeleted: false }
  },

  async getSubcomments({
    commentId,
    userId = null,
  }: {
    commentId: number
    userId?: number | null
  }) {
    const subcomments = await db.comment.findMany({
      where: {
        parentCommentId: commentId,
        deletedAt: null,
      },
      orderBy: {
        id: 'asc',
      },
      include: {
        user: true,
        mentionUser: true,
      },
    })

    const commentLikedMap = userId
      ? await this.getCommentLikedMap({
          userId,
          commentIds: subcomments.map((sc) => sc.id),
        })
      : {}

    return subcomments.map((sc) => ({
      ...sc,
      isLiked: !!commentLikedMap[sc.id],
      isDeleted: false,
    }))
  },
  async createComment({
    itemId,
    text,
    parentCommentId,
    userId,
  }: CreateCommentParams) {
    if (text.length > 300 || text.length === 0) {
      throw new AppError('BadRequest', {
        message: 'text is invalid',
      })
    }

    const parentComment = parentCommentId
      ? await this.getComment({ commentId: parentCommentId })
      : null

    const rootParentCommentId = parentComment?.parentCommentId
    const targetParentCommentId = rootParentCommentId ?? parentCommentId
    const shouldMention =
      !!rootParentCommentId && parentComment?.userId !== userId

    const comment = await db.comment.create({
      data: {
        itemId,
        text,
        userId,
        parentCommentId: targetParentCommentId,
        mentionUserId: shouldMention ? parentComment?.userId : null,
      },
      include: {
        user: true,
        mentionUser: true,
      },
    })

    if (parentCommentId) {
      const subcommentsCount = await db.comment.count({
        where: {
          parentCommentId: targetParentCommentId,
        },
      })

      await db.comment.update({
        where: {
          id: targetParentCommentId,
        },
        data: {
          subcommentsCount,
        },
      })
    }

    await this.countAndSyncComments(itemId)

    return { ...comment, isDeleted: false, subcomments: [], isLiked: false }
  },
  async likeComment({ userId, commentId }: CommentParams) {
    console.log({
      userId,
      commentId,
    })
    try {
      await db.commentLike.create({
        data: {
          userId,
          commentId,
        },
      })
    } catch (e) {
      console.error(e)
    }

    return this.countAndSyncCommentLikes(commentId)
  },
  async unlikeComment({ userId, commentId }: CommentParams) {
    try {
      await db.commentLike.delete({
        where: {
          commentId_userId: {
            commentId,
            userId,
          },
        },
      })
    } catch (e) {}
    const count = await this.countAndSyncCommentLikes(commentId)
    return count
  },

  async countAndSyncCommentLikes(commentId: number) {
    const count = await db.commentLike.count({
      where: {
        commentId,
      },
    })
    await db.comment.update({
      where: {
        id: commentId,
      },
      data: {
        likes: count,
      },
    })
    return count
  },

  async countAndSyncComments(itemId: number) {
    const count = await db.comment.count({
      where: {
        itemId,
        deletedAt: null,
      },
    })
    await db.itemStats.update({
      where: {
        itemId,
      },
      data: {
        commentsCount: count,
      },
    })
    return count
  },

  async deleteComment({ userId, commentId }: CommentParams) {
    const comment = await this.getComment({ commentId })
    if (comment.userId !== userId) {
      throw new AppError('Forbidden')
    }
    await db.comment.update({
      where: {
        id: commentId,
      },
      data: {
        deletedAt: new Date(),
      },
    })

    await this.countAndSyncComments(comment.itemId)
  },
  async updateComment({ userId, commentId, text }: UpdateCommentParams) {
    const comment = await this.getComment({ commentId })
    if (comment.userId !== userId) {
      throw new AppError('Forbidden')
    }
    await db.comment.update({
      where: {
        id: commentId,
      },
      data: {
        text,
      },
      include: {
        user: true,
      },
    })
    return this.getComment({ commentId, withSubcomments: true })
  },

  async getCommentLikedMap({
    commentIds,
    userId,
  }: {
    commentIds: number[]
    userId: number
  }) {
    const list = await db.commentLike.findMany({
      where: {
        userId,
        commentId: {
          in: commentIds,
        },
      },
    })

    return list.reduce((acc, current) => {
      acc[current.commentId] = current
      return acc
    }, {} as Record<number, CommentLike>)
  },
}

interface CreateCommentParams {
  itemId: number
  text: string
  parentCommentId?: number
  userId: number
}

interface CommentParams {
  userId: number
  commentId: number
}

interface UpdateCommentParams extends CommentParams {
  text: string
}

export default commentService
