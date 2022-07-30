import { Type, TSchema, Static } from '@sinclair/typebox'

export const Nullable = <T extends TSchema>(type: T) =>
  Type.Union([type, Type.Null()])
