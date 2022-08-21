import { json, LoaderFunction } from '@remix-run/node'
import { useLoaderData, useParams } from '@remix-run/react'
import CommentList from '~/components/items/CommentList'
import ItemViewer from '~/components/items/ItemViewer'
import BasicLayout from '~/components/layouts/BasicLayout'
import { getComments, getItem } from '~/lib/api/items'
import { type Comment, type Item as ItemType } from '~/lib/api/types'

export const loader: LoaderFunction = async ({ request, params }) => {
  // @todo: validate itemId
  const itemId = parseInt(params.itemId!, 10)
  const [item, comments] = await Promise.all([getItem(itemId), getComments(itemId)])

  return json({
    item,
    comments,
  })
}

interface ItemLoaderData {
  item: ItemType
  comments: Comment[]
}

function Item() {
  const { item, comments } = useLoaderData<ItemLoaderData>()

  return (
    <BasicLayout hasBackButton title={null}>
      <ItemViewer item={item} />
      <CommentList comments={comments} />
    </BasicLayout>
  )
}

// @todo: handle 404

export default Item
