import { AnimatePresence, motion } from 'framer-motion'
import styled, { css } from '@emotion/styled'
import { colors } from '~/lib/colors'
import { media } from '~/lib/media'
import Overlay from './Overlay'
import { hover } from '~/lib/styles'

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
      <Positioner>
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
      </Positioner>
    </>
  )
}

const Positioner = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
`

const Sheet = styled(motion.div)`
  background: white;
  width: 100%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  ${media.tablet} {
    width: 380px;
    border-radius: 4px;
  }
`

const Items = styled.div`
  display: flex;
  flex-direction: column;
`

const Item = styled.div`
  padding: 16px;
  color: ${colors.gray5};
  cursor: pointer;
  ${hover(css`
    background: ${colors.gray0};
  `)}
`

export default BottomSheetModal
