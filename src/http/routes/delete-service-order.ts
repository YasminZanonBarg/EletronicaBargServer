import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { deleteServiceOrder } from '../../functions/delete-service-order'

export const deleteServiceOrderRoute: FastifyPluginAsyncZod = async (app, _opts) => {
  app.delete('/delete-service-order', {
    schema: {
      body: z.object({
        id: z.string()
      })
    }
  }, async (request, reply) => {
    const { id } = request.body

    await deleteServiceOrder({ id })

    return reply.code(204).send()
  })
}
