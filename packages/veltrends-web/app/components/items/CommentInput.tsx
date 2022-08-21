import styled from 'styled-components'
import { colors } from '~/lib/colors'

function CommentInput() {
  return <DummyInput>댓글을 입력하세요</DummyInput>
}

const DummyInput = styled.div`
  height: 48px;
  width: 100%;
  border-radius: 4px;
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  align-items: center;
  color: ${colors.gray1};
  font-size: 16px;
  border: 1px solid ${colors.gray2};
`

export default CommentInput
