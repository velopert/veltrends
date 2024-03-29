import styled from '@emotion/styled'
import { type Comment } from '~/lib/api/types'
import { media } from '~/lib/media'
import CommentItem from './CommentItem'
import WriteComment from './WriteComment'

interface Props {
  comments: Comment[]
}
function CommentList({ comments }: Props) {
  return (
    <Block>
      <CommentTitle>댓글 {comments.length.toLocaleString()}개</CommentTitle>
      <WriteComment />
      <List>
        {comments.map((comment) => (
          <CommentItem comment={comment} key={comment.id} />
        ))}
      </List>
    </Block>
  )
}

const Block = styled.div`
  padding: 16px;
  ${media.tablet} {
    padding-left: 0;
    padding-right: 0;
  }
`

const CommentTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 600;
`

const List = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 24px;
`

export default CommentList
