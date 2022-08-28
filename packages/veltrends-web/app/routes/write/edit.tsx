import { json, LoaderFunction } from '@remix-run/node'
import { useLoaderData, useNavigate } from '@remix-run/react'
import { FormEvent, useState } from 'react'
import styled from 'styled-components'
import BasicLayout from '~/components/layouts/BasicLayout'
import LabelInput from '~/components/system/LabelInput'
import LabelTextArea from '~/components/system/LabelTextArea'
import WriteFormTemplate from '~/components/write/WriteFormTemplate'
import { getItem, updateItem } from '~/lib/api/items'
import { type Item } from '~/lib/api/types'
import { parseUrlParams } from '~/lib/parseUrlParams'

export const loader: LoaderFunction = async ({ request }) => {
  // @todo: validate itemId
  const query = parseUrlParams<{ itemId: string }>(request.url)
  const itemId = parseInt(query.itemId, 10)

  const item = await getItem(itemId)

  return json(item)
}

function Edit() {
  const item = useLoaderData<Item>()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: item.title,
    body: item.body,
  })

  const onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (e) => {
    const key = e.target.name as 'title' | 'body'
    const { value } = e.target
    setForm({ ...form, [key]: value })
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    /**
     * @todo: handle loading and error
     */
    await updateItem({
      itemId: item.id,
      ...form,
    })
    navigate(`/items/${item.id}`)
  }

  const errorMessage = null

  return (
    <BasicLayout title="수정" hasBackButton>
      <WriteFormTemplate buttonText="수정하기" onSubmit={onSubmit}>
        <Group>
          <LabelInput label="제목" name="title" onChange={onChange} value={form.title} />
          <StyledLabelTextArea label="내용" name="body" onChange={onChange} value={form.body} />
          {errorMessage ? <Message>{errorMessage}</Message> : null}
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

const Message = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: red;
  text-align: center;
`

export default Edit
