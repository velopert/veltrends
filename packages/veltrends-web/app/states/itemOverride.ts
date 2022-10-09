import { sangte, useSangteActions, useSangteValue } from 'sangte'
import { type ItemStats } from '~/lib/api/types'

interface OverridableItem {
  isLiked?: boolean
  itemStats?: ItemStats
  isBookmarked?: boolean
}

type ItemOverrideState = Record<number, OverridableItem | undefined>

const initialState: ItemOverrideState = {}

export const itemOverrideState = sangte(initialState, (prev) => ({
  set(itemId: number, overridableItem: OverridableItem) {
    if (prev[itemId] === undefined) {
      prev[itemId] = overridableItem
    } else {
      prev[itemId] = {
        ...prev[itemId],
        ...overridableItem,
      }
    }
  },
}))

export function useItemOverrideById(itemId: number) {
  return useSangteValue(itemOverrideState, (state) => state[itemId])
}

export function useItemOverrideSetter() {
  const { set } = useSangteActions(itemOverrideState)
  return set
}
