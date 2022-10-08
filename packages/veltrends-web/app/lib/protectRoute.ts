import { type AuthResult, getMyAccount, refreshToken } from './api/auth'
import { applyAuth } from './applyAuth'
import { setClientCookie } from './client'
import { extractNextError } from './nextError'

let getMyAccountPromise: Promise<{
  me: AuthResult
  headers: Headers | null
}> | null = null

async function getMyAccountWithRefresh() {
  try {
    const me = await getMyAccount()
    return {
      me,
      headers: null,
    }
  } catch (e) {
    const error = extractNextError(e)
    if (error.name === 'Unauthorized' && error.payload?.isExpiredToken) {
      try {
        const { tokens, headers } = await refreshToken()
        setClientCookie(`access_token=${tokens.accessToken}`)
        const me = await getMyAccount()
        return {
          me,
          headers,
        }
      } catch (innerError) {
        throw e
      }
    }
    throw e
  }
}

export async function getMemoMyAccount() {
  if (!getMyAccountPromise) {
    getMyAccountPromise = getMyAccountWithRefresh()
  }
  return getMyAccountPromise
}

export const checkIsLoggedIn = async (request: Request) => {
  const applied = applyAuth(request)
  if (!applied) return false

  try {
    await getMemoMyAccount()
  } catch (e) {
    console.log({ e })
    return false
  }

  return true
}
