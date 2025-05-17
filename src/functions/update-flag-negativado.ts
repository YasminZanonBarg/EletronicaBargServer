import { db } from "../db"
import { cliente } from "../db/schema"
import { eq, sql } from "drizzle-orm"

export async function updateFlagNegativado(id: string) {
  const result = await db
    .update(cliente)
    .set({ flagNegativado: sql`NOT ${cliente.flagNegativado}` })
    .where(eq(cliente.id, id))
    .returning({ statusNegativado: cliente.flagNegativado })

  return {
    id,
    statusNegativado: result[0]?.statusNegativado
  }
}
