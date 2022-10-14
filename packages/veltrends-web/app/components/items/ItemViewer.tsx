import { AnimatePresence, motion } from 'framer-motion'
import styled from 'styled-components'
import { useUser } from '~/states/user'
import { useDateDistance } from '~/hooks/useDateDistance'
import { useLikeManager } from '~/hooks/useLikeManager'
import { useOpenLoginDialog } from '~/hooks/useOpenLoginDialog'
import { type Item } from '~/lib/api/types'
import { colors } from '~/lib/colors'
import LikeButton from '../system/LikeButton'
import { Globe } from '../vectors'
import { useBookmarkManager } from '~/hooks/useBookmarkManager'
import BookmarkButton from '../system/BookmarkButton'
import { useItemOverrideById } from '~/states/itemOverride'
import { media } from '~/lib/media'
import { useNavigate } from '@remix-run/react'
import { useOpenDialog } from '~/states/dialog'
import { deleteItem } from '~/lib/api/items'

interface Props {
  item: Item
  isMyItem: boolean
}

function ItemViewer({ item, isMyItem }: Props) {
  const { id, thumbnail, publisher, author, title, body, user, createdAt } = item
  const itemOverride = useItemOverrideById(id)
  const dateDistance = useDateDistance(createdAt)

  const itemStats = itemOverride?.itemStats ?? item.itemStats
  const isLiked = itemOverride?.isLiked ?? item.isLiked
  const likes = itemOverride?.itemStats?.likes ?? itemStats.likes
  const isBookmarked = itemOverride?.isBookmarked ?? item.isBookmarked

  const { like, unlike } = useLikeManager()
  const { create, remove } = useBookmarkManager()
  const openLoginDialog = useOpenLoginDialog()
  const currentUser = useUser()

  const toggleBookmark = () => {
    if (!currentUser) {
      openLoginDialog('bookmark')
      return
    }
    if (isBookmarked) {
      remove(id)
    } else {
      create(id)
    }
  }

  const toggleLike = () => {
    if (!currentUser) {
      openLoginDialog('like')
      return
    }
    if (isLiked) {
      unlike(id, itemStats)
    } else {
      like(id, itemStats)
    }
  }

  const openDialog = useOpenDialog()
  const navigate = useNavigate()
  const onClickDelete = () => {
    openDialog({
      title: '삭제',
      description: '정말로 삭제하시겠습니까?',
      mode: 'YESNO',
      cancelText: '취소',
      confirmText: '삭제',
      async onConfirm() {
        /** @todo: show fullscreen spinner on loading */
        await deleteItem(item.id)
        navigate('/')
      },
    })
  }
  const onClickModify = () => {
    navigate(`/write/edit?itemId=${item.id}`)
  }

  return (
    <Block>
      {thumbnail ? (
        <a href={item.link}>
          <Thumbnail src={thumbnail} />
        </a>
      ) : null}
      <Content>
        <a href={item.link}>
          <Publisher>
            {publisher.favicon ? <img src={publisher.favicon} alt="favicon" /> : <Globe />}
            {author ? `${author} · ` : ''}
            {publisher.name}
          </Publisher>
          <Title>{title}</Title>
          {isMyItem ? (
            <MyItemActions
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
              }}
            >
              <TextButton onClick={onClickDelete}>삭제</TextButton>
              <TextButton onClick={onClickModify}>수정</TextButton>
            </MyItemActions>
          ) : null}
          <Body>{body}</Body>
        </a>
        <AnimatePresence initial={false}>
          {likes === 0 ? null : (
            <LikesCount
              key="likes"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 26, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              좋아요 {likes.toLocaleString()}개
            </LikesCount>
          )}
        </AnimatePresence>
        <Footer>
          <IconButtons>
            <LikeButton isLiked={isLiked} onClick={toggleLike} />
            <BookmarkButton isActive={isBookmarked} onClick={toggleBookmark} />
          </IconButtons>
          <UserInfo>
            by <b>{user.username}</b> · {dateDistance}
          </UserInfo>
        </Footer>
      </Content>
    </Block>
  )
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  & > a {
    display: block;
  }
`
const Thumbnail = styled.img`
  width: 100%;
  height: auto;
  max-height: 80vh;
  object-fit: contain;
`

const Content = styled.div`
  padding: 16px;
  border-bottom: 1px solid ${colors.gray0};
  a {
    display: block;
    text-decoration: none;
    color: inherit;
  }
`

const MyItemActions = styled.div`
  color: ${colors.gray2};
  font-size: 14px;
  margin-top: 8px;
  gap: 8px;
  display: none;
  ${media.mobile} {
    display: flex;
  }
`

const TextButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    color: ${colors.gray3};
  }
`

const Publisher = styled.div`
  display: flex;
  color: ${colors.gray3};
  font-size: 14px;
  margin-bottom: 8px;
  line-height: 1.5;
  align-items: center;
  img,
  svg {
    display: block;
    margin-right: 8px;
    display: block;
    width: 16px;
    height: 16px;
  }
`

const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 0;
  color: ${colors.gray5};
  line-height: 1.5;
`

const Body = styled.p`
  margin-top: 16px;
  margin-bottom: 32px;
  font-size: 14px;
  line-height: 1.5;
  color: ${colors.gray4};
  white-space: pre-wrap;
  word-break: keep-all;
`

const LikesCount = styled(motion.div)`
  font-size: 12px;
  font-weight: 600;
  color: ${colors.gray4};
  line-height: 1.5;
  height: 26px;
  display: flex;
`

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const UserInfo = styled.div`
  color: ${colors.gray2};
  font-size: 14px;
`

const IconButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export default ItemViewer
