import { useCallback, useRef } from 'react'
import { useItemOverride } from '~/contexts/ItemOverrideContext'
import { likeItem, unlikeItem } from '~/lib/api/items'
import { type ItemStats } from '~/lib/api/types'

export function useLikeManager() {
  const { actions } = useItemOverride()
  const abortControllers = useRef(new Map<number, AbortController>()).current
  const getAbortController = useCallback(
    (id: number) => {
      const controller = abortControllers.get(id)
      if (controller) {
        return controller
      }
      const newController = new AbortController()
      abortControllers.set(id, newController)
      return newController
    },
    [abortControllers],
  )

  const like = useCallback(
    async (id: number, initialStats: ItemStats) => {
      const controller = getAbortController(id)

      try {
        controller.abort()
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
        /* @todo: handle eror */
        console.error(e)
      }
    },
    [actions, getAbortController],
  )
  const unlike = useCallback(
    async (id: number, initialStats: ItemStats) => {
      const controller = getAbortController(id)
      try {
        controller.abort()
        actions.set(id, {
          itemStats: { ...initialStats, likes: initialStats.likes - 1 },
          isLiked: false,
        })
        const result = await unlikeItem(id)
        actions.set(id, {
          itemStats: result.itemStats,
          isLiked: false,
        })
      } catch (e) {
        /* @todo: handle eror */
        console.error(e)
      }
    },
    [actions, getAbortController],
  )

  return { like, unlike }
}
