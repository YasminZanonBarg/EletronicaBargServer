import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getPeriodDefectsMetrics } from '../../functions/get-period-defects-metrics' // ajuste o caminho conforme sua estrutura

export const getPeriodDefectsMetricsRoute: FastifyPluginAsyncZod = async (app, _opts) => {
  app.post('/get-period-defects-metrics', {
    schema: {
      body: z.object({
        start_date: z.string().min(10).max(10), // 'YYYY-MM-DD'
        final_date: z.string().min(10).max(10), // 'YYYY-MM-DD'
      }),
    }
  }, async (request, reply) => {
    const { start_date, final_date } = request.body

    try {
      const defeitos = await getPeriodDefectsMetrics({ start_date, final_date })
      return { defeitos }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return reply.status(500).send({ message: 'Erro ao buscar defeitos', error: error.message })
      }

      return reply.status(500).send({ message: 'Erro desconhecido ao buscar defeitos' })
    }
  })
}