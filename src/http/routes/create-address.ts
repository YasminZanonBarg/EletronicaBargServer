import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createAddress } from '../../functions/create-address'

export const createAddressRoute: FastifyPluginAsyncZod = async (app, _opts) => {
  app.post('/create-address', {
    schema: {
      body: z.object({
        cep: z.string(),
        bairro: z.string(),
        logradouro: z.string(),
        numeroEndereco: z.number(),
        complemento: z.string().nullable().optional()
      }),
    }
  }, async (request, reply) => {
    const { cep, bairro, logradouro, numeroEndereco, complemento } = request.body

    const { idEndereco } = await createAddress({
      cep,
      bairro,
      logradouro,
      numeroEndereco,
      complemento
    })

    return reply.send({ idEndereco })
  })
}

