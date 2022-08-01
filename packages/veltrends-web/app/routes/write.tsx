import { type LoaderFunction, redirect } from '@remix-run/node'
import { useState } from 'react'
import BasicLayout from '~/components/layouts/BasicLayout'
import WriteIntroForm from '~/components/write/WriteIntroForm'
import WriteLinkForm from '~/components/write/WriteLinkForm'
import { checkIsLoggedIn } from '~/lib/protectRoute'

export const loader: LoaderFunction = async ({ request }) => {
  const isLoggedIn = await checkIsLoggedIn(request)
  if (!isLoggedIn) return redirect('/login?next=/write')
  return null
}

type Step = 'link' | 'intro'

function Write() {
  const [step, setStep] = useState<Step>('link')

  const stepRenderers = {
    link: () => <WriteLinkForm onProceed={() => setStep('intro')} />,
    intro: () => <WriteIntroForm />,
  }

  return stepRenderers[step]()
}

export default Write
