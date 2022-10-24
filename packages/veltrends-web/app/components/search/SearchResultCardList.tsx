import styled from '@emotion/styled'
import { type SearchResultItem } from '~/lib/api/types'
import { media } from '~/lib/media'
import SearchResultCard from './SearchResultCard'

interface Props {
  items: SearchResultItem[]
}

function SearchResultCardList({ items }: Props) {
  return (
    <Block>
      {items.map((item) => (
        <SearchResultCard item={item} key={item.id} />
      ))}
    </Block>
  )
}

const Block = styled.div`
  padding-top: 24px;
  padding-bottom: 24px;
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  gap: 24px;
  flex-direction: column;
  ${media.desktop} {
    width: 768px;
    margin: 0 auto;
  }
`
export default SearchResultCardList
