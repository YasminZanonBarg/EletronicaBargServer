import { db } from "../db"
import { ordemServico } from "../db/schema"
import { between, sql } from "drizzle-orm"
import dayjs from "dayjs"

interface getOrdersPerDayMetricsRequest {
  start_date: string
  final_date: string
}

export async function getOrdersPerDayMetrics({ start_date, final_date }: getOrdersPerDayMetricsRequest) {
  const startDate = dayjs(start_date).format('YYYY-MM-DD')
  const finalDate = dayjs(final_date).format('YYYY-MM-DD')

  console.log(startDate)
  console.log(finalDate)

  try {
    const resultados = await db
      .select({
        dataEntrada: sql`DATE(${ordemServico.dataEntrada})`.as("dataEntrada"),
        quantidade: sql<number>`COUNT(${ordemServico.id})`.as("quantidade")
      })
      .from(ordemServico)
      .where(
        sql`DATE(${ordemServico.dataEntrada}) BETWEEN ${startDate} AND ${finalDate}`
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
