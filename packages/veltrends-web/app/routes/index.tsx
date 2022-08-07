import { json, type LoaderFunction } from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import LinkCardList from '~/components/home/LinkCardList'
import TabLayout from '~/components/layouts/TabLayout'
import { useInfiniteScroll } from '~/hooks/useInfiniteScroll'
import { getItems } from '~/lib/api/items'
import { type GetItemsResult } from '~/lib/api/types'
import { parseUrlParams } from '~/lib/parseUrlParams'

export const loader: LoaderFunction = async ({ request }) => {
  const { cursor } = parseUrlParams<{ cursor?: string }>(request.url)
  const parsedCursor = cursor !== undefined ? parseInt(cursor, 10) : undefined
  const list = await getItems(parsedCursor)
  return json(list)
}

export default function Index() {
  const data = useLoaderData<GetItemsResult>()
  const [pages, setPages] = useState([data])
  const fetcher = useFetcher()

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
      <LinkCardList items={items} />
      <div ref={ref}>lalaland</div>
      <h2>LOOOK</h2>
    </StyledTabLayout>
  )
}

const StyledTabLayout = styled(TabLayout)`
  padding-top: 16px;
  padding-left: 16px;
  padding-right: 16px;
`
