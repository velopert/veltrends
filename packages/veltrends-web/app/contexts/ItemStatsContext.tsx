import { createContext, useContext, useMemo, useState } from 'react'
import { type ItemStats } from '~/lib/api/types'

interface ItemStatsContextState {
  [key: number]: ItemStats
}

interface ItemStatsContextActions {
  set(itemId: number, itemStats: ItemStats): void
}

interface ItemStatsContextType {
  state: ItemStatsContextState
  actions: ItemStatsContextActions
}

interface Props {
  children: React.ReactNode
}

const ItemStatsContext = createContext<ItemStatsContextType | null>(null)

export function ItemStatsProvider({ children }: Props) {
  const [state, setState] = useState<ItemStatsContextState>({})

  const actions: ItemStatsContextActions = useMemo(
    () => ({
      set(itemId, itemStats) {
        setState((prev) => ({
          ...prev,
          [itemId]: itemStats,
        }))
      },
    }),
    [],
  )

  return (
    <ItemStatsContext.Provider value={{ state, actions }}>{children}</ItemStatsContext.Provider>
  )
}

export function useItemStats() {
  const context = useContext(ItemStatsContext)
  if (context === null) {
    throw new Error('ItemStatsContext.Provider not used')
  }
  return context
}

export function useItemStatsById(itemId: number): ItemStats | undefined {
  const { state } = useItemStats()
  return state[itemId]
}
