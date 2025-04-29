import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createAndGetCep } from '../../functions/create-and-get-cep'

export const createAndGetCepRoute: FastifyPluginAsyncZod = async (app, _opts) => {
  app.post('/create-and-get-cep', {
    schema: {
      body: z.object({
        codigoCep: z.string().min(8)
      }),
      response: {
        200: z.object({
          cidade: z.string()
        })
      }
    }
  }, async (request, reply) => {
    const { codigoCep } = request.body

    const result = await createAndGetCep({ codigoCep })

    return reply.send(result)
  })
}