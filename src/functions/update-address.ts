import { db } from "../db"
import { endereco } from "../db/schema"
import { eq } from "drizzle-orm"

interface UpdateAddressRequest {
  id: string // id_endereco
  cep?: string
  bairro?: string
  logradouro?: string
  numeroEndereco?: number
  complemento?: string | null
}

export async function updateAddress({
  id,
  ...data
}: UpdateAddressRequest) {
  const result = await db
    .update(endereco)
    .set(data)
    .where(eq(endereco.id, id))
    .returning()

  return {
    address: result[0],
  }
}