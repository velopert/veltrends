import { AnimatePresence, motion } from 'framer-motion'
import styled from 'styled-components'
import { colors } from '~/lib/colors'
import { useCommentInputStore } from '~/stores/useCommentInputStore'
import Overlay from '../system/Overlay'
import { useEffect, useState } from 'react'
import { useItemId } from '~/hooks/useItemId'
import { useCreateCommentMutation } from '~/hooks/mutation/useCreateCommentMutation'
import LoadingIndicator from '../system/LoadingIndicator'

function CommentInputOverlay() {
  const { visible, close, parentCommentId } = useCommentInputStore()
  const [text, setText] = useState('')
  const itemId = useItemId()

  const { mutate, isLoading } = useCreateCommentMutation({
    onSuccess(data) {
      // @todo: do sth with data
      console.log('hello world')
      close()
    },
  })

  useEffect(() => {
    if (visible) {
      setText('')
    }
  }, [visible])

  const onClick = () => {
    if (!itemId) return
    mutate({
      itemId,
      text,
    })
  }

  return (
    <>
      <Overlay visible={visible} onClick={close} />
      <AnimatePresence initial={false}>
        {visible && (
          <Footer
            initial={{ y: 48 }}
            animate={{ y: 0 }}
            exit={{ y: 48 }}
            transition={{
              damping: 0,
            }}
          >
            <Input
              placeholder="댓글을 입력하세요."
              onChange={(e) => {
                setText(e.target.value)
              }}
              value={text}
            />
            <TransparentButton onClick={onClick} disabled={isLoading}>
              {isLoading ? <LoadingIndicator /> : '등록'}
            </TransparentButton>
          </Footer>
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
  display: flex;
  align-items: center;
`

const Input = styled.input`
  height: 100%;
  flex: 1;

  border: none;
  outline: none;
  padding: 0;
  padding-left: 16px;
  font-size: 16px;
  color: ${colors.gray5};
  &::placeholder {
    color: ${colors.gray1};
  }
`

const TransparentButton = styled.button`
  background: none;
  border: none;
  outline: none;
  font-size: 16px;
  padding-right: 16px;
  padding-left: 16px;
  height: 100%;
  color: ${colors.primary};
  width: 60px;
`

export default CommentInputOverlay
