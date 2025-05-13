import { db } from "../db"
import { ordemServico } from "../db/schema"
import { between, sql } from "drizzle-orm"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

dayjs.extend(utc)
dayjs.extend(timezone)

interface getPeriodDefectsMetricsRequest {
  start_date: string
  final_date: string
}

export async function getPeriodDefectsMetrics({ start_date, final_date }: getPeriodDefectsMetricsRequest) {
    const startDate = dayjs.tz(start_date, 'America/Sao_Paulo').startOf('day').toDate()
    const finalDate = dayjs.tz(final_date, 'America/Sao_Paulo').endOf('day').toDate()

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
