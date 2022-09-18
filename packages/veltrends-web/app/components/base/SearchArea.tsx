import { useNavigate, useSearchParams } from '@remix-run/react'
import React, { useRef } from 'react'
import styled from 'styled-components'
import { colors } from '~/lib/colors'
import { Search } from '../vectors'

function SearchArea() {
  const ref = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const initialKeyword = searchParams.get('q') ?? ''

  const onClick = () => {
    ref.current?.focus()
  }

  const onKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      console.log(ref.current?.value)
      navigate(`/search?q=${ref.current?.value}`)
    }
  }

  return (
    <Block>
      <SearchInputWrapper onClick={onClick} onKeyUp={onKeyUp}>
        <Search />
        <input ref={ref} defaultValue={initialKeyword} />
      </SearchInputWrapper>
    </Block>
  )
}

const Block = styled.div``

const SearchInputWrapper = styled.div`
  height: 36px;
  padding-left: 12px;
  padding-right: 14px;
  border-radius: 4px;
  background: #f6f6f6;
  border: 1px solid ${colors.gray0};
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
    background: none;
  }
`

export default SearchArea
