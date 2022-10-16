import { json, type LoaderFunction, redirect, MetaFunction } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useRef } from 'react'
import styled from 'styled-components'
import LinkCardList from '~/components/home/LinkCardList'
import TabLayout from '~/components/layouts/TabLayout'
import EmptyList from '~/components/system/EmptyList'
import { useInfiniteScroll } from '~/hooks/useInfiniteScroll'
import { getBookmarks } from '~/lib/api/bookmark'
import { type GetBookmarksResult } from '~/lib/api/types'
import { setupBaseUrl } from '~/lib/client'
import { media } from '~/lib/media'
import { checkIsLoggedIn } from '~/lib/protectRoute'

export const loader: LoaderFunction = async ({ request, context }) => {
  setupBaseUrl(context)
  const isLoggedIn = await checkIsLoggedIn(request)
  if (!isLoggedIn) return redirect('/auth/login?next=/bookmarks')

  const bookmarks = await getBookmarks()
  return json(bookmarks)
}

export const meta: MetaFunction = () => {
  return { title: '북마크', robots: 'noindex' }
}

export default function Bookmarks() {
  const initialData = useLoaderData<GetBookmarksResult>()
  const ref = useRef<HTMLDivElement>(null)

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ['bookmarks'],
    ({ pageParam }) => getBookmarks(pageParam),
    {
      initialData: {
        pageParams: [undefined],
        pages: [initialData],
      },
      getNextPageParam: (lastPage) => {
        if (!lastPage.pageInfo.hasNextPage) return undefined
        return lastPage.pageInfo.nextOffset
      },
    },
  )

  useInfiniteScroll(ref, fetchNextPage)

  const items = data?.pages.flatMap((page) => page.list.map((bookmark) => bookmark.item))

  return (
    <StyledTabLayout>
      {items?.length === 0 ? (
        <EmptyList
          message={'북마크가 없습니다.\n나중에 다시 보고 싶은 링크를 북마크에 추가해보세요.'}
        />
      ) : null}
      <Content>
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
  position: relative;
  ${media.wide} {
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
`
