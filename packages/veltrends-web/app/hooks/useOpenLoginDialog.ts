import { useLocation, useNavigate } from '@remix-run/react'
import { useCallback } from 'react'
import { useDialog } from '~/contexts/DialogContext'

const descriptionMap = {
  like: '이 글이 마음에 드시나요? 이 글을 다른 사람들에게도 추천하기 위해서 로그인을 해주세요.',
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
      })
    },
    [location, navigate, open],
  )

  return openLoginDialog
}
