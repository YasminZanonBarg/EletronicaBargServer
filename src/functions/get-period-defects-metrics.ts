import { db } from "../db"
import { ordemServico } from "../db/schema"
import { between, sql } from "drizzle-orm"
import dayjs from "dayjs"

interface getPeriodDefectsMetricsRequest {
  start_date: string
  final_date: string
}

export async function getPeriodDefectsMetrics({ start_date, final_date }: getPeriodDefectsMetricsRequest) {
  const startDate = dayjs(start_date).startOf('day').toDate() // Começa o dia (00:00:00)
  const finalDate = dayjs(final_date).endOf('day').toDate() // Termina o dia (23:59:59.999)

  try {
    const resultados = await db
      .select({
        defeito: ordemServico.defeito,
        quantidade: sql<number>`COUNT(${ordemServico.id})`.as("quantidade")
      })
      .from(ordemServico)
      .where(
        between(ordemServico.dataEntrada, startDate, finalDate)
      )
      .groupBy(ordemServico.defeito)

    return resultados.map(result => ({
      defeito: result.defeito,
      quantidade: Number(result.quantidade)
    }))

  } catch (error) {
    console.error("Erro ao buscar defeitos:", error)
    throw new Error("Erro ao buscar defeitos por quantidade")
  }
}
