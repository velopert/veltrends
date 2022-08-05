import { ThrownResponse, useCatch } from '@remix-run/react'
import axios from 'axios'

type ErrorName =
  | 'UserExistsError'
  | 'AuthenticationError'
  | 'UnknownError'
  | 'UnauthorizedError'
  | 'BadRequestError'
  | 'RefreshTokenError'

interface ErrorPayloads {
  UserExistsError: undefined
  AuthenticationError: undefined
  UnknownError: undefined
  UnauthorizedError: {
    isExpiredToken: boolean
  }
  BadRequestError: undefined
  RefreshTokenError: undefined
}

export interface AppError {
  statusCode: number
  message: string
  name: ErrorName
  payload?: ErrorPayloads[ErrorName]
}

export function isAppError(error: any): error is AppError {
  return (
    error?.statusCode !== undefined && error?.message !== undefined && error?.name !== undefined
  )
}

export function extractError(error: any): AppError {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data
    if (isAppError(data)) {
      return data
    }
  }
  return {
    statusCode: 500,
    message: 'Unknown error',
    name: 'UnknownError',
  }
}

export function useAppErrorCatch() {
  const caught = useCatch<ThrownResponse<number, AppError>>()
  return caught
}
