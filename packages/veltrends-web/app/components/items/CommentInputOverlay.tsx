import { AnimatePresence, motion } from 'framer-motion'
import styled from 'styled-components'
import { useCommentInputStore } from '~/stores/useCommentInputStore'
import Overlay from '../system/Overlay'

function CommentInputOverlay() {
  const visible = useCommentInputStore((store) => store.visible)

  return (
    <>
      <Overlay visible={visible} />
      <AnimatePresence initial={false}>
        {visible && (
          <Footer
            initial={{ y: 48 }}
            animate={{ y: 0 }}
            exit={{ y: 48 }}
            transition={{
              damping: 0,
            }}
          />
        )}
      </AnimatePresence>
    </>
  )
}

const Footer = styled(motion.div)`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 48px;
  background: white;
`

export default CommentInputOverlay
