import { json, type LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import TabLayout from '~/components/layouts/TabLayout'
import { getItems } from '~/lib/api/items'
import { GetItemsResult } from '~/lib/api/types'

export const loader: LoaderFunction = async ({ request }) => {
  const list = await getItems()
  return json(list)
}

export default function Index() {
  const data = useLoaderData<GetItemsResult>()
  console.log(data)
  return <TabLayout />
}
