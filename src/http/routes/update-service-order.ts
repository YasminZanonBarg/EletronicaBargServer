import { z } from "zod"
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { updateServiceOrder } from "../../functions/update-service-order"

export const updateServiceOrderRoute: FastifyPluginAsyncZod = async (app, _opts) => {
  app.patch("/update-service-order/:id", {
    schema: {
      body: z.object({
        idCliente: z.string().optional(),
        situacao: z.string().optional(),
        aparelho: z.string().optional(),
        marca: z.string().optional(),
        modelo: z.string().optional(),
        serie: z.string().optional(),
        defeito: z.string().optional(),
        acessorios: z.string().optional(),
        localizacaoAparelho: z.string().optional(),
        preOrcamento: z.string().nullable().optional(),
        valorMaoDeObra: z.string().nullable().optional(),
        valorPecas: z.string().nullable().optional(),
        valorTotal: z.string().nullable().optional(),
        motivos: z.string().nullable().optional(),
        notas: z.string().nullable().optional(),
        flagUrgencia: z.boolean().optional()
      }),
      params: z.object({
        id: z.string(),
      }),
    }
  }, async (request) => {
    const { id } = request.params
    const updateData = request.body

    const result = await updateServiceOrder({ id, ...updateData })

    return result
  })
}
