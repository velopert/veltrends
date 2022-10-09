import { sangte, useSangteActions, useSangteValue } from 'sangte'

interface BottomSheetModalItem {
  name: string
  onClick(): void
}

interface BottomSheetModalState {
  visible: boolean
  items: BottomSheetModalItem[]
}

const initialState: BottomSheetModalState = {
  visible: false,
  items: [],
}

export const bottomSheetModalState = sangte(initialState, (prev) => ({
  open(items: BottomSheetModalItem[]) {
    return {
      visible: true,
      items,
    }
  },
  close() {
    prev.visible = false
  },
}))

export function useBottomSheetModalValue() {
  return useSangteValue(bottomSheetModalState)
}

export function useBottomSheetModalActions() {
  return useSangteActions(bottomSheetModalState)
}
