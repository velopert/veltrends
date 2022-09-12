import { format } from 'date-fns'

export function getWeekRangeFromDate(d: Date) {
  const day = d.getDay()
  const startDate = d.getDate() - day

  const start = format(new Date(d.setDate(startDate)), 'yyyy-MM-dd')
  const end = format(new Date(new Date(start).setDate(startDate + 6)), 'yyyy-MM-dd')
  return [start, end]
}

export function addWeekToRange(range: string[], weeks: number) {
  const [startDate] = range
  const d = new Date(startDate)
  const nextStartDate = new Date(d.setDate(d.getDate() + weeks * 7))
  const nextEndDate = new Date(new Date(nextStartDate).setDate(nextStartDate.getDate() + 6))
  const start = format(nextStartDate, 'yyyy-MM-dd')
  const end = format(nextEndDate, 'yyyy-MM-dd')
  return [start, end]
}
