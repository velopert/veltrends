import { useTransition } from '@remix-run/react'

export function useSubmitLoading() {
  const transition = useTransition()
  return ['submitting', 'loading'].includes(transition.state)
}
