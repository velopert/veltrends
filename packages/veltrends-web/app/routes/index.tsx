import { json, type LoaderFunction } from '@remix-run/node'
import { useFetcher, useLoaderData, useNavigate, useSearchParams } from '@remix-run/react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useAnimation } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import LinkCardList from '~/components/home/LinkCardList'
import ListModeSelector from '~/components/home/ListModeSelector'
import WeekSelector from '~/components/home/WeekSelector'
import TabLayout from '~/components/layouts/TabLayout'
import { useInfiniteScroll } from '~/hooks/useInfiniteScroll'
import { getItems } from '~/lib/api/items'
import { type ListMode, type GetItemsResult } from '~/lib/api/types'
import { parseUrlParams } from '~/lib/parseUrlParams'
import { getWeekRangeFromDate } from '~/lib/week'

export const loader: LoaderFunction = async ({ request }) => {
  const { mode } = parseUrlParams<{ mode?: string }>(request.url)
  const fallbackedMode = mode ?? 'trending'

  const range = mode === 'past' ? getWeekRangeFromDate(new Date()) : undefined
  const startDate = range?.[0]
  const endDate = range?.[1]

  // @todo: throw error if invalid error
  const list = await getItems({ mode: fallbackedMode as any, startDate, endDate })
  return json(list)
}

export default function Index() {
  const initialData = useLoaderData<GetItemsResult>()
  const [searchParams] = useSearchParams()
  const [mode, setMode] = useState<ListMode>((searchParams.get('mode') as any) ?? 'trending')
  const navigate = useNavigate()
  const defaultDateRange = useMemo(() => getWeekRangeFromDate(new Date()), [])
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')
  const [dateRange, setDateRange] = useState(
    startDate && endDate ? [startDate, endDate] : defaultDateRange,
  )

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ['items', mode],
    ({ pageParam }) => getItems({ mode, cursor: pageParam }),
    {
      initialData: {
        pageParams: [undefined],
        pages: [initialData],
      },
      getNextPageParam: (lastPage) => {
        if (!lastPage.pageInfo.hasNextPage) return null
        return lastPage.pageInfo.endCursor
      },
    },
  )

  useEffect(() => {
    const nextUrl = mode === 'trending' ? '/' : `/?mode=${mode}`
    navigate(nextUrl, { replace: true })
  }, [mode, navigate])

  const ref = useRef<HTMLDivElement>(null)

  const fetchNext = useCallback(() => {
    if (!hasNextPage) return
    fetchNextPage()
  }, [fetchNextPage, hasNextPage])

  useInfiniteScroll(ref, fetchNext)

  const items = data?.pages.flatMap((page) => page.list)

  return (
    <StyledTabLayout>
      <ListModeSelector mode={mode} onSelectMode={setMode} />
      {mode === 'past' && <WeekSelector dateRange={dateRange} />}
      {items ? <LinkCardList items={items} /> : null}
      <div ref={ref} />
    </StyledTabLayout>
  )
}

const StyledTabLayout = styled(TabLayout)`
  padding-top: 16px;
  padding-left: 16px;
  padding-right: 16px;
`
