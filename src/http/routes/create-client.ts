import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { createClient } from '../../functions/create-client';

export const createClientRoute: FastifyPluginAsyncZod = async (app, _opts) => {
  app.post('/create-client', {
    schema: {
      body: z.object({
        idEndereco: z.string(),
        tipoPessoa: z.string(),
        sexo: z.string(),
        dataNascimento: z.coerce.date(),
        nomeCompleto: z.string(),
        cpf: z.string(),
        rg: z.string(),
        filiacao: z.string(),
        observacao: z.string().nullable().optional(),
        celular1: z.string(),
        celular2: z.string().nullable().optional(),
        telefone1: z.string().nullable().optional(),
        telefone2: z.string().nullable().optional()
      })
    }
  }, async (request) => {
    const {
      idEndereco,
      tipoPessoa,
      sexo,
      dataNascimento,
      nomeCompleto,
      cpf,
      rg,
      filiacao,
      observacao,
      celular1,
      celular2,
      telefone1,
      telefone2
    } = request.body;

    await createClient({
      idEndereco,
      tipoPessoa,
      sexo,
      dataNascimento,
      nomeCompleto,
      cpf,
      rg,
      filiacao,
      observacao,
      celular1,
      celular2,
      telefone1,
      telefone2
    });
  });
};
