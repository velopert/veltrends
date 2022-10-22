import { EditorView, placeholder } from '@codemirror/view'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { codeMirrorExtensions } from '~/lib/codemirror'
import { colors } from '~/lib/colors'
import Button from '../system/Button'
import LoadingIndicator from '../system/LoadingIndicator'

interface Props {
  onChangeText(text: string): void
  text?: string
  onSubmit(): Promise<any>
  isLoading: boolean
  mode: 'write' | 'edit' | 'reply'
  onClose?(): void
}

const commentEditorTheme = EditorView.theme({
  '&': {
    fontSize: '14px',
    paddingLeft: '12px',
    paddingTop: '8px',
    paddingBottom: '8px',
  },
})

function CommentEditor({ onChangeText, text, onSubmit, isLoading, mode, onClose }: Props) {
  const editorRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView | null>(null)
  const onChangeTextRef = useRef(onChangeText)
  const [isButtonsShown, setIsButtonsShown] = useState(false)

  useEffect(() => {
    onChangeTextRef.current = onChangeText
  }, [onChangeText])

  useEffect(() => {
    if (!editorRef.current) return
    const view = new EditorView({
      extensions: [
        placeholder('댓글을 입력하세요.'),
        commentEditorTheme,
        ...codeMirrorExtensions,
        EditorView.updateListener.of((update) => {
          onChangeTextRef.current(update.state.doc.toString())
        }),
      ],
      parent: editorRef.current,
      doc: text,
    })
    viewRef.current = view
    ;(window as any).view = view
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onReset = () => {
    if (viewRef.current) {
      const transaction = viewRef.current.state.update({
        changes: { from: 0, to: viewRef.current.state.doc.length, insert: '' },
      })
      viewRef.current.update([transaction])
      viewRef.current.contentDOM.blur()
    }
    setIsButtonsShown(false)
    onClose?.()
  }

  // useEffect(() => {
  //   if (!viewRef.current) return
  //   if (viewRef.current.state.doc.toString() === text) return
  //   viewRef.current.dispatch({
  //     changes: { from: 0, to: viewRef.current.state.doc.length, insert: text },
  //   })
  // }, [text])

  const handleSubmit = async () => {
    await onSubmit()
    onReset()
  }

  const buttonText = mode === 'write' ? '등록' : '수정'

  return (
    <Block>
      <Box
        onFocus={(e) => {
          setIsButtonsShown(true)
        }}
      >
        <div ref={editorRef}></div>
      </Box>
      <AnimatePresence>
        {isButtonsShown || mode !== 'write' ? (
          <Actions
            key="actions"
            initial={mode === 'write' ? { height: 0 } : false}
            animate={{ height: 36 }}
            exit={{ height: 0 }}
          >
            <Button variant="text" size="small" onClick={onReset}>
              취소
            </Button>
            <Button size="small" onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? <LoadingIndicator color="white" /> : buttonText}
            </Button>
          </Actions>
        ) : null}
      </AnimatePresence>
      <Space />
    </Block>
  )
}

const Block = styled.div`
  width: 100%;
`

const Actions = styled(motion.div)`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  overflow: hidden;
  button {
    width: 54px;
  }
`

const Space = styled.div`
  height: 1px;
  width: 100%;
`

const Box = styled.div`
  border: 1px solid ${colors.gray2};
  border-radius: 4px;
  outline: none;
  width: 100%;
  min-height: 46px;
  margin-bottom: 8px;
  /* min-height: 150px;

  .cm-content,
  .cm-gutter {
    min-height: 150px;
  }*/
  .cm-gutters {
    margin: 1px;
  }
  .cm-scroller {
    overflow: auto;
  }
  .cm-wrap {
    border: 1px solid silver;
  }

  .cm-focused {
    outline: none !important;
  }

  .cm-line {
    padding-right: 16px;
    word-break: keep-all;
  }

  .cm-scroller {
    overflow: 'auto';
  }

  .cm-editor {
    max-height: 150px;
  }
`

export default CommentEditor