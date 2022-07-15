import styled from 'styled-components'
import AuthForm from '~/components/AuthForm'
import FullHeightPage from '~/components/FullHeightPage'
import Header from '~/components/Header'
import HeaderBackButton from '~/components/HeaderBackButton'
import { useGoBack } from '~/hooks/useGoBack'

export default function Login() {
  const goBack = useGoBack()
  return (
    <FullHeightPage>
      <Header title="로그인" headerLeft={<HeaderBackButton onClick={goBack} />} />
      <AuthForm mode="login" />
    </FullHeightPage>
  )
}
