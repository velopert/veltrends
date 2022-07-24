import * as React from 'react'
import { SVGProps } from 'react'

const SvgHome = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5Z" fill="currentColor" />
  </svg>
)

export default SvgHome
