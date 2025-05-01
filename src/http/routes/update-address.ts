import { z } from "zod"
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { updateAddress } from "../../functions/update-address"

export const updateAddressRoute: FastifyPluginAsyncZod = async (app, _opts) => {
  app.patch("/update-address/:id", {
    schema: {
      body: z.object({
        cep: z.string().optional(),
        bairro: z.string().optional(),
        logradouro: z.string().optional(),
        numeroEndereco: z.number().optional(),
        complemento: z.string().nullable().optional(),
      }),
      params: z.object({
        id: z.string(),
      })
    }
  }, async (request) => {
    const { id } = request.params
    const updateData = request.body

    const result = await updateAddress({ id, ...updateData })

    return result
  })
}