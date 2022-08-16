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
    return db.comment.findMany({
      where: {
        itemId,
      },
      orderBy: {
        id: 'asc',
      },
      include: {
        user: true,
      },
    })
  }

  async getComment(commentId: number) {
    const comment = await db.comment.findUnique({
      where: {
        id: commentId,
      },
    })
    if (!comment) {
      throw new AppError('NotFoundError')
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

    const comment = db.comment.create({
      data: {
        itemId,
        text,
        userId,
        parentCommentId: rootParentCommentId ?? parentCommentId,
        mentionUserId: parentComment?.userId,
      },
      include: {
        user: true,
      },
    })

    if (parentCommentId) {
      const subcommentsCount = await db.comment.count({
        where: {
          parentCommentId,
        },
      })
      await db.comment.update({
        where: {
          id: parentCommentId,
        },
        data: {
          subcommentsCount,
        },
      })
    }

    return comment
  }
  async likeComment({ userId, commentId }: CommentParams) {
    await db.commentLike.create({
      data: {
        userId,
        commentId,
      },
    })

    return null
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
    const count = db.commentLike.count({
      where: {
        commentId,
      },
    })
    return count
  }
  async deleteComment({ userId, commentId }: CommentParams) {
    const comment = await this.getComment(commentId)
    if (comment.userId !== userId) {
      throw new AppError('ForbiddenError')
    }
    await db.comment.delete({
      where: {
        id: commentId,
      },
    })
  }
  async updateComment({ userId, commentId, text }: UpdateCommentParams) {
    const comment = await this.getComment(commentId)
    if (comment.userId !== userId) {
      throw new AppError('ForbiddenError')
    }
    const updatedComment = await db.comment.update({
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
    return updatedComment
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
