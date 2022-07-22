import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { validate } from '~/lib/validate'

interface FormInputConfig {
  name?: string
  validate?(text: string): boolean
  initialValue?: string
  errorMessage?: string
  onChange?(e: React.ChangeEvent<HTMLInputElement>): void
  onBlur?(e: React.FocusEvent<HTMLInputElement>): void
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
  ref?: (ref: HTMLInputElement) => void
}

type InputPropsRecord<T extends string> = Record<T, InputProps>
type CustomSubmitFn<T extends string> = (
  values: Record<T, string>,
  e: React.FormEvent<HTMLFormElement>,
) => void
type HandleSubmitFn<T extends string> = (
  onSubmit: CustomSubmitFn<T>,
) => (e: React.FormEvent<HTMLFormElement>) => void

const DEFAULT_VALIDATE_MESSAGE = 'Validation Error'

/**
 * 1. validate
 *   when -> blur change submit
 * 2. error msg
 *   for each input
 *   for form
 */
export function useForm<T extends string>({
  form,
  initialValues,
  mode = 'submit',
  shouldPreventDefault,
}: UseFormParams<T>) {
  const [errors, setErrors] = useState<Partial<Record<T, string | null>>>({})
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
    const keys = Object.keys(form) as T[]
    keys.forEach((key) => {
      const inputConfig = form[key]
      const validate = inputConfig.validate
      const handleValidation = (text: string) => {
        if (!validate) return
        const isValid = validate(text)
        if (isValid) {
          setError(key, null)
        } else {
          const errorMessage = inputConfig.errorMessage ?? DEFAULT_VALIDATE_MESSAGE
          setError(key, errorMessage)
        }
      }
      partialInputProps[key] = {
        onChange: (e) => {
          inputConfig.onChange?.(e)
          const modes: ValidateMode[] = ['change', 'all']
          if (!modes.includes(mode)) return
          handleValidation(e.target.value)
        },
        onBlur: (e) => {
          inputConfig.onBlur?.(e)
          const modes: ValidateMode[] = ['blur', 'all']
          if (!modes.includes(mode)) return
          handleValidation(e.target.value)
        },
        name: key,
        ref: (ref: HTMLInputElement) => {
          inputRefs.current[key] = ref
        },
      }
    })
    return partialInputProps
  }, [mode, setError, form])

  const handleSubmit: HandleSubmitFn<T> = useCallback(
    (onSubmit) => {
      return (e) => {
        const formData = new FormData(e.currentTarget)
        const formDataJSON = Object.fromEntries(formData) as Record<T, string>
        const entries = Object.entries<string>(formDataJSON) as [T, string][]

        const isValid = entries.reduce((acc, [key, value]) => {
          const { validate, errorMessage } = form[key]
          if (validate?.(value) === false) {
            setError(key, errorMessage ?? DEFAULT_VALIDATE_MESSAGE)
            return false
          }
          return acc
        }, true)

        if (!isValid) {
          e.preventDefault()
          return
        }

        if (shouldPreventDefault ?? true) {
          e.preventDefault()
        }

        onSubmit(formDataJSON, e)
      }
    },
    [shouldPreventDefault, setError, form],
  )

  useEffect(() => {
    const keys = Object.keys(form) as T[]
    keys.forEach((key) => {
      const initialValue = initialValues?.[key] ?? form[key].initialValue
      const el = inputRefs.current[key]
      if (initialValue !== undefined && el) {
        el.value = initialValue
      }
    })
  }, [form, initialValues])

  return {
    inputProps,
    errors,
    handleSubmit,
    setError,
  }
}

/**
 *
 * { inputProps: { username }
 */

// <input {...inputProps.username} />
