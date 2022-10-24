import { json, MetaFunction, type LoaderFunction } from '@remix-run/node'
import { useLoaderData, useNavigate } from '@remix-run/react'
import styled from '@emotion/styled'
import MoreVertButton from '~/components/base/MoreVertButton'
import CommentList from '~/components/items/CommentList'
import ItemViewer from '~/components/items/ItemViewer'
import BasicLayout from '~/components/layouts/BasicLayout'
import { useUser } from '~/states/user'
import { useCommentsQuery } from '~/hooks/query/useCommentsQuery'
import { deleteItem, getComments, getItem } from '~/lib/api/items'
import { type Comment, type Item as ItemType } from '~/lib/api/types'
import { media } from '~/lib/media'
import { useBottomSheetModalActions } from '~/states/bottomSheetModal'
import { useOpenDialog } from '~/states/dialog'
import { waitIfNeeded, withCookie } from '~/lib/client'
import removeMd from 'remove-markdown'

export const loader: LoaderFunction = async ({ request, context, params }) => {
  await waitIfNeeded(request)

  const itemId = parseInt(params.itemId!, 10)
  const [item, comments] = await withCookie(
    () => Promise.all([getItem(itemId), getComments(itemId)]),
    request,
  )

  return json(
    {
      item,
      comments,
    },
    {
      headers: {
        'Cache-Control': 'private, max-age=5',
      },
    },
  )
}

export const meta: MetaFunction = ({ data }: { data: ItemLoaderData }) => {
  const { item } = data

  const plainText = removeMd(item.body)

  const shortDescription = plainText
    .slice(0, 300)
    .concat(plainText.length > 300 ? '...' : '')

  const twitterCardInfo = {
    'twitter:card': item.thumbnail ? 'summary_large_image' : 'summary',
    'twitter:site': '@veltrends',
    'twitter:title': item.title,
    'twitter:description': shortDescription,
    'twitter:image': item.thumbnail,
  }

  return {
    title: item.title,
    description: shortDescription,
    'og:title': item.title,
    'og:description': shortDescription,
    'og:image': item.thumbnail ?? undefined,
    'article:author': item.author ?? item.user.username,
    ...twitterCardInfo,
  }
}

interface ItemLoaderData {
  item: ItemType
  comments: Comment[]
}

function Item() {
  const loaderData = useLoaderData<ItemLoaderData>()
  const navigate = useNavigate()

  const { open: openBottomSheetModal } = useBottomSheetModalActions()
  const openDialog = useOpenDialog()

  const user = useUser()
  const isMyItem = user?.id === loaderData.item.user.id

  const { data: comments } = useCommentsQuery(loaderData.item.id, {
    initialData: loaderData.comments,
  })

  const onClickMore = () => {
    openBottomSheetModal([
      {
        name: '수정',
        onClick() {
          navigate(`/write/edit?itemId=${loaderData.item.id}`)
        },
      },
      {
        name: '삭제',
        onClick() {
          openDialog({
            title: '삭제',
            description: '정말로 삭제하시겠습니까?',
            mode: 'YESNO',
            cancelText: '취소',
            confirmText: '삭제',
            async onConfirm() {
              /** @todo: show fullscreen spinner on loading */
              await deleteItem(loaderData.item.id)
              navigate('/')
            },
          })
        },
      },
    ])
  }

  return (
    <BasicLayout
      hasBackButton
      title={null}
      headerRight={isMyItem && <MoreVertButton onClick={onClickMore} />}
    >
      <Content>
        <ItemViewer item={loaderData.item} isMyItem={isMyItem} />
        {/* `comments` is always valid due to SSR */}
        <CommentList comments={comments!} />
      </Content>
    </BasicLayout>
  )
}

const Content = styled.div`
  ${media.tablet} {
    padding-left: 1rem;
    padding-right: 1rem;
    width: 768px;
    margin: 0 auto;
    margin-top: 64px;
  }
  padding-bottom: 64px;
`

// @todo: handle 404

export default Item
