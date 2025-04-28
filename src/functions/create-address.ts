import { db } from "../db"
import { endereco } from "../db/schema"

interface CreateAddressRequest {
  cep: string
  bairro: string
  logradouro: string
  numeroEndereco: number
  complemento?: string | null
}

export async function createAddress({
  cep,
  bairro,
  logradouro,
  numeroEndereco,
  complemento
}: CreateAddressRequest) {
  const result = await db.insert(endereco).values({
    cep,
    bairro,
    logradouro,
    numeroEndereco,
    complemento,
  }).returning()

  const Endereco = result[0]

  return {
    Endereco,
  }
}