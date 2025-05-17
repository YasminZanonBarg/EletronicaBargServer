import { db } from "../db"
import { ordemServico } from "../db/schema"
import { eq, sql } from "drizzle-orm"

export async function updateFlagUrgencia(id: string) {
  const result = await db
    .update(ordemServico)
    .set({ flagUrgencia: sql`NOT ${ordemServico.flagUrgencia}` })
    .where(eq(ordemServico.id, id))
    .returning({ novaUrgencia: ordemServico.flagUrgencia })

  return {
    id,
    novaUrgencia: result[0]?.novaUrgencia
  }
}
