import { db } from "../db"
import { endereco } from "../db/schema"
import { eq, and, isNull } from "drizzle-orm"

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
  const existing = await db.query.endereco.findFirst({
    where: and(
      eq(endereco.cep, cep),
      eq(endereco.bairro, bairro),
      eq(endereco.logradouro, logradouro),
      eq(endereco.numeroEndereco, numeroEndereco),
      complemento == null
        ? isNull(endereco.complemento)
        : eq(endereco.complemento, complemento)
    )
  })

  if (existing) {
    return { idEndereco: existing.id }
  }

  const result = await db.insert(endereco).values({
    cep,
    bairro,
    logradouro,
    numeroEndereco,
    complemento: complemento ?? null,
  }).returning()

  return { idEndereco: result[0].id }
}