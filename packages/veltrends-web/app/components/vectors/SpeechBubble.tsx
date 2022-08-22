import * as React from 'react'
import { SVGProps } from 'react'

const SvgSpeechBubble = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.667 12.445H13v2.222l-2.963-2.222h-4.26v-2.222H6.89v1.11h3.518l1.482 1.112v-1.111h1.667V6.889h-1.111V5.778h2.222v6.667ZM5.963 9.112 3 11.334V9.112H1.333V1.333h10v7.779h-5.37ZM2.444 8h1.667v1.112L5.593 8h4.63V2.445H2.443V8Z"
      fill="#4B4B4B"
    />
  </svg>
)

export default SvgSpeechBubble
