import { db } from "../db"
import { cliente, ordemServico } from "../db/schema"
import { eq } from "drizzle-orm"

interface DeleteServiceOrderRequest {
  id: string
}

export async function deleteClient({ id }: DeleteServiceOrderRequest) {
  const ordensVinculadas = await db
    .select()
    .from(ordemServico)
    .where(eq(ordemServico.idCliente, id))

  if (ordensVinculadas.length > 0) {
    throw new Error("Não é possível deletar o cliente, pois existem ordens de serviço vinculadas a ele.");
  }

  const deleted = await db.delete(cliente).where(eq(cliente.id, id));

  return deleted
}