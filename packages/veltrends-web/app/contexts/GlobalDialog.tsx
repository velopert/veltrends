import { useCallback } from 'react'
import Dialog from '~/components/system/Dialog'
import { useDialogActions, useDialogValue } from '~/states/dialog'

function GlobalDialog() {
  const { config, visible } = useDialogValue()
  const actions = useDialogActions()

  const close = useCallback(() => {
    config?.onClose?.()
    actions.close()
  }, [config, actions])

  const confirm = useCallback(() => {
    config?.onConfirm?.()
    actions.close()
  }, [config, actions])

  return (
    <Dialog
      visible={visible}
      title={config?.title ?? ''}
      description={config?.description ?? ''}
      cancelText={config?.cancelText}
      confirmText={config?.confirmText}
      onClose={close}
      onConfirm={confirm}
      mode={config?.mode ?? 'OK'}
    />
  )
}

export default GlobalDialog
