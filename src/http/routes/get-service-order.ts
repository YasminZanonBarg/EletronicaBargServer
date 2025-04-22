import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { getServiceOrder } from '../../functions/get-service-order';

export const getServiceOrderRoute: FastifyPluginAsyncZod = async (app, _opts) => {
  app.get('/service-order', async () => {
    const { result } = await getServiceOrder()

    return { result }
  })
};