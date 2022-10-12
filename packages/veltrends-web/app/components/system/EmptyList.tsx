import styled from 'styled-components'
import { colors } from '~/lib/colors'
import { media } from '~/lib/media'

interface Props {
  message?: string
}

function EmptyList({ message = '리스트가 비어있습니다.' }: Props) {
  return <Block>{message}</Block>
}

const Block = styled.div`
  padding-top: 0;
  padding-bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${colors.gray3};
  white-space: pre-wrap;
  line-height: 1.5;
  text-align: center;

  flex: 1;

  ${media.mobile} {
    padding-top: 128px;
    padding-bottom: 128px;
    font-size: 24px;
  }
`
export default EmptyList
