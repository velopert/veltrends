import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  
  html {
    box-sizing: border-box;
  }
  * {
    box-sizing: inherit;
  }
  body {
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    margin: 0;
  }
  button, input {
    font-family: inherit;
  }
  button {
    padding: 0;
    background: none;
    border: none;
    outline: none;
  }
`

export default GlobalStyle
