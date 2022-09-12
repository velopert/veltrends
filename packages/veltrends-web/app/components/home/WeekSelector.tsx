import { useSearchParams } from '@remix-run/react'
import { format } from 'date-fns'
import { useMemo } from 'react'
import styled from 'styled-components'
import { colors } from '~/lib/colors'
import { addWeekToRange } from '~/lib/week'

interface Props {
  dateRange: string[]
}

const SERVICE_START_DATE = new Date('2022-09-01')

function WeekSelector({ dateRange }: Props) {
  const [startDate, endDate] = useMemo(() => {
    const [startDate, endDate] = dateRange
    const start = format(new Date(startDate), 'yyyy년 MM월 dd일')
    const end = format(new Date(endDate), 'yyyy년 MM월 dd일')
    return [start, end]
  }, [dateRange])
  const [, setSearchParams] = useSearchParams()

  const onClickPrev = () => {
    const [start, end] = addWeekToRange(dateRange, -1)
    setSearchParams({ mode: 'past', start, end })
  }
  const onClickNext = () => {
    const [start, end] = addWeekToRange(dateRange, +1)
    setSearchParams({ mode: 'past', start, end })
  }

  const [prevDisabled, nextDisabled] = useMemo(() => {
    const today = new Date(format(new Date(), 'yyyy-MM-dd'))
    const [start, end] = dateRange.map((date) => new Date(date))
    return [start <= SERVICE_START_DATE, end >= today]
  }, [dateRange])

  return (
    <Block>
      <DateInfo>
        {startDate} ~ {endDate}
      </DateInfo>
      <WeekNavigator>
        <TextButton onClick={onClickPrev} disabled={prevDisabled}>
          저번 주
        </TextButton>
        <TextButton onClick={onClickNext} disabled={nextDisabled}>
          다음 주
        </TextButton>
      </WeekNavigator>
    </Block>
  )
}

const DateInfo = styled.div``
const WeekNavigator = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 8px;
`

const TextButton = styled.button`
  display: inline-flex;
  background: none;
  outline: none;
  border: none;
  font-size: inherit;
  padding: 0;
  text-decoration: underline;
  &:disabled {
    color: ${colors.gray2};
    text-decoration: none;
  }
`

const Block = styled.div`
  font-size: 16px;
  margin-bottom: 16px;
  color: ${colors.gray5};
`

export default WeekSelector
