import * as React from 'react'
import { SVGProps } from 'react'

const SvgTime = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M13 11.94V7h-2v6l4.017 2.727 1.123-1.655L13 11.94Z" fill="currentColor" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"
      fill="currentColor"
    />
  </svg>
)

export default SvgTime
