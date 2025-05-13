import { db } from "../db"
import { ordemServico } from "../db/schema"
import { and, gte, lte, sql } from "drizzle-orm"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

dayjs.extend(utc)
dayjs.extend(timezone)

interface getOrdersPerDayMetricsRequest {
  start_date: string
  final_date: string
}

export async function getOrdersPerDayMetrics({ start_date, final_date }: getOrdersPerDayMetricsRequest) {
  const startDate = dayjs.tz(start_date, 'America/Sao_Paulo').startOf('day').toDate()
  const finalDate = dayjs.tz(final_date, 'America/Sao_Paulo').endOf('day').toDate()
  
  try {
    const resultados = await db
      .select({
        dataEntrada: sql`DATE(${ordemServico.dataEntrada})`.as("dataEntrada"),
        quantidade: sql<number>`COUNT(${ordemServico.id})`.as("quantidade")
      })
      .from(ordemServico)
      .where(
        and(
          gte(ordemServico.dataEntrada, startDate),
          lte(ordemServico.dataEntrada, finalDate)
        )
      )
      .groupBy(sql`DATE(${ordemServico.dataEntrada})`)
      .orderBy(sql`DATE(${ordemServico.dataEntrada})`)

    return resultados.map(result => ({
      dataEntrada: result.dataEntrada,
      quantidade: Number(result.quantidade)
    }))

  } catch (error) {
    console.error("Erro ao buscar ordem de serviços:", error)
    throw new Error("Erro ao buscar ordem de serviços por data")
  }
}