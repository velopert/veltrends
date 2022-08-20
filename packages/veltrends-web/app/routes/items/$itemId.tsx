import { json, LoaderFunction } from '@remix-run/node'
import { useLoaderData, useParams } from '@remix-run/react'
import ItemViewer from '~/components/items/ItemViewer'
import BasicLayout from '~/components/layouts/BasicLayout'
import { getItem } from '~/lib/api/items'
import { Item as ItemType } from '~/lib/api/types'

export const loader: LoaderFunction = async ({ request, params }) => {
  // @todo: validate itemId
  const itemId = parseInt(params.itemId!, 10)
  const item = await getItem(itemId)
  return json({
    item,
  })
}

interface ItemLoaderData {
  item: ItemType
}

function Item() {
  const { item } = useLoaderData<ItemLoaderData>()
  return (
    <BasicLayout hasBackButton title={null}>
      <ItemViewer item={item} />
    </BasicLayout>
  )
}

// @todo: handle 404

export default Item
