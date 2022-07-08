import db from '../lib/db.js'
import bcrypt from 'bcrypt'
import AppError from '../lib/AppError.js'

const SALT_ROUNDS = 10

interface AuthParams {
  username: string
  password: string
}

class UserService {
  private static instance: UserService
  public static getInstance() {
    if (!UserService.instance) {
      UserService.instance = new UserService()
    }
    return UserService.instance
  }

  async register({ username, password }: AuthParams) {
    const exists = await db.user.findUnique({
      where: {
        username,
      },
    })

    if (exists) {
      throw new AppError('UserExistsError')
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS)
    const user = await db.user.create({
      data: {
        username,
        passwordHash: hash,
      },
    })
    return user
  }

  login() {
    return 'logged in!'
  }
}

export default UserService
