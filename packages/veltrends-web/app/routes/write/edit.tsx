import { json, type LoaderFunction } from '@remix-run/node'
import { useLoaderData, useNavigate } from '@remix-run/react'
import { type FormEvent, useCallback, useState } from 'react'
import styled from 'styled-components'
import BasicLayout from '~/components/layouts/BasicLayout'
import LabelGroup from '~/components/system/LabelGroup'
import LabelInput from '~/components/system/LabelInput'
import Editor from '~/components/write/Editor'
import WriteFormTemplate from '~/components/write/WriteFormTemplate'
import { getItem, updateItem } from '~/lib/api/items'
import { type Item } from '~/lib/api/types'
import { media } from '~/lib/media'
import { parseUrlParams } from '~/lib/parseUrlParams'

export const loader: LoaderFunction = async ({ request, context }) => {
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

  const onChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => {
    const key = e.target.name as 'title' | 'body'
    const { value } = e.target
    setForm({ ...form, [key]: value })
  }

  const onChangeBody = useCallback((text: string) => {
    setForm((form) => ({ ...form, body: text }))
  }, [])

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
          <LabelInput
            label="제목"
            name="title"
            onChange={onChange}
            value={form.title}
          />
          <LabelEditorGroup label="내용">
            {({ onFocus, onBlur }) => (
              <StyledEditor
                onFocus={onFocus}
                onBlur={onBlur}
                onChangeText={onChangeBody}
                defaultValue={form.body}
              />
            )}
          </LabelEditorGroup>
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

const Message = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: red;
  text-align: center;
`

const LabelEditorGroup = styled(LabelGroup)`
  flex: 1;
  ${media.tablet} {
    flex: initial;
  }
`

const StyledEditor = styled(Editor)`
  flex: 1;
  display: flex;
  flex-direction: column;

  ${media.desktop} {
    flex: initial;
  }
`

export default Edit
