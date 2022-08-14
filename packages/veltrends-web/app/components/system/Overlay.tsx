import { AnimatePresence, motion } from 'framer-motion'
import styled from 'styled-components'

interface Props {
  visible: boolean
}

function Overlay({ visible }: Props) {
  return (
    <AnimatePresence initial={false}>
      {visible && (
        <Fill initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}></Fill>
      )}
    </AnimatePresence>
  )
}

const Fill = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  height: -webkit-fill-available;
  background: rgba(0, 0, 0, 0.6);
`

export default Overlay
