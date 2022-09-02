import { useState } from 'react'
import styled from 'styled-components'
import Header from '~/components/base/Header'
import TabLayout from '~/components/layouts/TabLayout'
import SearchInput from '~/components/search/SearchInput'
import { useDebounce } from 'use-debounce'

export default function Search() {
  const [searchText, setSearchText] = useState('')
  const [debouncedSearchText] = useDebounce(searchText, 300)

  return (
    <TabLayout
      header={
        <StyledHeader title={<SearchInput value={searchText} onChangeText={setSearchText} />} />
      }
    >
      {debouncedSearchText}
    </TabLayout>
  )
}

const StyledHeader = styled(Header)`
  & > .title {
    width: 100%;
  }
`
