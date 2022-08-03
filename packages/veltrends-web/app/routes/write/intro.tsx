import { ActionFunction, json, redirect } from '@remix-run/node'
import { useFetcher } from '@remix-run/react'
import React, { useState } from 'react'
import styled from 'styled-components'
import BasicLayout from '~/components/layouts/BasicLayout'
import LabelInput from '~/components/system/LabelInput'
import LabelTextArea from '~/components/system/LabelTextArea'
import WriteFormTemplate from '~/components/write/WriteFormTemplate'
import { useWriteContext } from '~/contexts/WriteContext'
import { createItem } from '~/lib/api/items'
import { applyAuth } from '~/lib/applyAuth'

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
    await createItem({ link, title, body })
  } catch (e) {
    // ...
  }

  return redirect('/')
}

function Intro() {
  const {
    state: { link },
  } = useWriteContext()
  const [form, setForm] = useState({
    title: '',
    body: '',
  })
  const fetcher = useFetcher()

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const key = e.target.name as 'title' | 'body'
    const { value } = e.target
    setForm({
      ...form,
      [key]: value,
    })
  }

  return (
    <BasicLayout title="뉴스 소개" hasBackButton>
      <WriteFormTemplate
        description="공유할 뉴스를 소개하세요."
        buttonText="등록하기"
        onSubmit={(e) => {
          e.preventDefault()
          fetcher.submit(
            {
              link,
              ...form,
            },
            {
              method: 'post',
            },
          )
          console.log('what')
        }}
      >
        <Group>
          <LabelInput label="제목" name="title" onChange={onChange} value={form.title} />
          <StyledLabelTextArea label="내용" name="body" onChange={onChange} value={form.body} />
        </Group>
      </WriteFormTemplate>
    </BasicLayout>
  )
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

export default Intro
