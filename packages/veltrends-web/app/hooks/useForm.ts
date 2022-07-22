import { useCallback, useMemo, useRef, useState } from 'react'
import { validate } from '~/lib/validate'

interface FormInputConfig {
  name?: string
  validate?: (text: string) => boolean
  initialValue?: string
  errorMessage?: string
}

type ValidateMode = 'all' | 'change' | 'submit' | 'blur'

interface UseFormParams<T extends string> {
  mode?: ValidateMode
  form: Record<T, FormInputConfig>
  initialValues?: Record<T, string>
  shouldPreventDefault?: boolean
}

interface InputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  name: string
}

type InputPropsRecord<T extends string> = Record<T, InputProps>
type CustomSubmitFn<T extends string> = (
  values: Record<T, string>,
  e: React.FormEvent<HTMLFormElement>,
) => void
type HandleSubmitFn<T extends string> = (
  onSubmit: CustomSubmitFn<T>,
) => (e: React.FormEvent<HTMLFormElement>) => void

interface UseFormResult<T extends string> {
  inputProps: InputPropsRecord<T>
  handleSubmit: HandleSubmitFn<T>
  error: Record<T, string | undefined | null>
  formError: string | undefined | null
  setError: (name: T, error: string) => void
  setFormError: (error: string | null) => void
}

const DEFAULT_VALIDATE_MESSAGE = 'Validation Error'

/**
 * 1. validate
 *   when -> blur change submit
 * 2. error msg
 *   for each input
 *   for form
 */
export function useForm<T extends string>(params: UseFormParams<T>) {
  const mode = params.mode ?? 'submit'

  const initialErrors = useMemo(() => {
    const errors: Record<string, string | undefined | null> = {}
    Object.keys(params.form).forEach((name) => {
      errors[name] = undefined
    })
    return errors as Record<T, string | undefined | null>
  }, [params.form])
  const [errors, setErrors] = useState(initialErrors)
  const errorsRef = useRef(errors)
  const setError = useCallback((key: T, error: string | null | undefined) => {
    if (errorsRef.current[key] === error) return
    errorsRef.current[key] = error
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        [key]: error,
      }
    })
  }, [])
  const inputRefs = useRef<Partial<Record<T, HTMLInputElement>>>({})

  const inputProps = useMemo(() => {
    const partialInputProps: Partial<InputPropsRecord<T>> = {}
    const keys = Object.keys(params.form) as T[]
    keys.forEach((key) => {
      const validate = params.form[key].validate
      const handleValidation = (text: string) => {
        if (!validate) return
        const isValid = validate(text)
        if (isValid) {
          setError(key, null)
        } else {
          const errorMessage = params.form[key].errorMessage ?? DEFAULT_VALIDATE_MESSAGE
          setError(key, errorMessage)
        }
      }
      partialInputProps[key] = {
        onChange: (e) => {
          const modes: ValidateMode[] = ['change', 'all']
          if (!modes.includes(mode)) return
          handleValidation(e.target.value)
        },
        onBlur: (e) => {
          const modes: ValidateMode[] = ['blur', 'all']
          if (!modes.includes(mode)) return
          handleValidation(e.target.value)
        },
        name: key,
      }
    })
    return partialInputProps
  }, [params, mode, setError])

  const handleSubmit: HandleSubmitFn<T> = useCallback(
    (onSubmit) => {
      return (e) => {
        const formData = new FormData(e.currentTarget)
        const formDataJSON = Object.fromEntries(formData) as Record<T, string>
        const keys = Object.keys(params.form) as T[]
        let errorCounter = 0
        keys.forEach((key) => {
          if (params.form[key].validate?.(formDataJSON[key]) === false) {
            setError(key, params.form[key].errorMessage ?? DEFAULT_VALIDATE_MESSAGE)
            errorCounter += 1
          }
        })

        if (errorCounter > 0) {
          e.preventDefault()
          return
        }

        if (params.shouldPreventDefault ?? true) {
          e.preventDefault()
        }

        onSubmit(formDataJSON, e)
      }
    },
    [params, setError],
  )

  return {
    inputProps,
    errors,
    handleSubmit,
  }
}

/**
 *
 * { inputProps: { username }
 */

// <input {...inputProps.username} />
