import styled from 'styled-components'
import { colors } from '~/lib/colors'
import { Search } from '../vectors'

interface Props {
  value: string
  onChangeText(text: string): void
}

function SearchInput({ value, onChangeText }: Props) {
  return (
    <Block>
      <Search />
      <input
        value={value}
        onChange={(e) => {
          onChangeText(e.target.value)
        }}
      />
    </Block>
  )
}

const Block = styled.div`
  width: 100%;
  height: 32px;
  background: ${colors.gray0};
  border-radius: 4px;
  padding-left: 8px;
  padding-right: 8px;
  display: flex;
  align-items: center;
  svg {
    width: 16px;
    height: 16px;
  }
  input {
    flex: 1;
    margin-left: 8px;
    background: none;
    border: none;
    outline: none;
  }
`

export default SearchInput
