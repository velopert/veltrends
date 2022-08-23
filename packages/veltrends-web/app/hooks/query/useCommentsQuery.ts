import { useQuery } from '@tanstack/react-query'
import { getComments } from '~/lib/api/items'
import { type UseQueryOptionsOf } from '~/lib/type'

export function useCommentsQuery(
  itemId: number,
  options: UseQueryOptionsOf<typeof getComments> = {},
) {
  return useQuery(extractKey(itemId), () => getComments(itemId), options)
}

const extractKey = (itemId: number) => ['comments', itemId]

useCommentsQuery.extractKey = extractKey
