import Fastify from 'fastify'
import routes from './routes/index.js'
import fastifySwagger from '@fastify/swagger'
import fastifyCookie from '@fastify/cookie'
import { swaggerConfig } from './config/swagger.js'
import AppError from './lib/AppError.js'
import 'dotenv/config'
import { authPlugin } from './plugins/authPlugin.js'
import cors from '@fastify/cors'

const server = Fastify({
  logger: true,
})

if (process.env.NODE_ENV === 'development') {
  server.register(cors, {
    origin: /localhost/,
    allowedHeaders: ['Cookie', 'Content-Type'],
    credentials: true,
  })
}

await server.register(fastifySwagger, swaggerConfig)
server.register(fastifyCookie)
server.setErrorHandler(async (error, request, reply) => {
  reply.statusCode = error.statusCode ?? 500
  if (error instanceof AppError) {
    return {
      name: error.name,
      message: error.message,
      statusCode: error.statusCode,
      payload: error.payload,
    }
  } else {
    if (error.statusCode === 400) {
      return {
        name: 'BadRequest',
        message: error.message,
        statusCode: 400,
      }
    }
  }
  return error
})

server.register(authPlugin)
server.register(routes)

server.listen({ port: 4000 })
