import { db } from "../db"
import { ordemServico } from "../db/schema"
import { eq } from "drizzle-orm"

interface DeleteServiceOrderRequest {
  id: string
}

export async function deleteServiceOrder({ id }: DeleteServiceOrderRequest) {
  const deleted = await db
    .delete(ordemServico)
    .where(eq(ordemServico.id, id))

  return deleted
}
