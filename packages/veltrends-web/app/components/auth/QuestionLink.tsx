import { Link } from '@remix-run/react'
import styled from 'styled-components'
import { colors } from '~/lib/colors'

interface Props {
  question: string
  name: string
  to: string
  className?: string
}

function QuestionLink({ question, name, to, className }: Props) {
  return (
    <Block className={className}>
      {question} <Link to={to}>{name}</Link>
    </Block>
  )
}

const Block = styled.div`
  color: ${colors.gray3};
  a {
    font-weight: 600;
    color: ${colors.gray5};
  }
`

export default QuestionLink
