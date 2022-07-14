import styled from 'styled-components'
import Header from '~/components/Header'
import HeaderBackButton from '~/components/HeaderBackButton'
import { useGoBack } from '~/hooks/useGoBack'

export default function Register() {
  const goBack = useGoBack()
  return (
    <Page>
      <Header title="회원가입" headerLeft={<HeaderBackButton onClick={goBack} />} />
    </Page>
  )
}

const Page = styled.div``
