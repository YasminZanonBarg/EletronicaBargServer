import { z } from "zod"
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { updateClient } from "../../functions/update-client"

export const updateClientRoute: FastifyPluginAsyncZod = async (app, _opts) => {
  app.patch("/update-client/:id", {
    schema: {
      body: z.object({
        idEndereco: z.string().optional(),
        tipoPessoa: z.string().optional(),
        sexo: z.string().optional(),
        dataNascimento: z.coerce.date().optional(),
        nomeCompleto: z.string().optional(),
        cpf: z.string().optional(),
        rg: z.string().optional(),
        filiacao: z.string().optional(),
        observacao: z.string().nullable().optional(),
        celular1: z.string().optional(),
        celular2: z.string().nullable().optional(),
        telefone1: z.string().nullable().optional(),
        telefone2: z.string().nullable().optional(),
      }),
      params: z.object({
        id: z.string(),
      })
    }
  }, async (request) => {
    const { id } = request.params;
    const updateData = request.body;

    const result = await updateClient({ id, ...updateData })

    return result
  })
}