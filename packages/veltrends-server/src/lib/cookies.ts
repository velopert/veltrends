import { FastifyReply } from 'fastify'

const domains =
  process.env.NODE_ENV === 'production' ? ['.veltrends.com'] : [undefined]

export function setTokenCookie(
  reply: FastifyReply,
  tokens: { accessToken: string; refreshToken: string },
) {
  domains.forEach((domain) => {
    reply.setCookie('access_token', tokens.accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60),
      path: '/',
      domain,
    })
    reply.setCookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      path: '/',
      domain,
    })
  })
}

export function clearCookie(reply: FastifyReply) {
  domains.forEach((domain) => {
    reply.clearCookie('access_token', { domain, path: '/' })
    reply.clearCookie('refresh_token', { domain, path: '/' })
  })
}
