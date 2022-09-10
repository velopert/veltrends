import { json, type LoaderFunction } from '@remix-run/node'
import { useFetcher, useLoaderData, useNavigate } from '@remix-run/react'
import { useAnimation } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import LinkCardList from '~/components/home/LinkCardList'
import ListModeSelector from '~/components/home/ListModeSelector'
import TabLayout from '~/components/layouts/TabLayout'
import { useInfiniteScroll } from '~/hooks/useInfiniteScroll'
import { getItems } from '~/lib/api/items'
import { ListMode, type GetItemsResult } from '~/lib/api/types'
import { parseUrlParams } from '~/lib/parseUrlParams'

export const loader: LoaderFunction = async ({ request }) => {
  const { cursor, mode } = parseUrlParams<{ cursor?: string; mode?: string }>(request.url)
  const parsedCursor = cursor !== undefined ? parseInt(cursor, 10) : undefined
  const fallbackedMode = mode ?? 'trending'

  console.log(fallbackedMode)
  // @todo: throw error if invalid error

  const list = await getItems({ mode: fallbackedMode as any, cursor: parsedCursor })
  return json(list)
}

export default function Index() {
  const data = useLoaderData<GetItemsResult>()
  const [pages, setPages] = useState([data])
  const fetcher = useFetcher()
  const [mode, setMode] = useState<ListMode>('trending')
  const navigate = useNavigate()

  useEffect(() => {
    console.log(data)
  }, [data])

  useEffect(() => {
    const nextUrl = mode === 'trending' ? '/' : `/?mode=${mode}`
    navigate(nextUrl, { replace: true })
  }, [mode, navigate])

  const ref = useRef<HTMLDivElement>(null)

  const fetchNext = useCallback(() => {
    const { endCursor, hasNextPage } = pages.at(-1)?.pageInfo ?? {
      endCursor: null,
      hasNextPage: false,
    }

    if (fetcher.state === 'loading') return

    if (!hasNextPage) return
    fetcher.load(`/?index&cursor=${endCursor}`)
  }, [fetcher, pages])

  useEffect(() => {
    if (!fetcher.data) return
    if (pages.includes(fetcher.data)) return
    setPages(pages.concat(fetcher.data))
  }, [fetcher.data, pages])

  useInfiniteScroll(ref, fetchNext)

  const items = pages.flatMap((page) => page.list)

  return (
    <StyledTabLayout>
      <ListModeSelector mode={mode} onSelectMode={setMode} />
      <LinkCardList items={items} />
      <div ref={ref} />
    </StyledTabLayout>
  )
}

const StyledTabLayout = styled(TabLayout)`
  padding-top: 16px;
  padding-left: 16px;
  padding-right: 16px;
`
