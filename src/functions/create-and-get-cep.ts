import { eq } from "drizzle-orm"
import { db } from "../db"
import { cep } from "../db/schema"
import cepPromise from 'cep-promise'

interface CreateAndGetCepRequest {
  codigoCep: string
}

export async function createAndGetCep({ codigoCep }: CreateAndGetCepRequest) {
  // Verificar se o CEP já está cadastrado
  const cepExistente = await db
    .select()
    .from(cep)
    .where(eq(cep.codigoCep, codigoCep))

  if (cepExistente.length > 0) {
    return {
      cidade: cepExistente[0].cidade,
    }
  }

  // Se não existir, buscar cidade e estado usando a API do cep-promise
  const cepInfo = await cepPromise(codigoCep)

  const novaCidade = cepInfo.city
  const novoEstado = cepInfo.state

  // Inserir novo CEP no banco
  const result = await db.insert(cep).values({
    codigoCep,
    cidade: novaCidade,
    estado: novoEstado
  }).returning()

  const cepCadastrado = result[0]

  return {
    cidade: cepCadastrado.cidade,
  }
}