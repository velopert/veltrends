import { sangte, useSangteValue, useSetSangte } from 'sangte'
import { type User } from '~/lib/api/types'

export const userState = sangte<User | null>(null)

export function useUser() {
  const user = useSangteValue(userState)
  return user
}

export function useSetUser() {
  const setUser = useSetSangte(userState)
  return setUser
}
