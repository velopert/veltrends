import { useCallback, useRef } from 'react'
import { useItemOverride } from '~/contexts/ItemOverrideContext'
import { likeItem, unlikeItem } from '~/lib/api/items'
import { type ItemStats } from '~/lib/api/types'

export function useLikeManager() {
  const { actions } = useItemOverride()
  const concurrentCounterRef = useRef<Map<number, number>>(new Map())

  const like = useCallback(
    async (id: number, initialStats: ItemStats) => {
      const counters = concurrentCounterRef.current

      try {
        actions.set(id, {
          itemStats: { ...initialStats, likes: initialStats.likes + 1 },
          isLiked: true,
        })
        const counter = (counters.get(id) ?? 0) + 1
        counters.set(id, counter)
        const result = await likeItem(id)
        if (counters.get(id) !== counter) return
        actions.set(id, {
          itemStats: result.itemStats,
          isLiked: true,
        })
      } catch (e) {
        /* @todo: handle eror */
        console.error(e)
      }
    },
    [actions],
  )
  const unlike = useCallback(
    async (id: number, initialStats: ItemStats) => {
      const counters = concurrentCounterRef.current
      try {
        actions.set(id, {
          itemStats: { ...initialStats, likes: initialStats.likes - 1 },
          isLiked: false,
        })
        const counter = (counters.get(id) ?? 0) + 1
        counters.set(id, counter)
        const result = await unlikeItem(id)
        if (counters.get(id) !== counter) return
        actions.set(id, {
          itemStats: result.itemStats,
          isLiked: false,
        })
      } catch (e) {
        /* @todo: handle eror */
        console.error(e)
      }
    },
    [actions],
  )

  return { like, unlike }
}
