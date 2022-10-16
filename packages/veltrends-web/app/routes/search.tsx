import { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import MobileHeader from '~/components/base/MobileHeader'
import TabLayout from '~/components/layouts/TabLayout'
import SearchInput from '~/components/search/SearchInput'
import { useDebounce } from 'use-debounce'
import { json, MetaFunction, type LoaderFunction } from '@remix-run/cloudflare'
import { parseUrlParams } from '~/lib/parseUrlParams'
import QueryString, { stringify } from 'qs'
import { useLoaderData, useNavigate, useSearchParams } from '@remix-run/react'
import { searchItems } from '~/lib/api/search'
import SearchResultCardList from '~/components/search/SearchResultCardList'
import { type SearchItemsResult } from '~/lib/api/types'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useInfiniteScroll } from '~/hooks/useInfiniteScroll'
import DesktopHeader from '~/components/base/DesktopHeader'
import { consumeCookie, setupBaseUrl } from '~/lib/client'

export const loader: LoaderFunction = async ({ request, context }) => {
  setupBaseUrl(context)
  consumeCookie(request)
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

export const meta: MetaFunction = ({ params, data, location }) => {
  const { q } = QueryString.parse(location.search, { ignoreQueryPrefix: true })
  if (!q) {
    return {
      title: '검색',
      robots: 'noindex',
    }
  }
  const { totalCount } = data as SearchItemsResult

  return {
    title: `"${q}" 검색 결과 - veltrends`,
    description: `"${q}" 검색 결과입니다. 총 ${totalCount}개의 검색 결과가 있습니다.`,
  }
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

  const queryClient = useQueryClient()
  useEffect(() => {
    queryClient.setQueryData(['searchResults', debouncedSearchText], {
      pageParams: [undefined],
      pages: [data],
    })
  }, [data, debouncedSearchText, queryClient])

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
        <>
          <StyledHeader title={<SearchInput value={searchText} onChangeText={setSearchText} />} />
          <DesktopHeader />
        </>
      }
    >
      <SearchResultCardList items={items ?? []} />
      <div ref={ref}></div>
    </TabLayout>
  )
}

const StyledHeader = styled(MobileHeader)`
  & > .title {
    width: 100%;
  }
`
