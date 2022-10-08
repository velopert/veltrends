import { TSchema, Type } from '@sinclair/typebox'

const errors = {
  UserExists: {
    statusCode: 409,
    message: 'User already exists',
  },
  WrongCredentials: {
    statusCode: 401,
    message: 'Invalid username or password',
  },
  Unknown: {
    statusCode: 500,
    message: 'Unknown error',
  },
  Unauthorized: {
    statusCode: 401,
    message: 'Unauthorized',
  },
  BadRequest: {
    statusCode: 400,
    message: 'Bad Request',
  },
  RefreshFailure: {
    statusCode: 401,
    message: 'Failed to refresh token',
  },
  NotFound: {
    statusCode: 404,
    message: 'Not Found',
  },
  Forbidden: {
    statusCode: 403,
    message: 'Forbidden',
  },
  InvalidURL: {
    statusCode: 422,
    message: 'Invalid URL',
  },
  AlreadyExists: {
    statusCode: 409,
    message: 'The data already exists',
  },
}

type ErrorName = keyof typeof errors

interface ErrorPayload {
  Unauthorized: {
    isExpiredToken: boolean
  }
  BadRequest: any
}

type ErrorPayloadWithDefault = Omit<
  Record<ErrorName, undefined>,
  keyof ErrorPayload
> &
  ErrorPayload

export default class AppError extends Error {
  public statusCode: number

  constructor(
    public name: ErrorName,
    public payload?: ErrorPayloadWithDefault[ErrorName],
  ) {
    const errorInfo = errors[name]
    super(payload?.message ?? errorInfo.message)
    if (payload?.message) {
      delete payload.message
    }
    this.statusCode = errorInfo.statusCode
  }
}

export function isAppError(error: any): error is AppError {
  return error instanceof AppError
}

export function createAppErrorSchema<T, P extends TSchema>(
  name: ErrorName,
  examplePayload?: ErrorPayloadWithDefault[ErrorName],
  payloadSchema?: P,
) {
  const example = { ...errors[name], payload: examplePayload }
  const schema = Type.Object({
    name: Type.String(),
    message: Type.String(),
    statusCode: Type.Number(),
    ...(payloadSchema ? { payload: payloadSchema } : {}),
  })
  schema.example = example
  return schema
}
