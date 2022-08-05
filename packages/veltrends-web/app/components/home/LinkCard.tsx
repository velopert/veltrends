import styled from 'styled-components'
import { type Item } from '~/lib/api/types'

interface Props {
  item: Item
}

function LinkCard(props: Props) {
  return <Block></Block>
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
`

export default LinkCard
