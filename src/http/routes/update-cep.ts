import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { updateCep } from '../../functions/update-cep'

export const updateCepRoute: FastifyPluginAsyncZod = async (app, _opts) => {
  app.put('/update-cep', {
    schema: {
      body: z.object({
        idEndereco: z.string(),
        codigoCep: z.string().min(8)
      }),
      response: {
        200: z.object({
          mensagem: z.string(),
          cidade: z.string()
        })
      }
    }
  }, async (request, reply) => {
    const result = await updateCep(request.body)
    return reply.send(result)
  })
}
