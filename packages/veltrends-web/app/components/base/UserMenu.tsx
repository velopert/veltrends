import { useNavigate } from '@remix-run/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRef } from 'react'
import styled, { css } from 'styled-components'
import { useOnClickOutside } from '~/hooks/useClickOutside'
import { useLogout } from '~/hooks/useLogout'
import { colors } from '~/lib/colors'
import { mediaQuery } from '~/lib/media'

interface Props {
  visible: boolean
  onClose(e?: Event): void
}

function UserMenu({ visible, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, (e) => {
    onClose(e)
  })
  const logout = useLogout()

  const navigate = useNavigate()

  return (
    <AnimatePresence initial={false}>
      {visible ? (
        <Block
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{
            duration: 0.125,
          }}
          ref={ref}
          onClick={() => onClose()}
        >
          <TriangleBorder />
          <Triangle />
          <MenuItem isDesktopHidden onClick={() => navigate('/write')}>
            새 글 등록
          </MenuItem>
          <MenuItem onClick={() => navigate('/setting/account')}>내 계정</MenuItem>
          <MenuItem onClick={() => navigate('/bookmarks')}>북마크</MenuItem>
          <MenuItem onClick={logout}>로그아웃</MenuItem>
        </Block>
      ) : null}
    </AnimatePresence>
  )
}

const Block = styled(motion.div)`
  position: absolute;
  right: 0px;
  top: 48px;
  background: white;
  width: 200px;
  border: 1px solid ${colors.gray0};
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
`

const MenuItem = styled.div<{ isDesktopHidden?: boolean }>`
  padding: 16px;
  cursor: pointer;
  &:hover {
    transition: all 0.125s ease-in;
    background: ${colors.gray0};
  }
  ${(props) =>
    props.isDesktopHidden &&
    css`
      display: block;
      ${mediaQuery(700)} {
        display: none;
      }
    `}
`

const Triangle = styled.div`
  position: absolute;
  right: 16px;
  top: -8px;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid white;
  z-index: 2;
`

const TriangleBorder = styled.div`
  position: absolute;
  right: 14px;
  top: -10px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #e0e0e0;
  z-index: 1;
`

export default UserMenu
