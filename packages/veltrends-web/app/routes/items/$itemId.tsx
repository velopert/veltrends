import { json, type LoaderFunction } from '@remix-run/node'
import { useLoaderData, useNavigate } from '@remix-run/react'
import styled from 'styled-components'
import MoreVertButton from '~/components/base/MoreVertButton'
import CommentInputOverlay from '~/components/items/CommentInputOverlay'
import CommentList from '~/components/items/CommentList'
import ItemViewer from '~/components/items/ItemViewer'
import BasicLayout from '~/components/layouts/BasicLayout'
import { useDialog } from '~/contexts/DialogContext'
import { useUser } from '~/contexts/UserContext'
import { useCommentsQuery } from '~/hooks/query/useCommentsQuery'
import { deleteItem, getComments, getItem } from '~/lib/api/items'
import { type Comment, type Item as ItemType } from '~/lib/api/types'
import { media } from '~/lib/media'
import { useBottomSheetModalStore } from '~/stores/useBottomSheetModalStore'

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
  const loaderData = useLoaderData<ItemLoaderData>()
  const navigate = useNavigate()

  const { open: openBottomSheetModal } = useBottomSheetModalStore()
  const { open: openDialog } = useDialog()

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
        <ItemViewer item={loaderData.item} />
        {/* `comments` is always valid due to SSR */}
        <CommentList comments={comments!} />
        <CommentInputOverlay />
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
`

// @todo: handle 404

export default Item
