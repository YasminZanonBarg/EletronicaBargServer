import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createServiceOrder } from '../../functions/create-service-order'

export const createServiceOrderRoute: FastifyPluginAsyncZod = async (app, _opts) => {
  app.post('/create-service-order', {
    schema: {
      body: z.object({
        idCliente: z.string(),
        dataSaida: z.coerce.date().nullable().optional(),
        aparelho: z.string(),
        marca: z.string(),
        modelo: z.string(),
        serie: z.string(),
        defeito: z.string(),
        acessorios: z.string(),
        localizacaoAparelho: z.string(),
        preOrcamento: z.string().nullable().optional(),
        valorMaoDeObra: z.string().nullable().optional(),
        valorPecas: z.string().nullable().optional(),
        valorTotal: z.string().nullable().optional(),
        motivos: z.string().nullable().optional(),
        notas: z.string().nullable().optional()
      })
    }
  }, async (request) => {
    const {
      idCliente, dataSaida, aparelho, marca, modelo, serie, defeito, acessorios,
      localizacaoAparelho, preOrcamento, valorMaoDeObra, valorPecas,
      valorTotal, motivos, notas
    } = request.body

    await createServiceOrder({
      idCliente,
      dataSaida,
      aparelho,
      marca,
      modelo,
      serie,
      defeito,
      acessorios,
      localizacaoAparelho,
      preOrcamento,
      valorMaoDeObra,
      valorPecas,
      valorTotal,
      motivos,
      notas
    })
  })
}
