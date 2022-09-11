import { format } from 'date-fns'
import { useMemo } from 'react'
import styled from 'styled-components'
import { colors } from '~/lib/colors'

interface Props {
  dateRange: string[]
}

function WeekSelector({ dateRange }: Props) {
  const [startDate, endDate] = useMemo(() => {
    const [startDate, endDate] = dateRange
    const start = format(new Date(startDate), 'yyyy년 MM월 dd일')
    const end = format(new Date(endDate), 'yyyy년 MM월 dd일')
    return [start, end]
  }, [dateRange])

  return (
    <Block>
      <DateInfo>
        {startDate} ~ {endDate}
      </DateInfo>
      <WeekNavigator>
        <TextButton>저번 주</TextButton>
        <TextButton disabled>다음 주</TextButton>
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
