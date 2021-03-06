import { type AuthResult, getMyAccount } from './api/auth'

let getMyAccountPromise: Promise<AuthResult> | null = null
export async function getMemoMyAccount() {
  if (!getMyAccountPromise) {
    getMyAccountPromise = getMyAccount()
  }
  return getMyAccountPromise
}

export const checkIsLoggedIn = async (request: Request) => {
  const cookie = request.headers.get('Cookie')

  if (!cookie || !cookie.includes('access_token')) {
    return false
  }

  try {
    await getMemoMyAccount()
  } catch (e) {
    console.log({ e })
    return false
  }

  return true
}
