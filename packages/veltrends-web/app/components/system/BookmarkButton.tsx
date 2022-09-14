import styled from 'styled-components'
import { colors } from '~/lib/colors'
import { Bookmark, BookmarkOutline } from '../vectors'
import IconToggleButton from './IconToggleButton'

interface Props {
  onClick?(): void
  isLiked?: boolean
}

function BookmarkButtton({ onClick, isLiked }: Props) {
  return (
    <IconToggleButton
      onClick={onClick}
      isActive={isLiked}
      activeIcon={<StyledBookmarkFill key="fill" />}
      inactiveIcon={<StyledBookmarkOutline key="outline" />}
    />
  )
}

const StyledBookmarkOutline = styled(BookmarkOutline)`
  color: ${colors.gray3};
`

const StyledBookmarkFill = styled(Bookmark)`
  color: ${colors.primary};
`

export default BookmarkButtton
