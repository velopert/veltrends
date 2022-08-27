import { useBottomSheetModalStore } from '~/stores/useBottomSheetModalStore'
import BottomSheetModal from './BottomSheetModal'

function GlobalBottomSheetModal() {
  const { visible, items, close } = useBottomSheetModalStore()
  return <BottomSheetModal items={items} visible={visible} onClose={close} />
}

export default GlobalBottomSheetModal
