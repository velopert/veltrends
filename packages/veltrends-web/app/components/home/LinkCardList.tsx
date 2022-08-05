import styled from 'styled-components'
import { type Item } from '~/lib/api/types'
import LinkCard from './LinkCard'

interface Props {
  items: Item[]
}
function LinkCardList({ items }: Props) {
  return (
    <List>
      {items.map((item) => (
        <LinkCard key={item.id} item={item} />
      ))}
    </List>
  )
}

const List = styled.div`
  display: flex;
  flex-direction: column;
`

export default LinkCardList
