import { z } from "zod"
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { updateFlagUrgencia } from "../../functions/update-flag-urgencia"

export const updateFlagUrgenciaRoute: FastifyPluginAsyncZod = async (app, _opts) => {
  app.patch("/update-flag-urgencia/:id", {
    schema: {
      params: z.object({
        id: z.string(),
      }),
      response: {
        200: z.object({
          id: z.string(),
          novaUrgencia: z.boolean(),
        }),
      },
    },
  }, async (request) => {
    const { id } = request.params

    const result = await updateFlagUrgencia(id)

    return result
  })
}