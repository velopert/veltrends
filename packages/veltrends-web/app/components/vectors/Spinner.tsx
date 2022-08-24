import * as React from 'react'
import { SVGProps } from 'react'

const SvgSpinner = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10h-2a8 8 0 1 1-8-8V2Z"
      fill="currentColor"
    />
  </svg>
)

export default SvgSpinner
