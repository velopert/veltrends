import { useRef, useState } from 'react'
import styled from 'styled-components'
import Button from '../system/Button'
import { User } from '../vectors'
import UserMenu from './UserMenu'

function UserAddon({ username }: { username: string }) {
  const [visible, setVisible] = useState(false)

  const onOpen = () => setVisible(true)
  const onClose = (e?: Event) => {
    const isButton =
      buttonRef.current?.contains(e?.target as Node) || buttonRef.current === e?.target
    if (isButton) return
    setVisible(false)
  }

  const buttonRef = useRef<HTMLButtonElement>(null)

  return (
    <Responsive>
      <Button variant="text" size="small" onClick={onOpen} ref={buttonRef}>
        <Block>
          <User />
          {username}
        </Block>
      </Button>
      <UserMenu visible={visible} onClose={onClose} />
    </Responsive>
  )
}

const Responsive = styled.div`
  display: flex;
  position: relative;
`

const Block = styled.span`
  display: flex;
  align-items: center;
  svg {
    margin-right: 8px;
    width: 20px;
    height: 20px;
  }
`

export default UserAddon
