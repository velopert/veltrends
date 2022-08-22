import styled from 'styled-components'
import { useDateDistance } from '~/hooks/useDateDistance'
import { type Comment } from '~/lib/api/types'
import { colors } from '~/lib/colors'
import LikeButton from '../system/LikeButton'
import { SpeechBubble } from '../vectors'
import SubcommentList from './SubcommentList'

interface Props {
  comment: Comment
  isSubcomment?: boolean
}

function CommentItem({ comment, isSubcomment }: Props) {
  const { user, text, createdAt, subcomments, likesCount, mentionUser } = comment

  const dateDistance = useDateDistance(createdAt)
  return (
    <Block>
      <CommentHead>
        <Username>{user.username}</Username>
        <Time>{dateDistance}</Time>
      </CommentHead>
      <Text>
        {mentionUser ? <Mention>@{mentionUser.username}</Mention> : null}
        {text}
      </Text>
      <CommentFooter>
        <LikeBlock>
          <LikeButton size="small" />
          <LikeCount>{likesCount === 0 ? '' : likesCount.toLocaleString()}</LikeCount>
        </LikeBlock>
        <ReplyButton>
          <SpeechBubble />
          답글 달기
        </ReplyButton>
      </CommentFooter>
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
  margin-bottom: 12px;
  color: ${colors.gray5};
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: keep-all;
  font-size: 14px;
`

const CommentFooter = styled.div`
  font-size: 12px;
  color: ${colors.gray3};
  line-height: 1.5;
  display: flex;
  gap: 8px;
`

const LikeBlock = styled.div`
  display: flex;
  align-items: center;
`

const LikeCount = styled.span`
  margin-left: 4px;
  min-width: 24px;
`

const ReplyButton = styled.button`
  background: none;
  outline: none;
  border: none;
  svg {
    width: 16px;
    height: 16px;
    margin-right: 4px;
  }
  display: flex;
  align-items: center;
`

const Mention = styled.span`
  color: ${colors.primary};
  margin-right: 4px;
`

export default CommentItem
