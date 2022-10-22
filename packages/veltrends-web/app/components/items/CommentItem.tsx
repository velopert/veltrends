import styled from 'styled-components'
import { useUser } from '~/states/user'
import { useCommentLike } from '~/hooks/useCommentLike'
import { useDateDistance } from '~/hooks/useDateDistance'
import { useDeleteComment } from '~/hooks/useDeleteComment'
import { useItemId } from '~/hooks/useItemId'
import { useOpenLoginDialog } from '~/hooks/useOpenLoginDialog'
import { type Comment } from '~/lib/api/types'
import { colors } from '~/lib/colors'
import LikeButton from '../system/LikeButton'
import { SpeechBubble, MoreVert } from '../vectors'
import SubcommentList from './SubcommentList'
import { useBottomSheetModalActions } from '~/states/bottomSheetModal'
import { useCommentLikeById } from '~/states/commentLikes'
import { useState } from 'react'
import ModifyComment from './ModifyComment'
import ReplyComment from './ReplyComment'

interface Props {
  comment: Comment
  isSubcomment?: boolean
}

function CommentItem({ comment, isSubcomment }: Props) {
  const { user, text, createdAt, subcomments, mentionUser, isDeleted } = comment
  const itemId = useItemId()
  const commentLike = useCommentLikeById(comment.id)
  const { like, unlike } = useCommentLike()
  const openLoginDialog = useOpenLoginDialog()
  const currentUser = useUser()
  const isMyComment = comment.user.id === currentUser?.id
  const { open: openBottomSheetModal } = useBottomSheetModalActions()
  const deleteComment = useDeleteComment()
  const [isReplying, setIsReplying] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const onClickMore = () => {
    openBottomSheetModal([
      {
        name: '수정',
        onClick: () => {
          setIsEditing(true)
        },
      },
      {
        name: '삭제',
        onClick: () => {
          deleteComment(comment.id)
        },
      },
    ])
  }

  const likes = commentLike?.likes ?? comment.likes
  const isLiked = commentLike?.isLiked ?? comment.isLiked

  const toggleLike = () => {
    if (!itemId) return
    if (!currentUser) {
      openLoginDialog('commentLike')
      return
    }

    if (isLiked) {
      unlike({
        commentId: comment.id,
        itemId,
        prevLikes: likes,
      })
    } else {
      like({
        commentId: comment.id,
        itemId,
        prevLikes: likes,
      })
    }
  }

  const onReply = () => {
    setIsReplying(true)
  }

  const dateDistance = useDateDistance(createdAt)

  const onCloseEdit = () => {
    setIsEditing(false)
  }

  const onCloseReply = () => {
    setIsReplying(false)
  }

  if (isDeleted) {
    return (
      <Block>
        <DeletedText>삭제된 댓글입니다.</DeletedText>
        {!isSubcomment && subcomments && <SubcommentList comments={subcomments} />}
      </Block>
    )
  }

  if (isEditing) {
    return (
      <Block>
        <CommentHead>
          <LeftGroup>
            <Username>{user.username}</Username>
            <Time>{dateDistance}</Time>
          </LeftGroup>
        </CommentHead>
        <ModifyComment id={comment.id} initialText={text} onClose={onCloseEdit} />
      </Block>
    )
  }
  return (
    <Block data-comment-id={comment.id}>
      <CommentHead>
        <LeftGroup>
          <Username>{user.username}</Username>
          <Time>{dateDistance}</Time>
        </LeftGroup>
        {isMyComment && (
          <MoreButton onClick={onClickMore}>
            <MoreVert />
          </MoreButton>
        )}
      </CommentHead>
      <Text>
        {mentionUser ? <Mention>@{mentionUser.username}</Mention> : null}
        {text}
      </Text>
      <CommentFooter>
        <LikeBlock>
          <LikeButton size="small" isLiked={isLiked} onClick={toggleLike} />
          <LikeCount>{likes === 0 ? '' : likes.toLocaleString()}</LikeCount>
        </LikeBlock>
        <ReplyButton onClick={onReply}>
          <SpeechBubble />
          답글 달기
        </ReplyButton>
      </CommentFooter>

      {isReplying ? (
        <ReplyWrapper>
          <ReplyComment parentCommentId={comment.id} onClose={onCloseReply} />
        </ReplyWrapper>
      ) : null}

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
  align-items: center;
  justify-content: space-between;
`

const LeftGroup = styled.div`
  display: flex;
  align-items: flex-end;
`

const MoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: ${colors.gray5};
  svg {
    width: 20px;
    height: 20px;
  }
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
  margin-left: 8px;
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

const DeletedText = styled(Text)`
  color: ${colors.gray2};
  margin: 0;
`

const ReplyWrapper = styled.div`
  padding-left: 16px;
  padding-top: 16px;
`

export default CommentItem
