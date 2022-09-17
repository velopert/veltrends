import { css, type FlattenSimpleInterpolation } from 'styled-components'

export const hover = (styles: string | FlattenSimpleInterpolation) => css`
  @media (hover: hover) {
    &:hover:enabled {
      ${styles}
    }
  }
`
