import { markdown } from '@codemirror/lang-markdown'
import { keymap } from '@codemirror/view'
import { EditorView, minimalSetup } from 'codemirror'
import { colors } from './colors'
import { indentWithTab } from '@codemirror/commands'

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

export const codeMirrorExtensions = [
  minimalSetup,
  markdown(),
  customTheme,
  keymap.of([indentWithTab]),
  EditorView.lineWrapping,
]
