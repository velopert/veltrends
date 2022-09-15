import { useLocation, useNavigate } from '@remix-run/react'
import { useCallback } from 'react'
import { useDialog } from '~/contexts/DialogContext'

const descriptionMap = {
  like: '이 글이 마음에 드시나요? 이 글을 다른 사람들에게도 추천하기 위해서 로그인을 해주세요.',
  comment: '당신의 의견을 적고 싶으신가요? 로그인을 하고 의견을 적어주세요.',
  commentLike: '이 댓글이 마음에 드세요? 로그인하고 좋아요를 눌러주세요.',
  bookmark: '나중에 이 글을 또 보시고 싶으신가요? 로그인하고 북마크를 추가해보세요.',
}

export function useOpenLoginDialog() {
  const location = useLocation()
  const navigate = useNavigate()
  const { open } = useDialog()

  const openLoginDialog = useCallback(
    (type: keyof typeof descriptionMap) => {
      const description = descriptionMap[type]
      open({
        description,
        title: '로그인 후 이용해주세요.',
        confirmText: '로그인',
        onConfirm: () => navigate(`/auth/login?next=${location.pathname}`),
        mode: 'YESNO',
      })
    },
    [location, navigate, open],
  )

  return openLoginDialog
}
