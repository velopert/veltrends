import { createContext, useContext, useMemo, useState } from 'react'
import { type ItemStats } from '~/lib/api/types'

interface OverridableItem {
  isLiked: boolean
  itemStats: ItemStats
}

interface ItemOverrideContextState {
  [key: number]: OverridableItem
}

interface ItemOverrideContextActions {
  set(itemId: number, overridableItem: OverridableItem): void
}

interface ItemOverrideContextType {
  state: ItemOverrideContextState
  actions: ItemOverrideContextActions
}

interface Props {
  children: React.ReactNode
}

const ItemOverrideContext = createContext<ItemOverrideContextType | null>(null)

export function ItemOverrideProvider({ children }: Props) {
  const [state, setState] = useState<ItemOverrideContextState>({})

  const actions: ItemOverrideContextActions = useMemo(
    () => ({
      set(itemId, overridableItem) {
        setState((prev) => ({
          ...prev,
          [itemId]: overridableItem,
        }))
      },
    }),
    [],
  )

  return (
    <ItemOverrideContext.Provider value={{ state, actions }}>
      {children}
    </ItemOverrideContext.Provider>
  )
}

export function useItemOverride() {
  const context = useContext(ItemOverrideContext)
  if (context === null) {
    throw new Error('ItemOverrideContext.Provider not used')
  }
  return context
}

export function useItemOverrideById(itemId: number): OverridableItem | undefined {
  const { state } = useItemOverride()
  return state[itemId]
}
