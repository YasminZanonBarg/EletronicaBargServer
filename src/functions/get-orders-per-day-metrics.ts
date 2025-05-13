import { db } from "../db"
import { ordemServico } from "../db/schema"
import { between, sql } from "drizzle-orm"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

interface getOrdersPerDayMetricsRequest {
  start_date: string
  final_date: string
}

export async function getOrdersPerDayMetrics({ start_date, final_date }: getOrdersPerDayMetricsRequest) {
  dayjs.extend(utc)
  dayjs.extend(timezone)

  const startDate = dayjs(start_date).tz("America/Sao_Paulo").startOf("day").toDate()
  const finalDate = dayjs(final_date).tz("America/Sao_Paulo").endOf("day").toDate()

  try {
    const resultados = await db
      .select({
        dataEntrada: sql`DATE(${ordemServico.dataEntrada})`.as("dataEntrada"),
        quantidade: sql<number>`COUNT(${ordemServico.id})`.as("quantidade")
      })
      .from(ordemServico)
      .where(
        between(ordemServico.dataEntrada, startDate, finalDate)
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
