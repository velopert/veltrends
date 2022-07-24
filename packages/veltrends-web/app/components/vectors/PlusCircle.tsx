import * as React from 'react'
import { SVGProps } from 'react'

const SvgPlusCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8Zm0-18a10 10 0 1 0 0 20 10 10 0 0 0 0-20m1 5h-2v4H7v2h4v4h2v-4h4v-2h-4V7Z"
      fill="currentColor"
    />
  </svg>
)

export default SvgPlusCircle
