import { sangte, useSangteActions, useSangteValue } from 'sangte'
import { AppError } from '~/lib/error'

interface WriteState {
  form: {
    link: string
    title: string
    body: string
  }
  error?: AppError
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
  setError(error: AppError) {
    prev.error = error
  },
}))

export function useWriteActions() {
  return useSangteActions(writeState)
}

export function useWriteValue() {
  return useSangteValue(writeState)
}
