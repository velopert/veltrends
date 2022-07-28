import { Static, Type } from '@sinclair/typebox'

export const UserSchema = Type.Object({
  id: Type.Integer(),
  username: Type.String(),
})

UserSchema.example = {
  id: 1,
  username: 'velopert',
}

export type UserSchemaType = Static<typeof UserSchema>
