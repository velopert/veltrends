import { useMutation } from '@tanstack/react-query'
import { createComment } from '~/lib/api/items'
import { type UseMutationOptionsOf } from '~/lib/type'

export function useCreateCommentMutation(options: UseMutationOptionsOf<typeof createComment>) {
  return useMutation(createComment)
}
