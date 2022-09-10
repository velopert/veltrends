import * as React from 'react'
import { SVGProps } from 'react'

const SvgTrending = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.688 2C9.195 7.99 4 10.053 4 15.33c0 3.584 2.558 6.643 7.5 6.67 4.942.026 7.5-3.678 7.5-7.463 0-3.451-1.718-6.705-4.96-8.729.77 2.173-.255 4.157-1.25 4.84.058-2.78-.938-6.907-4.102-8.648Zm3.925 10.833c3.13 3.324 1.208 7.5-1.306 7.5-1.529 0-2.315-1.054-2.307-2.147.016-2.028 2.28-2.03 3.613-5.353Z"
      fill="currentColor"
    />
  </svg>
)

export default SvgTrending
