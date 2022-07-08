import Fastify from 'fastify'
import routes from './routes/index.js'
import fastifySwagger from '@fastify/swagger'
import { swaggerConfig } from './config/swagger.js'
import db from './lib/db.js'
import AppError from './lib/AppError.js'

const server = Fastify({
  logger: true,
})

await server.register(fastifySwagger, swaggerConfig)

server.setErrorHandler(async (error, request, reply) => {
  reply.statusCode = error.statusCode ?? 500
  if (error instanceof AppError) {
    return {
      name: error.name,
      message: error.message,
      statusCode: error.statusCode,
    }
  }
  console.log({ name: error.name })
  return error
})

server.register(routes)

server.listen({ port: 4000 })
