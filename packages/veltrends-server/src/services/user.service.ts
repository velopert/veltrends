import db from '../lib/db.js'
import bcrypt from 'bcrypt'
import AppError, { isAppError } from '../lib/AppError.js'
import {
  generateToken,
  RefreshTokenPayload,
  validateToken,
} from '../lib/tokens.js'
import { Token, User } from '@prisma/client'
import NextAppError from '../lib/AppError.js'
import { validate } from '../lib/validate.js'

const SALT_ROUNDS = 10

interface AuthParams {
  username: string
  password: string
}

const userService = {
  async createTokenItem(userId: number) {
    const token = await db.token.create({
      data: {
        userId,
      },
    })
    return token
  },

  async generateTokens(user: User, tokenItem?: Token) {
    const { id: userId, username } = user
    const token = tokenItem ?? (await this.createTokenItem(userId))
    const tokenId = token.id

    // refactor above code with Promise.all
    const [accessToken, refreshToken] = await Promise.all([
      generateToken({
        type: 'access_token',
        userId,
        tokenId,
        username,
      }),
      generateToken({
        type: 'refresh_token',
        tokenId,
        rotationCounter: token.rotationCounter,
      }),
    ])

    return {
      refreshToken,
      accessToken,
    }
  },

  async register({ username, password }: AuthParams) {
    const exists = await db.user.findUnique({
      where: {
        username,
      },
    })

    if (exists) {
      throw new AppError('AlreadyExists')
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS)
    const user = await db.user.create({
      data: {
        username,
        passwordHash: hash,
      },
    })
    const tokens = await this.generateTokens(user)

    return {
      tokens,
      user,
    }
  },

  async login({ username, password }: AuthParams) {
    const user = await db.user.findUnique({
      where: {
        username,
      },
    })

    if (!user) {
      throw new AppError('WrongCredentials')
    }

    try {
      const result = await bcrypt.compare(password, user.passwordHash)
      if (!result) {
        throw new AppError('WrongCredentials')
      }
    } catch (e) {
      if (isAppError(e)) {
        throw e
      }
      throw new AppError('Unknown')
    }

    const tokens = await this.generateTokens(user)
    return {
      user,
      tokens,
    }
  },

  async refreshToken(token: string) {
    try {
      const { tokenId, rotationCounter } =
        await validateToken<RefreshTokenPayload>(token)
      const tokenItem = await db.token.findUnique({
        where: {
          id: tokenId,
        },
        include: {
          user: true,
        },
      })
      if (!tokenItem) {
        throw new Error('Token not found')
      }
      if (tokenItem.blocked) {
        throw new Error('Token is blocked')
      }
      if (tokenItem.rotationCounter !== rotationCounter) {
        await db.token.update({
          where: {
            id: tokenId,
          },
          data: {
            blocked: true,
          },
        })
        throw new Error('Rotation counter does not match')
      }
      tokenItem.rotationCounter += 1
      await db.token.update({
        where: {
          id: tokenId,
        },
        data: {
          rotationCounter: tokenItem.rotationCounter,
        },
      })
      return this.generateTokens(tokenItem.user, tokenItem)
    } catch (e) {
      throw new AppError('RefreshFailure')
    }
  },

  async changePassword({
    oldPassword,
    newPassword,
    userId,
  }: {
    oldPassword: string
    newPassword: string
    userId: number
  }) {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!validate.password(newPassword)) {
      throw new NextAppError('BadRequest', { message: 'Password is invalid' })
    }

    try {
      if (!user) {
        throw new Error()
      }

      const result = await bcrypt.compare(oldPassword, user.passwordHash)
      if (!result) {
        throw new Error()
      }
    } catch (e) {
      throw new NextAppError('Forbidden', {
        message: 'Password does not match',
      })
    }

    const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS)
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        passwordHash,
      },
    })
    return true
  },
  unregister(userId: number) {
    return db.user.delete({
      where: {
        id: userId,
      },
    })
  },
}

export default userService
