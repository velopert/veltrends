import { useRef } from 'react'
import styled from 'styled-components'
import { colors } from '~/lib/colors'
import { Search } from '../vectors'

function SearchArea() {
  const ref = useRef<HTMLInputElement>(null)

  const onClick = () => {
    ref.current?.focus()
  }

  return (
    <Block>
      <SearchInputWrapper onClick={onClick}>
        <Search />
        <input ref={ref} />
      </SearchInputWrapper>
    </Block>
  )
}

const Block = styled.div``

const SearchInputWrapper = styled.div`
  height: 36px;
  padding-left: 8px;
  padding-right: 14px;
  border-radius: 4px;
  border: 1px solid ${colors.gray1};
  display: flex;
  align-items: center;
  width: 180px;
  margin-right: 8px;
  & > svg {
    width: 20px;
    height: 20px;
    color: ${colors.gray3};
    margin-right: 8px;
    flex-shrink: 0;
  }
  input {
    border: none;
    outline: none;
    flex: 1;
    min-width: 0;
  }
`

export default SearchArea
