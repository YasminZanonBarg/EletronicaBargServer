import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getOrdersPerDayMetrics } from '../../functions/get-orders-per-day-metrics' // ajuste o caminho conforme sua estrutura

export const getOrdersPerDayMetricsRoute: FastifyPluginAsyncZod = async (app, _opts) => {
  app.post('/get-orders-per-day-metrics', {
    schema: {
      body: z.object({
        start_date: z.string().min(10).max(10), // 'YYYY-MM-DD'
        final_date: z.string().min(10).max(10), // 'YYYY-MM-DD'
      }),
    }
  }, async (request, reply) => {
    const { start_date, final_date } = request.body

    try {
      const dataEntrada = await getOrdersPerDayMetrics({ start_date, final_date })
      return { dataEntrada }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return reply.status(500).send({ message: 'Erro ao buscar ordem de serviço', error: error.message })
      }

      return reply.status(500).send({ message: 'Erro desconhecido ao buscar ordem de serviço' })
    }
  })
}