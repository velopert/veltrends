import jwt, { SignOptions } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET ?? 'DevSecretKey'
const tokensDuration = {
  access_token: '1h',
  refresh_token: '30d',
} as const

if (process.env.JWT_SECRET === undefined) {
  console.warn('JWT_SECRET is not defined in .env file')
}

export function generateToken(payload: TokenPayload) {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(
      payload,
      JWT_SECRET,
      {
        expiresIn: tokensDuration[payload.type],
      },
      (err, token) => {
        if (err || !token) {
          reject(err)
          return
        }
        resolve(token)
      },
    )
  })
}
export function validateToken<T>(token: string) {
  return new Promise<DecodedToken<T>>((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err)
      }
      resolve(decoded as DecodedToken<T>)
    })
  })
}

export interface AccessTokenPayload {
  type: 'access_token'
  userId: number
  tokenId: number
  username: string
}

export interface RefreshTokenPayload {
  type: 'refresh_token'
  tokenId: number
  rotationCounter: number
}

type TokenPayload = AccessTokenPayload | RefreshTokenPayload

type DecodedToken<T> = {
  iat: number
  exp: number
} & T
