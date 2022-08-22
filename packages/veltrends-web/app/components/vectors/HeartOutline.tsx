import * as React from 'react'
import { SVGProps } from 'react'

const SvgHeartOutline = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M12 9.857c.195-.933 1.29-5.19 4.485-5.19 1.85 0 3.848 1.292 3.848 4.169 0 3.256-3.022 7.058-8.333 10.524-5.31-3.466-8.333-7.268-8.333-10.524 0-2.904 1.974-4.171 3.814-4.171 3.269 0 4.287 4.272 4.519 5.192ZM2 8.836c0 3.39 2.55 7.9 10 12.497 7.45-4.596 10-9.107 10-12.497 0-6.635-8.04-7.524-10-3.114C10.052 1.337 2 2.163 2 8.836Z"
      fill="currentColor"
    />
  </svg>
)

export default SvgHeartOutline
