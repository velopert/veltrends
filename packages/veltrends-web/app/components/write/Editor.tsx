import { minimalSetup, EditorView } from 'codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { indentWithTab } from '@codemirror/commands'
import { keymap } from '@codemirror/view'
import { colors } from '~/lib/colors'
import { media } from '~/lib/media'

const customTheme = EditorView.theme({
  '&': {
    fontSize: '16px',
    padding: '16px',
    paddingRight: 0,
    borderRadius: '4px',
    cursor: 'text',
  },
  '.cm-content': {
    fontFamily: `Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;`,
  },
  '.ͼ5': {
    // special characters like - # [] () etc
    color: colors.primary,
  },
  '.ͼ7': {
    // headings
    textDecoration: 'none',
  },
  '.ͼc': {
    // link
    color: '#9a9a9a',
  },
})

interface Props {
  onFocus(): void
  onBlur(): void
  className?: string
  onChangeText(text: string): void
  defaultValue?: string
}

function Editor({ onFocus, onBlur, className, onChangeText, defaultValue }: Props) {
  const editorRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView | null>(null)
  const [ready, setReady] = useState(false)
  const [isFocused, setFocused] = useState(false)
  const [height, setHeight] = useState(0)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const onChangeTextRef = useRef(onChangeText)

  useEffect(() => {
    onChangeTextRef.current = onChangeText
  }, [onChangeText])

  useEffect(() => {
    if (editorRef.current) {
      const view = new EditorView({
        extensions: [
          minimalSetup,
          markdown(),
          customTheme,
          keymap.of([indentWithTab]),
          EditorView.lineWrapping,
          EditorView.updateListener.of((update) => {
            onChangeTextRef.current(update.state.doc.toString())
          }),
        ],
        parent: editorRef.current,
        doc: defaultValue,
      })

      setReady(true)

      setHeight(wrapperRef.current?.clientHeight || 0)
      const onResize = () => {
        setHeight(wrapperRef.current?.clientHeight || 0)
      }

      window.addEventListener('resize', onResize)

      return () => {
        setReady(false)
        view.destroy()
        window.removeEventListener('resize', onResize)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const focus = () => {
    if (viewRef.current) {
      viewRef.current.focus()
    }
  }

  return (
    <EditorWrapper
      ref={wrapperRef}
      onFocus={(e) => {
        e.preventDefault()
        focus()
        setFocused(true)
        onFocus()
      }}
      onBlur={(e) => {
        setFocused(false)
        onBlur()
      }}
      isVisible={ready}
      isFocused={isFocused}
      onClick={focus}
      className={className}
      $height={height}
    >
      <div ref={editorRef} />
    </EditorWrapper>
  )
}

const EditorWrapper = styled.div<{ isVisible: boolean; isFocused: boolean; $height: number }>`
  border: 1px solid ${colors.gray2};
  border-radius: 4px;
  outline: none;
  min-height: 150px;
  ${(props) =>
    props.isVisible
      ? css`
          opacity: 1;
        `
      : css`
          opacity: 0;
        `}

  .cm-content, .cm-gutter {
    min-height: 150px;
  }
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

  ${(props) =>
    props.isFocused &&
    css`
      transition: all 0.25s ease-in-out;
      border: 1px solid ${colors.primary};
    `}

  .cm-scroller {
    overflow: 'auto';
  }

  .cm-editor {
    height: ${(props) => props.$height}px;
    ${media.mobile} {
      height: auto;
      max-height: calc(100vh - 374px);
    }
  }
`

export default Editor
