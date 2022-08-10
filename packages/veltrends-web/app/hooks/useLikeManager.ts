import { useCallback } from 'react'
import { useItemStats } from '~/contexts/ItemStatsContext'
import { likeItem } from '~/lib/api/items'
import { type ItemStats } from '~/lib/api/types'

export function useLikeManager() {
  const { actions } = useItemStats()
  const like = useCallback(
    async (id: number, initialStats: ItemStats) => {
      try {
        actions.set(id, { ...initialStats, likes: initialStats.likes + 1 })
        const result = await likeItem(id)
        actions.set(id, result.itemStats)
      } catch (e) {
        console.error(e)
      }
    },
    [actions],
  )
  const unlike = useCallback(
    async (id: number, initialStats: ItemStats) => {
      try {
        actions.set(id, { ...initialStats, likes: initialStats.likes - 1 })
        const result = await likeItem(id)
        actions.set(id, result.itemStats)
      } catch (e) {
        console.error(e)
      }
    },
    [actions],
  )

  return { like, unlike }
}
