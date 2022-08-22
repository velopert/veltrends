import { Comment } from '@prisma/client'
import AppError from '../lib/AppError.js'
import db from '../lib/db.js'

class CommentService {
  private static instance: CommentService
  public static getInstance() {
    if (!CommentService.instance) {
      CommentService.instance = new CommentService()
    }
    return CommentService.instance
  }

  async getComments(itemId: number) {
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
    return this.groupSubcomments(this.redact(comments))
  }

  redact(comments: Comment[]) {
    return comments.map((c) => {
      if (!c.deletedAt) return c
      const someDate = new Date(0)
      return {
        ...c,
        likesCount: 0,
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
      }
    })
  }

  async groupSubcomments(comments: Comment[]) {
    const rootComments = comments.filter((c) => c.parentCommentId === null)
    const subcommentsMap = new Map<number, Comment[]>()
    comments.forEach((c) => {
      if (!c.parentCommentId) return
      const array = subcommentsMap.get(c.parentCommentId) ?? []
      array.push(c)
      subcommentsMap.set(c.parentCommentId, array)
    })
    const merged = rootComments.map((c) => ({
      ...c,
      subcomments: subcommentsMap.get(c.id) ?? [],
    }))
    return merged
  }

  async getComment(commentId: number, withSubcomments: boolean = false) {
    const comment = await db.comment.findUnique({
      where: {
        id: commentId,
      },
      include: {
        user: true,
        mentionUser: true,
      },
    })
    if (!comment || comment.deletedAt) {
      throw new AppError('NotFoundError')
    }
    if (withSubcomments) {
      const subcomments = await this.getSubcomments(commentId)
      return {
        ...comment,
        subcomments,
      }
    }
    return comment
  }

  async getSubcomments(commentId: number) {
    return db.comment.findMany({
      where: {
        parentCommentId: commentId,
      },
      orderBy: {
        id: 'asc',
      },
      include: {
        user: true,
        mentionUser: true,
      },
    })
  }
  async createComment({
    itemId,
    text,
    parentCommentId,
    userId,
  }: CreateCommentParams) {
    const parentComment = parentCommentId
      ? await this.getComment(parentCommentId)
      : null

    const rootParentCommentId = parentComment?.parentCommentId
    const targetParentCommentId = rootParentCommentId ?? parentCommentId
    const shouldMention = !!rootParentCommentId && parentComment?.userId

    const comment = db.comment.create({
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

    return { ...comment, subcomments: [] }
  }
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
  }
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
  }

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
        likesCount: count,
      },
    })
    return count
  }

  async countAndSyncComments(itemId: number) {
    const count = await db.comment.count({
      where: {
        itemId,
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
  }

  async deleteComment({ userId, commentId }: CommentParams) {
    const comment = await this.getComment(commentId)
    if (comment.userId !== userId) {
      throw new AppError('ForbiddenError')
    }
    await db.comment.update({
      where: {
        id: commentId,
      },
      data: {
        deletedAt: new Date(),
      },
    })
  }
  async updateComment({ userId, commentId, text }: UpdateCommentParams) {
    const comment = await this.getComment(commentId)
    if (comment.userId !== userId) {
      throw new AppError('ForbiddenError')
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
    return this.getComment(commentId, true)
  }
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

export default CommentService
