import { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Header from '~/components/base/Header'
import TabLayout from '~/components/layouts/TabLayout'
import SearchInput from '~/components/search/SearchInput'
import { useDebounce } from 'use-debounce'
import { json, type LoaderFunction } from '@remix-run/node'
import { parseUrlParams } from '~/lib/parseUrlParams'
import { stringify } from 'qs'
import { useLoaderData, useNavigate, useSearchParams } from '@remix-run/react'
import { searchItems } from '~/lib/api/search'
import SearchResultCardList from '~/components/search/SearchResultCardList'
import { type SearchItemsResult } from '~/lib/api/types'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInfiniteScroll } from '~/hooks/useInfiniteScroll'

export const loader: LoaderFunction = async ({ request }) => {
  const { q } = parseUrlParams<{ q?: string }>(request.url)
  if (!q) {
    return json({
      list: [],
      totalCount: 0,
      pageInfo: {
        nextOffset: null,
        hasNextPage: false,
      },
    })
  }
  // @todo: handler errors
  const searchResult = await searchItems({ q })
  return json(searchResult)
}

export default function Search() {
  const data = useLoaderData<SearchItemsResult>()
  const [searchParams] = useSearchParams()
  const [searchText, setSearchText] = useState(searchParams.get('q') ?? '')
  const [debouncedSearchText] = useDebounce(searchText, 300)
  const {
    hasNextPage,
    data: infiniteData,
    isFetching,
    fetchNextPage,
  } = useInfiniteQuery(
    ['searchResults', debouncedSearchText],
    ({ pageParam }) => searchItems({ q: debouncedSearchText, offset: pageParam }),
    {
      enabled: debouncedSearchText !== '',
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage.pageInfo.hasNextPage) return null
        return lastPage.pageInfo.nextOffset
      },
      initialData: {
        pageParams: [undefined],
        pages: [data],
      },
    },
  )
  const ref = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const fetchNext = useCallback(() => {
    if (!hasNextPage) return
    fetchNextPage()
  }, [hasNextPage, fetchNextPage])

  useInfiniteScroll(ref, fetchNext)

  useEffect(() => {
    navigate('/search?' + stringify({ q: debouncedSearchText }))
  }, [debouncedSearchText, navigate])

  const items = infiniteData?.pages.flatMap((page) => page.list)

  return (
    <TabLayout
      header={
        <StyledHeader title={<SearchInput value={searchText} onChangeText={setSearchText} />} />
      }
    >
      <SearchResultCardList items={items ?? []} />
      <div ref={ref}></div>
    </TabLayout>
  )
}

const StyledHeader = styled(Header)`
  & > .title {
    width: 100%;
  }
`
