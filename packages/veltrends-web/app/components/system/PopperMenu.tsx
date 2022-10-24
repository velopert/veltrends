import { AnimatePresence, motion } from 'framer-motion'
import { useRef } from 'react'
import styled from '@emotion/styled'
import { useOnClickOutside } from '~/hooks/useClickOutside'
import { colors } from '~/lib/colors'
import { hover } from '~/lib/styles'
import { css } from '@emotion/react'

interface PopperMenuItem {
  name: string
  onClick(): void
}

interface Props {
  visible: boolean
  items: PopperMenuItem[]
  onClose(): void
  position: {
    top?: number
    left?: number
    right?: number
    bottom?: number
  }
}

function PopperMenu({ items, onClose, visible, position }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  useOnClickOutside(ref, onClose, [visible])

  return (
    <Relative>
      <Positioner style={position}>
        <AnimatePresence>
          {visible ? (
            <Block
              ref={ref}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
            >
              {items.map((item) => (
                <Item
                  key={item.name}
                  onClick={() => {
                    item.onClick()
                    onClose()
                  }}
                >
                  {item.name}
                </Item>
              ))}
            </Block>
          ) : null}
        </AnimatePresence>
      </Positioner>
    </Relative>
  )
}

const Relative = styled.div`
  position: relative;
`

const Positioner = styled.div`
  position: absolute;
`

const Block = styled(motion.div)`
  min-width: 120px;
  background: white;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.24);
`

const Item = styled.div`
  padding: 8px 12px;
  font-size: 14px;
  ${hover(css`
    background: ${colors.gray0};
  `)}
`

export default PopperMenu
