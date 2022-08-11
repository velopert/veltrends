import { useCallback } from 'react'
import { useItemOverride } from '~/contexts/ItemStatsContext'
import { likeItem } from '~/lib/api/items'
import { type ItemStats } from '~/lib/api/types'

export function useLikeManager() {
  const { actions } = useItemOverride()
  const like = useCallback(
    async (id: number, initialStats: ItemStats) => {
      try {
        actions.set(id, {
          itemStats: { ...initialStats, likes: initialStats.likes + 1 },
          isLiked: true,
        })
        const result = await likeItem(id)
        actions.set(id, {
          itemStats: result.itemStats,
          isLiked: true,
        })
      } catch (e) {
        console.error(e)
      }
    },
    [actions],
  )
  const unlike = useCallback(
    async (id: number, initialStats: ItemStats) => {
      try {
        actions.set(id, {
          itemStats: { ...initialStats, likes: initialStats.likes - 1 },
          isLiked: false,
        })
        const result = await likeItem(id)
        actions.set(id, {
          itemStats: result.itemStats,
          isLiked: false,
        })
      } catch (e) {
        console.error(e)
      }
    },
    [actions],
  )

  return { like, unlike }
}
