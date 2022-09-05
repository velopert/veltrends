const G = 1.4

export function calculateRankingScore(likes: number, hourAge: number) {
  return likes / Math.pow(hourAge + 2, G)
}
