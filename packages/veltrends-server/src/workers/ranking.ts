import PQueue from 'p-queue'
import db from '../lib/db.js'
import { calculateRankingScore } from '../lib/ranking.js'
import cron from 'node-cron'

async function findRecalculateTargets() {
  const data = await db.itemStats.findMany({
    where: {
      // score: {
      //   lte: 0.001,
      // },
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
  // @todo: increase concurrency after migrating to postresql
  const queue = new PQueue({ concurrency: 1 })
  const targets = await findRecalculateTargets()
  const now = Date.now()
  console.log(`Recalculating ${targets.length} items`)
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

  await queue.onIdle()
  console.log(`Recalculated successfully.`)
}

recalculate()

if (process.env.NODE_ENV === 'development') {
  cron.schedule('*/5 * * * *', recalculate)
}
