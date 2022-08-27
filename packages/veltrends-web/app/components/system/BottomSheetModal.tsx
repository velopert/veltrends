import { AnimatePresence, motion } from 'framer-motion'
import styled from 'styled-components'
import { colors } from '~/lib/colors'
import Overlay from './Overlay'

interface Props {
  visible: boolean
  items: {
    name: string
    onClick(): void
  }[]
  onClose(): void
}

function BottomSheetModal({ visible, onClose, items }: Props) {
  return (
    <>
      <Overlay visible={visible} onClick={onClose} />
      <AnimatePresence>
        {visible && (
          <Sheet
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '100%' }}
            transition={{
              damping: 0,
            }}
          >
            <Items onClick={onClose}>
              {items.map((item) => (
                <Item key={item.name} onClick={item.onClick}>
                  {item.name}
                </Item>
              ))}
            </Items>
          </Sheet>
        )}
      </AnimatePresence>
    </>
  )
}

const Sheet = styled(motion.div)`
  position: fixed;
  background: white;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`

const Items = styled.div`
  display: flex;
  flex-direction: column;
`

const Item = styled.div`
  padding: 16px;
  color: ${colors.gray5};
`

export default BottomSheetModal
