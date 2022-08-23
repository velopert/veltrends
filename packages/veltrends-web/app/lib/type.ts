import { type UseMutationOptions, type UseQueryOptions } from '@tanstack/react-query'

export type UseQueryOptionsOf<T extends (...args: any) => any> = UseQueryOptions<
  Awaited<ReturnType<T>>,
  unknown,
  Awaited<ReturnType<T>>,
  any[]
>

// UseMutationOptions<Comment, unknown, { itemId: number; parentCommentId?: number | undefined; }, unknown>, "mutationFn">

export type UseMutationOptionsOf<T extends (...args: any) => any, E = any> = UseMutationOptions<
  Awaited<ReturnType<T>>,
  E,
  Parameters<T>[0]
>
