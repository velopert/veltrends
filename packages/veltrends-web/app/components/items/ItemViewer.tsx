import styled from 'styled-components'
import { type Item } from '~/lib/api/types'

interface Props {
  item: Item
}

function ItemViewer({ item }: Props) {
  const { thumbnail } = item
  return <Block>{thumbnail ? <Thumbnail src={thumbnail} /> : null}</Block>
}
const Block = styled.div`
  display: flex;
  flex-direction: column;
`
const Thumbnail = styled.img`
  width: 100%;
  height: auto;
  max-height: 80vh;
  object-fit: contain;
`

export default ItemViewer
