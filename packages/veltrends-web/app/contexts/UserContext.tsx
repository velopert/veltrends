import { createContext, useContext } from 'react'
import { type User } from '~/lib/api/auth'

/**
 * null: not logged in
 * undefined: UserContext.Provider not used
 */
export const UserContext = createContext<User | null | undefined>(undefined)

export function useUser() {
  const user = useContext(UserContext)
  if (user === undefined) {
    throw new Error('UserContext.Provider not used')
  }
  return user
}
