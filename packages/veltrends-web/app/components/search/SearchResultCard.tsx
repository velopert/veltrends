import styled from 'styled-components'
import { type SearchResultItem } from '~/lib/api/types'
import { colors } from '~/lib/colors'
import { Globe } from '../vectors'

interface Props {
  item: SearchResultItem
}

function SearchResultCard({ item }: Props) {
  const { publisher, author, highlight } = item
  return (
    <Block>
      {' '}
      <Publisher>
        {publisher.favicon ? <img src={publisher.favicon} alt="favicon" /> : <Globe />}
        {author ? `${author} · ` : ''}
        {publisher.name}
      </Publisher>
      {/** @todo: Secure this code **/}
      <h3 dangerouslySetInnerHTML={{ __html: highlight.title }}></h3>
      <p dangerouslySetInnerHTML={{ __html: highlight.body }}></p>
    </Block>
  )
}

const Block = styled.div`
  h3 {
    margin-top: 0;
    margin-bottom: 0;
    font-weight: 400;
    font-size: 16px;
    color: ${colors.gray4};
    line-height: 1.5;
    font-weight: 600;
    em {
      font-weight: 800;
    }
  }
  em {
    color: ${colors.gray5};
    font-style: normal;
  }
  p {
    line-height: 1.5;
    font-size: 14px;
    margin-top: 8px;
    margin-bottom: 8px;
    color: ${colors.gray3};
    em {
      font-weight: 600;
    }
  }
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

export default SearchResultCard
