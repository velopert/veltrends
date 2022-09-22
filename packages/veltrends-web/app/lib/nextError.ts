import axios from 'axios'

export function isNextError(e: any): e is NextAppError {
  return e?.statusCode !== undefined && e?.message !== undefined && e?.name !== undefined
}

interface NextAppError {
  name: 'Forbidden' | 'BadRequest' | 'Unknown'
  statusCode: number
  message: string
}

export function extractNextError(e: any): NextAppError {
  if (axios.isAxiosError(e)) {
    const data = e.response?.data
    if (isNextError(data)) {
      return data
    }
  }
  return {
    statusCode: 500,
    message: 'Unknown error',
    name: 'Unknown',
  }
}
