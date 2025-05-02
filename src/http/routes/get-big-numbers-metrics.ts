import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getBigNumbersMetrics } from '../../functions/get-big-numbers-metrics' // Ajuste o caminho conforme necessário

export const getBigNumbersMetricsRoute: FastifyPluginAsyncZod = async (app, _opts) => {
  app.post('/get-big-numbers-metrics', {
    schema: {
      body: z.object({
        start_date: z.string().min(10).max(10), // Esperando data no formato 'YYYY-MM-DD'
        final_date: z.string().min(10).max(10), // Esperando data no formato 'YYYY-MM-DD'
      }),
    }
  }, async (request, reply) => {
    const { start_date, final_date } = request.body

    try {
      const metrics = await getBigNumbersMetrics({ start_date, final_date })

      return { metrics }
    } catch (error: unknown) { // Especificando o tipo de erro como 'unknown'
      // Verificação do tipo de erro
      if (error instanceof Error) {
        return reply.status(500).send({ message: 'Error processing metrics', error: error.message })
      }

      // Se o erro não for do tipo 'Error', trata como erro genérico
      return reply.status(500).send({ message: 'Unknown error occurred' })
    }
  })
}
