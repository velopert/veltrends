import { json, LinksFunction, MetaFunction, type LoaderFunction } from '@remix-run/cloudflare'
import { ThrownResponse, useCatch, useLoaderData, useSearchParams } from '@remix-run/react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import QueryString from 'qs'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import LinkCardList from '~/components/home/LinkCardList'
import ListModeSelector from '~/components/home/ListModeSelector'
import WeekSelector from '~/components/home/WeekSelector'
import TabLayout from '~/components/layouts/TabLayout'
import EmptyList from '~/components/system/EmptyList'
import { useInfiniteScroll } from '~/hooks/useInfiniteScroll'
import { getItems } from '~/lib/api/items'
import { type ListMode, type GetItemsResult } from '~/lib/api/types'
import { consumeCookie, setupBaseUrl } from '~/lib/client'
import { media } from '~/lib/media'
import { parseUrlParams } from '~/lib/parseUrlParams'
import { getWeekRangeFromDate } from '~/lib/week'

export const loader: LoaderFunction = async ({ request, context }) => {
  setupBaseUrl(context)
  try {
    consumeCookie(request)
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
  } catch (e: any) {
    throw json(
      {
        message: e?.message,
        name: e?.name,
        stack: e?.stack,
        msg: 'Failed??',
      },
      { status: 500 },
    )
  }
}

export const meta: MetaFunction = ({ params, location }) => {
  const query = QueryString.parse(location.search, { ignoreQueryPrefix: true })

  if (query.mode === 'recent') {
    return {
      title: 'Veltrends - 최신 뉴스',
      description: '방금 벨트렌즈에 올라온 따끈따끈한 뉴스들을 확인해보세요.',
    }
  }
  if (query.mode === 'past') {
    const { start, end } = query
    const range = getWeekRangeFromDate(new Date())
    const startDate = (start as string) ?? range?.[0]
    const endDate = (end as string) ?? range?.[1]

    const formattedStart = format(new Date(startDate), 'yyyy년 MM월 dd일')
    const formattedEnd = format(new Date(endDate), 'yyyy년 MM월 dd일')

    return {
      title: `Veltrends - 과거 뉴스 (${formattedStart} ~ ${formattedEnd})`,
      description: `${formattedStart} ~ ${formattedEnd}에 벨트렌즈에 올라온 뉴스들을 인기순으로 확인해보세요.`,
    }
  }

  return {
    title: 'Veltrends',
    description:
      '개발, IT, 디자인, 스타트업 관련 유익하고 재미있는 소식들을 벨트렌즈에서 확인하세요.',
  }
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
      {items?.length === 0 ? <EmptyList /> : null}
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

export function CatchBoundary() {
  const caught = useCatch()
  console.log(caught.data)

  return (
    <div>
      <h1>Caught</h1>
      <p>Status: {caught.status}</p>
      <p></p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  )
}
