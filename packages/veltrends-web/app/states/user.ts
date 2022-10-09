import { sangte, useSangteValue, useSetSangte } from 'sangte'
import { type User } from '~/lib/api/types'

const initialState: User | null = null
export const userState = sangte(initialState, { global: true })

export function useUser() {
  const user = useSangteValue(userState)
  return user
}

export function useSetUser() {
  const setUser = useSetSangte(userState)
  return setUser
}
