import styled from 'styled-components'
import { type Comment } from '~/lib/api/types'
import CommentItem from './CommentItem'

interface Props {
  comments: Comment[]
}

function SubcommentList({ comments }: Props) {
  if (comments.length === 0) return null
  return (
    <List>
      {comments.map((comment) => (
        <CommentItem comment={comment} isSubcomment key={comment.id} />
      ))}
    </List>
  )
}

const List = styled.div`
  padding-left: 24px;
  flex-direction: column;
  padding-top: 12px;
  gap: 12px;
  display: flex;
`
export default SubcommentList
