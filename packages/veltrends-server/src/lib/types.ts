import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import {
  FastifyInstance,
  FastifyLoggerInstance,
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

export type FastifyPluginAsyncTypebox = (
  fastify: FastifyTypebox,
) => Promise<void>
