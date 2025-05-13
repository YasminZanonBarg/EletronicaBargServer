import { db } from "../db"
import { ordemServico } from "../db/schema"
import { and, count, gte, lte, sql } from "drizzle-orm"
import dayjs from "dayjs"

interface getOrdersPerDayMetricsRequest {
  start_date: string
  final_date: string
}

export async function getOrdersPerDayMetrics({ start_date, final_date }: getOrdersPerDayMetricsRequest) {
  const startDate = dayjs(start_date).startOf('day').toDate()
  const finalDate = dayjs(final_date).endOf('day').toDate()


  console.log(startDate)
  console.log(finalDate)

  try {
    const resultados = await db
      .select({
        dataEntrada: ordemServico.dataEntrada,
        quantidade: count(ordemServico.id).as("quantidade")
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
      dataEntrada: dayjs(result.dataEntrada).format("YYYY-MM-DD"),
      quantidade: Number(result.quantidade)
    }))

  } catch (error) {
    console.error("Erro ao buscar ordem de serviços:", error)
    throw new Error("Erro ao buscar ordem de serviços por data")
  }
}
