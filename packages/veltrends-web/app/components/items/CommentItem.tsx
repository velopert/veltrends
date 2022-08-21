import styled from 'styled-components'
import { useDateDistance } from '~/hooks/useDateDistance'
import { type Comment } from '~/lib/api/types'
import { colors } from '~/lib/colors'
import SubcommentList from './SubcommentList'

interface Props {
  comment: Comment
  isSubcomment?: boolean
}

function CommentItem({ comment, isSubcomment }: Props) {
  const { user, text, createdAt, subcomments } = comment
  const dateDistance = useDateDistance(createdAt)
  return (
    <Block>
      <CommentHead>
        <Username>{user.username}</Username>
        <Time>{dateDistance}</Time>
      </CommentHead>
      <Text>{text}</Text>
      {!isSubcomment && subcomments && <SubcommentList comments={subcomments} />}
    </Block>
  )
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
`

const CommentHead = styled.div`
  display: flex;
  align-items: flex-end;
`

const Username = styled.div`
  color: ${colors.gray5};
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
`
const Time = styled.div`
  color: ${colors.gray2};
  font-size: 12px;
  line-height: 1.5;
  margin-left: 4px;
`

const Text = styled.p`
  margin-top: 4px;
  margin-bottom: 8px;
  color: ${colors.gray5};
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: keep-all;
`

export default CommentItem
