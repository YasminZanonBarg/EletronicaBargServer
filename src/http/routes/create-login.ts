import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createLogin } from '../../functions/create-login'

export const createLoginRoute: FastifyPluginAsyncZod = async (app, _opts) => {
  app.post('/login', {
    schema: {
      body: z.object({
        nomeUsuario: z.string(),
        senha: z.string(),
      }),
    }
  }, async (request) => {
    const { nomeUsuario, senha } = request.body

    const result = await createLogin({
      nomeUsuario,
      senha
    })

    return { result }
  })
}