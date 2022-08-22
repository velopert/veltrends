import * as React from 'react'
import { SVGProps } from 'react'

const SvgHeartFill = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M12 5.863c-1.658-4.5-10-3.831-10 2.973 0 3.39 2.55 7.9 10 12.497 7.45-4.596 10-9.107 10-12.497 0-6.765-8.333-7.5-10-2.973Z"
      fill="currentColor"
    />
  </svg>
)

export default SvgHeartFill
