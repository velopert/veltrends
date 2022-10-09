import { sangte, useSangteActions, useSangteValue } from 'sangte'

interface DialogConfig {
  title: string
  description: string
  cancelText?: string
  confirmText?: string
  onClose?(): void
  onConfirm?(): void
  mode?: 'OK' | 'YESNO'
}

interface DialogState {
  config: DialogConfig | null
  visible: boolean
}

const initialState: DialogState = {
  visible: false,
  config: null,
}

const dialogState = sangte(
  initialState,
  (prev) => ({
    open(config: DialogConfig) {
      return {
        visible: true,
        config,
      }
    },
    close() {
      prev.visible = false
    },
  }),
  { global: true },
)

export function useDialogActions() {
  return useSangteActions(dialogState)
}

export function useDialogValue() {
  return useSangteValue(dialogState)
}

export function useOpenDialog() {
  const { open } = useDialogActions()
  return open
}
