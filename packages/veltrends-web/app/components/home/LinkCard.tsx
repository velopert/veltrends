import styled from 'styled-components'
import { useItemOverrideById } from '~/contexts/ItemOverrideContext'
import { useDateDistance } from '~/hooks/useDateDistance'
import { useLikeManager } from '~/hooks/useLikeManager'
import { likeItem } from '~/lib/api/items'
import { type Item } from '~/lib/api/types'
import { colors } from '~/lib/colors'
import LikeButton from '../system/LikeButton'
import { Globe, HeartOutline } from '../vectors'

interface Props {
  item: Item
}

function LinkCard({ item }: Props) {
  const { thumbnail, title, publisher, body, author, user, createdAt, id, itemStats } = item
  const itemOverride = useItemOverrideById(id)
  const dateDistance = useDateDistance(createdAt)
  const { like, unlike } = useLikeManager()

  const isLiked = itemOverride?.isLiked ?? item.isLiked
  const likes = itemOverride?.itemStats.likes ?? itemStats.likes

  const toggleLike = () => {
    if (isLiked) {
      unlike(id, itemStats)
    } else {
      like(id, itemStats)
    }
  }

  return (
    <Block>
      {thumbnail ? <Thumbnail src={thumbnail} alt={title} /> : null}
      <Publisher>
        {publisher.favicon ? <img src={publisher.favicon} alt="favicon" /> : <Globe />}
        {author ? `${author} · ` : ''}
        {publisher.name}
      </Publisher>
      <h3>{title}</h3>
      <p>{body}</p>
      {likes === 0 ? null : <LikesCount>좋아요 {likes.toLocaleString()}개</LikesCount>}
      <Footer>
        <LikeButton isLiked={isLiked} onClick={toggleLike} />
        <UserInfo>
          by <b>{user.username}</b> · {dateDistance}
        </UserInfo>
      </Footer>
    </Block>
  )
}

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
  aspect-ratio: 288/192;
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

const StyledHeartOutline = styled(HeartOutline)`
  color: ${colors.gray3};
`

const LikesCount = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${colors.gray4};
  line-height: 1.5;
  margin-bottom: 8px;
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

export default LinkCard
