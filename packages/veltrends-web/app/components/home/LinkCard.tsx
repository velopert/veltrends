import { Link } from '@remix-run/react'
import { AnimatePresence, motion } from 'framer-motion'
import styled from 'styled-components'
import { useItemOverrideById } from '~/stores/useItemOverrideStore'
import { useUser } from '~/contexts/UserContext'
import { useDateDistance } from '~/hooks/useDateDistance'
import { useLikeManager } from '~/hooks/useLikeManager'
import { useOpenLoginDialog } from '~/hooks/useOpenLoginDialog'
import { type Item } from '~/lib/api/types'
import { colors } from '~/lib/colors'
import LikeButton from '../system/LikeButton'
import { Globe } from '../vectors'
import BookmarkButton from '../system/BookmarkButton'
import { useBookmarkManager } from '~/hooks/useBookmarkManager'

interface Props {
  item: Item
}

function LinkCard({ item }: Props) {
  const { thumbnail, title, publisher, body, author, user, createdAt, id } = item
  const itemOverride = useItemOverrideById(id)
  const dateDistance = useDateDistance(createdAt)
  const { like, unlike } = useLikeManager()
  const currentUser = useUser()
  const { create, remove } = useBookmarkManager()

  const itemStats = itemOverride?.itemStats ?? item.itemStats
  const isLiked = itemOverride?.isLiked ?? item.isLiked
  const likes = itemOverride?.itemStats?.likes ?? itemStats.likes
  const isBookmarked = itemOverride?.isBookmarked ?? item.isBookmarked

  const openLoginDialog = useOpenLoginDialog()

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

  const link = `/items/${item.id}`

  return (
    <Block>
      <StyledLink to={link}>
        {thumbnail ? <Thumbnail src={thumbnail} alt={title} /> : null}
        <Publisher>
          {publisher.favicon ? <img src={publisher.favicon} alt="favicon" /> : <Globe />}
          {author ? `${author} · ` : ''}
          {publisher.name}
        </Publisher>
        <h3>{title}</h3>
        <p>{body}</p>
      </StyledLink>
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
    </Block>
  )
}

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
`

const Block = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
    margin-top: 0;
    margin-bottom: 16px;
    font-size: 18px;
    font-weight: 600;
    line-height: 1.5;
    color: ${colors.gray5};
  }
  p {
    margin-top: 0;
    margin-bottom: 16px;
    font-size: 14px;
    line-height: 1.5;
    color: ${colors.gray4};
  }
`

const Thumbnail = styled.img`
  width: 100%;
  /* aspect-ratio: 288/192; */
  max-height: 40vh;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 0 3px rgb(0 0 0 / 15%);
  display: block;
  margin-bottom: 16px;
`

const Publisher = styled.div`
  display: flex;
  color: ${colors.gray3};
  font-size: 14px;
  margin-bottom: 4px;
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

export default LinkCard
