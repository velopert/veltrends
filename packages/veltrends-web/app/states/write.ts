import { sangte, useSangteActions, useSangteValue } from 'sangte'
import { NextAppError } from '~/lib/nextError'

interface WriteState {
  form: {
    link: string
    title: string
    body: string
  }
  error?: NextAppError
}

const initialState: WriteState = {
  form: {
    link: '',
    title: '',
    body: '',
  },
  error: undefined,
}

export const writeState = sangte(initialState, (prev) => ({
  change(key: keyof WriteState['form'], value: string) {
    prev.form[key] = value
  },
  setError(error: NextAppError) {
    prev.error = error
  },
}))

export function useWriteActions() {
  return useSangteActions(writeState)
}

export function useWriteValue() {
  return useSangteValue(writeState)
}
