import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { deleteClient } from '../../functions/delete-client'

export const deleteClientRoute: FastifyPluginAsyncZod = async (app, _opts) => {
  app.delete('/delete-client', {
    schema: {
      body: z.object({
        id: z.string()
      })
    }
  }, async (request, reply) => {
    const { id } = request.body

    try {
      await deleteClient({ id })
      return reply.code(204).send()
    } catch (error) {
      return reply.code(400).send({ message: (error as Error).message || 'Erro desconhecido' })
    }
  })
}