import { eq } from "drizzle-orm"
import { db } from "../db"
import { cep, endereco } from "../db/schema"
import cepPromise from 'cep-promise'

interface UpdateCepRequest {
  idEndereco: string
  codigoCep: string
}

export async function updateCep({
  idEndereco,
  codigoCep
}: UpdateCepRequest) {
  // Verificar se o CEP já está na tabela
  let cepExistente = await db
    .select()
    .from(cep)
    .where(eq(cep.codigoCep, codigoCep))

  // Se não existir, buscar via cep-promise e inserir
  if (cepExistente.length === 0) {
    const cepInfo = await cepPromise(codigoCep)

    const novaCidade = cepInfo.city
    const novoEstado = cepInfo.state

    const inserted = await db.insert(cep).values({
      codigoCep,
      cidade: novaCidade,
      estado: novoEstado
    }).returning()

    cepExistente = inserted
  }

  // Atualizar apenas o campo cep na tabela endereco
  await db.update(endereco)
    .set({
      cep: codigoCep
    })
    .where(eq(endereco.id, idEndereco))

  return {
    mensagem: 'CEP atualizado com sucesso.',
    cidade: cepExistente[0].cidade
  }
}