import { format } from 'date-fns'

export function getWeekRangeFromDate(d: Date) {
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  const start = format(new Date(d.setDate(diff)), 'yyyy-MM-dd')
  const end = format(new Date(d.setDate(diff + 6)), 'yyyy-MM-dd')
  return [start, end]
}
