import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { getClients } from '../../functions/get-clients';

export const getClientsRoute: FastifyPluginAsyncZod = async (app, _opts) => {
  app.get('/clients', async () => {
    const { result } = await getClients()

    return { result }
  })
};