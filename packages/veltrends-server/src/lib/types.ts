import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import {
  FastifyInstance,
  FastifyLoggerInstance,
  FastifyPluginOptions,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify'

type FastifyTypebox = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  FastifyLoggerInstance,
  TypeBoxTypeProvider
>

export type FastifyPluginAsyncTypebox<
  Options extends FastifyPluginOptions = Record<never, never>,
> = (fastify: FastifyTypebox, opts: Options) => Promise<void>
