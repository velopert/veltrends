import { json, type LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import styled from 'styled-components'
import LinkCardList from '~/components/home/LinkCardList'
import TabLayout from '~/components/layouts/TabLayout'
import { getItems } from '~/lib/api/items'
import { type GetItemsResult } from '~/lib/api/types'

export const loader: LoaderFunction = async ({ request }) => {
  const list = await getItems()
  return json(list)
}

export default function Index() {
  const data = useLoaderData<GetItemsResult>()
  return (
    <StyledTabLayout>
      <LinkCardList items={data.list} />
    </StyledTabLayout>
  )
}

const StyledTabLayout = styled(TabLayout)`
  padding-top: 16px;
  padding-left: 16px;
  padding-right: 16px;
`
