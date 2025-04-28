import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getClientByCpf } from '../../functions/get-client-by-cpf'

export const getClientByCpfRoute: FastifyPluginAsyncZod = async (app, _opts) => {
  app.get('/get-client-by-cpf', {
    schema: {
      querystring: z.object({
        cpf: z.string().min(11).max(14),
      }),
    }
  }, async (request, reply) => {
    const { cpf } = request.query

    const { client } = await getClientByCpf(cpf)

    if (!client) {
      return reply.status(404).send({ message: 'Client not found' })
    }

    return { client }
  })
}