import { ThrownResponse, useCatch } from '@remix-run/react'
import { FetchError } from './client'

export function isNextError(e: any): e is NextAppError {
  return e?.statusCode !== undefined && e?.message !== undefined && e?.name !== undefined
}

export interface NextAppError {
  name:
    | 'Unauthorized'
    | 'Forbidden'
    | 'UserExists'
    | 'WrongCredentials'
    | 'Unknown'
    | 'BadRequest'
    | 'RefreshFailure'
    | 'NotFound'
    | 'InvalidURL'
    | 'AlreadyExists'
  statusCode: number
  message: string
  payload?: any
  e?: any
}

export function extractNextError(e: any): NextAppError {
  if (e instanceof FetchError) {
    const data = e.data
    if (isNextError(data)) {
      return data
    }
  }
  return {
    statusCode: 500,
    message: e?.message ?? 'Unknown error',
    name: e?.name ?? 'Unknown',
  }
}

export function useNextAppErrorCatch() {
  const caught = useCatch<ThrownResponse<number, NextAppError>>()
  return caught
}
