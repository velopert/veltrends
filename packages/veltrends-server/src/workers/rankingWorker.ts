import PQueue from 'p-queue'
import db from '../lib/db.js'
import { calculateRankingScore } from '../lib/ranking.js'

async function findRecalculateTargets() {
  const data = await db.itemStats.findMany({
    where: {
      score: {
        lte: 0.001,
      },
    },
    select: {
      itemId: true,
      likes: true,
      item: {
        select: {
          createdAt: true,
        },
      },
    },
  })
  return data
}

async function recalculate() {
  const queue = new PQueue({ concurrency: 10 })
  const targets = await findRecalculateTargets()
  const now = Date.now()
  targets.forEach((itemStat) => {
    queue.add(async () => {
      const hourAge =
        (now - new Date(itemStat.item.createdAt).getTime()) / 1000 / 60 / 60
      const score = calculateRankingScore(itemStat.likes, hourAge)

      await db.itemStats.update({
        where: {
          itemId: itemStat.itemId,
        },
        data: {
          score,
        },
      })
    })
  })

  return queue.onIdle()
}

function main() {
  // register crons
}
