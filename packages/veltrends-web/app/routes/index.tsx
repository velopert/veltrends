import { json, type LoaderFunction } from '@remix-run/cloudflare'
import { useLoaderData, useSearchParams } from '@remix-run/react'
import { useInfiniteQuery } from '@tanstack/react-query'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import LinkCardList from '~/components/home/LinkCardList'
import ListModeSelector from '~/components/home/ListModeSelector'
import WeekSelector from '~/components/home/WeekSelector'
import TabLayout from '~/components/layouts/TabLayout'
import { useInfiniteScroll } from '~/hooks/useInfiniteScroll'
import { getItems } from '~/lib/api/items'
import { type ListMode, type GetItemsResult } from '~/lib/api/types'
import { media } from '~/lib/media'
import { parseUrlParams } from '~/lib/parseUrlParams'
import { getWeekRangeFromDate } from '~/lib/week'

export const loader: LoaderFunction = async ({ request }) => {
  const { mode, start, end } = parseUrlParams<{ mode?: string; start?: string; end?: string }>(
    request.url,
  )
  const fallbackedMode = mode ?? 'trending'

  const range = mode === 'past' ? getWeekRangeFromDate(new Date()) : undefined
  const startDate = start ?? range?.[0]
  const endDate = end ?? range?.[1]

  // @todo: throw error if invalid error
  const list = await getItems({ mode: fallbackedMode as any, startDate, endDate })

  return json(list)
}

export default function Index() {
  const initialData = useLoaderData<GetItemsResult>()

  const [searchParams, setSearchParams] = useSearchParams()
  const [mode, setMode] = useState<ListMode>((searchParams.get('mode') as any) ?? 'trending')
  const defaultDateRange = useMemo(() => getWeekRangeFromDate(new Date()), [])
  const startDate = searchParams.get('start')
  const endDate = searchParams.get('end')
  const [dateRange, setDateRange] = useState(
    startDate && endDate ? [startDate, endDate] : defaultDateRange,
  )

  useEffect(() => {
    if (mode === 'past') {
      setDateRange(startDate && endDate ? [startDate, endDate] : defaultDateRange)
    }
  }, [startDate, endDate, mode, defaultDateRange])

  useEffect(() => {
    const nextMode = (searchParams.get('mode') as ListMode) ?? 'trending'
    if (nextMode !== mode) {
      setMode(nextMode)
    }
  }, [mode, searchParams])

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ['items', mode, mode === 'past' ? { dateRange: dateRange } : undefined].filter(
      (item) => !!item,
    ),
    ({ pageParam }) =>
      getItems({
        mode,
        cursor: pageParam,
        ...(mode === 'past' ? { startDate: dateRange[0], endDate: dateRange[1] } : {}),
      }),
    {
      initialData: {
        pageParams: [undefined],
        pages: [initialData],
      },
      getNextPageParam: (lastPage) => {
        if (!lastPage.pageInfo.hasNextPage) return undefined
        return lastPage.pageInfo.endCursor
      },
    },
  )

  const ref = useRef<HTMLDivElement>(null)

  const fetchNext = useCallback(() => {
    if (!hasNextPage) return
    fetchNextPage()
  }, [fetchNextPage, hasNextPage])

  useInfiniteScroll(ref, fetchNext)

  const items = data?.pages.flatMap((page) => page.list)

  const onSelectMode = (mode: ListMode) => {
    setSearchParams({ mode })
  }

  return (
    <StyledTabLayout>
      <Content>
        <ListModeSelector mode={mode} onSelectMode={onSelectMode} />
        {mode === 'past' && <WeekSelector dateRange={dateRange} />}
        {items ? <LinkCardList items={items} /> : null}
        <div ref={ref} />
      </Content>
    </StyledTabLayout>
  )
}

const StyledTabLayout = styled(TabLayout)`
  padding-top: 16px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
`

const Content = styled.div`
  ${media.wide} {
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
`
