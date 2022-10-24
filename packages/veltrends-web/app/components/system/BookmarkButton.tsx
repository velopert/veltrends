import styled from '@emotion/styled'
import { colors } from '~/lib/colors'
import { Bookmark, BookmarkOutline } from '../vectors'
import IconToggleButton from './IconToggleButton'

interface Props {
  onClick?(): void
  isActive?: boolean
}

function BookmarkButton({ onClick, isActive }: Props) {
  return (
    <IconToggleButton
      onClick={onClick}
      isActive={isActive}
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

export default BookmarkButton
