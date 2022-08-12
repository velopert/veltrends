import { useCallback, useRef } from 'react'
import { useItemOverride } from '~/contexts/ItemOverrideContext'
import { likeItem, unlikeItem } from '~/lib/api/items'
import { type ItemStats } from '~/lib/api/types'

export function useLikeManager() {
  const { actions } = useItemOverride()
  const abortControllers = useRef(new Map<number, AbortController>()).current

  const like = useCallback(
    async (id: number, initialStats: ItemStats) => {
      const prevController = abortControllers.get(id)

      try {
        prevController?.abort()
        actions.set(id, {
          itemStats: { ...initialStats, likes: initialStats.likes + 1 },
          isLiked: true,
        })
        const controller = new AbortController()
        abortControllers.set(id, controller)
        const result = await likeItem(id, controller)
        abortControllers.delete(id)
        actions.set(id, {
          itemStats: result.itemStats,
          isLiked: true,
        })
      } catch (e) {
        /* @todo: handle eror */
        console.error(e)
      }
    },
    [actions, abortControllers],
  )
  const unlike = useCallback(
    async (id: number, initialStats: ItemStats) => {
      const prevController = abortControllers.get(id)

      try {
        prevController?.abort()
        actions.set(id, {
          itemStats: { ...initialStats, likes: initialStats.likes - 1 },
          isLiked: false,
        })
        const controller = new AbortController()
        abortControllers.set(id, controller)
        const result = await unlikeItem(id, controller)
        abortControllers.delete(id)
        actions.set(id, {
          itemStats: result.itemStats,
          isLiked: false,
        })
      } catch (e) {
        /* @todo: handle eror */
        console.error(e)
      }
    },
    [actions, abortControllers],
  )

  return { like, unlike }
}
