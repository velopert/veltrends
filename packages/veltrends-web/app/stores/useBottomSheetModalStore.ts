import create from 'zustand'

interface BottomSheetModalItem {
  name: string
  onClick(): void
}

interface BottomSheetModalStore {
  visible: boolean
  items: BottomSheetModalItem[]
  open(items: BottomSheetModalItem[]): void
  close(): void
}

export const useBottomSheetModalStore = create<BottomSheetModalStore>((set) => ({
  visible: false,
  items: [],
  open(items) {
    set((prev) => ({
      ...prev,
      visible: true,
      items,
    }))
  },
  close() {
    set((prev) => ({
      ...prev,
      visible: false,
    }))
  },
}))
