import { Form, useActionData, useSubmit } from '@remix-run/react'
import { useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { useSubmitLoading } from '~/hooks/useSubmitLoading'
import { type AppError } from '~/lib/error'
import { validate } from '~/lib/validate'
import Button from './Button'
import LabelInput from './LabelInput'
import QuestionLink from './QuestionLink'

interface ActionData {
  text: 'hello world'
}

interface Props {
  mode: 'login' | 'register'
  error?: AppError
}

const authDescriptions = {
  login: {
    usernamePlaceholder: '아이디를 입력하세요.',
    passwordPlaceholder: '비밀번호를 입력하세요.',
    buttonText: '로그인',
    actionText: '회원가입',
    question: '계정이 없으신가요?',
    actionLink: '/register',
  },
  register: {
    usernamePlaceholder: '5~20자 사이의 영문 소문자 숫자 입력',
    passwordPlaceholder: '8자 이상, 영문/숫자/특수문자 중 2가지 이상 입력',
    buttonText: '회원가입',
    actionText: '로그인',
    question: '계정이 이미 있으신가요?',
    actionLink: '/login',
  },
} as const

interface AuthFormData {
  username: string
  password: string
}

function AuthForm({ mode, error }: Props) {
  const action = useActionData<ActionData | undefined>()
  const isLoading = useSubmitLoading()
  const { register, handleSubmit, formState } = useForm<AuthFormData>({
    mode: 'all',
  })

  console.log(formState.errors.username, formState.errors.password)

  const { usernamePlaceholder, passwordPlaceholder, buttonText, actionText, question, actionLink } =
    authDescriptions[mode]

  const usernameErrorMessage = useMemo(() => {
    if (formState.errors.username) {
      return '5~20자 사이의 영문 소문자 또는 숫자를 입력해주세요.'
    }
    if (error?.name === 'UserExistsError') {
      return '이미 존재하는 계정입니다.'
    }
    return undefined
  }, [error, formState])

  const submit = useSubmit()

  const onSubmit: SubmitHandler<AuthFormData> = (data, e) => {
    submit(e as any)
  }

  return (
    <StyledForm method="post" onSubmit={handleSubmit(onSubmit)}>
      <InputGroup>
        <LabelInput
          label="아이디"
          placeholder={usernamePlaceholder}
          disabled={isLoading}
          {...register('username', {
            validate: validate.username,
            required: true,
            minLength: 5,
            max: 20,
          })}
          errorMessage={usernameErrorMessage}
        />
        <LabelInput
          label="비밀번호"
          placeholder={passwordPlaceholder}
          disabled={isLoading}
          {...register('password', {
            min: 8,
            validate: validate.password,
          })}
          errorMessage={
            formState.errors.password
              ? '8자 이상, 영문/숫자/특수문자 중 2가지 이상 입력해주세요.'
              : undefined
          }
        />
      </InputGroup>
      <ActionsBox>
        {error?.name === 'AuthenticationError' ? (
          <ActionErrorMessage>잘못된 계정 정보입니다.</ActionErrorMessage>
        ) : null}
        <Button type="submit" layoutMode="fullWidth" disabled={isLoading}>
          {buttonText}
        </Button>
        <QuestionLink question={question} name={actionText} to={actionLink} />
      </ActionsBox>
    </StyledForm>
  )
}

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  padding: 16px;
  flex: 1;

  justify-content: space-between;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const ActionsBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`

const ActionErrorMessage = styled.div`
  text-align: center;
  color: red;
  font-size: 14px;
`

export default AuthForm
