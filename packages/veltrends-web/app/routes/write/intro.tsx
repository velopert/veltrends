import { type ActionFunction, redirect, json } from '@remix-run/cloudflare'
import { useFetcher, useNavigate } from '@remix-run/react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import BasicLayout from '~/components/layouts/BasicLayout'
import LabelInput from '~/components/system/LabelInput'
import LabelTextArea from '~/components/system/LabelTextArea'
import WriteFormTemplate from '~/components/write/WriteFormTemplate'
import { useWriteContext } from '~/contexts/WriteContext'
import { createItem } from '~/lib/api/items'
import { applyAuth } from '~/lib/applyAuth'
import { extractNextError, useNextAppErrorCatch } from '~/lib/nextError'

export const action: ActionFunction = async ({ request }) => {
  const applied = await applyAuth(request)
  if (!applied) {
    throw new Error('Not logged in')
  }
  const form = await request.formData()
  const link = form.get('link') as string
  const title = form.get('title') as string
  const body = form.get('body') as string

  try {
    const item = await createItem({ link, title, body })
    return redirect(`/items/${item.id}`)
  } catch (e) {
    const error = extractNextError(e)
    throw json(error, {
      status: error.statusCode,
    })
  }
}

function Intro() {
  const {
    state: { form },
    actions,
  } = useWriteContext()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const fetcher = useFetcher()

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const key = e.target.name as 'title' | 'body'
    const { value } = e.target
    actions.change(key, value)
  }

  return (
    <BasicLayout title="뉴스 소개" hasBackButton>
      <WriteFormTemplate
        description="공유할 뉴스를 소개하세요."
        buttonText="등록하기"
        onSubmit={async (e) => {
          e.preventDefault()
          if (form.title === '' || form.body === '') {
            setErrorMessage('제목과 내용을 모두 입력해주세요.')
            return
          }
          fetcher.submit(form, {
            method: 'post',
          })
        }}
      >
        <Group>
          <LabelInput label="제목" name="title" onChange={onChange} value={form.title} />
          <StyledLabelTextArea label="내용" name="body" onChange={onChange} value={form.body} />
          {errorMessage ? <Message>{errorMessage}</Message> : null}
        </Group>
      </WriteFormTemplate>
    </BasicLayout>
  )
}

export function CatchBoundary() {
  const caught = useNextAppErrorCatch()
  const { actions } = useWriteContext()
  const navigate = useNavigate()
  useEffect(() => {
    if (caught.status === 422) {
      navigate(-1)
      actions.setError(caught.data)
    }
  }, [caught, navigate, actions])
  return <Intro />
}

const Group = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 16px;
  padding-bottom: 16px;
`

const StyledLabelTextArea = styled(LabelTextArea)`
  flex: 1;
  textarea {
    flex: 1;
    resize: none;
    font-family: inherit;
  }
`

const Message = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: red;
  text-align: center;
`

export default Intro
