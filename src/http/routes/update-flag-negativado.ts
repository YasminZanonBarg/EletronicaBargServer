import { z } from "zod"
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { updateFlagNegativado } from "../../functions/update-flag-negativado"

export const updateFlagNegativadoRoute: FastifyPluginAsyncZod = async (app, _opts) => {
  app.patch("/update-flag-negativado/:id", {
    schema: {
      params: z.object({
        id: z.string(),
      }),
      response: {
        200: z.object({
          id: z.string(),
          statusNegativado: z.boolean(),
        }),
      },
    },
  }, async (request) => {
    const { id } = request.params

    const result = await updateFlagNegativado(id)

    return result
  })
}