import { db } from "../db"
import { ordemServico } from "../db/schema"
import { and, between, sql } from "drizzle-orm"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

dayjs.extend(utc)
dayjs.extend(timezone)

interface GetBigNumbersMetricsRequest {
  start_date: string
  final_date: string
}

export async function getBigNumbersMetrics({ start_date, final_date }: GetBigNumbersMetricsRequest) {
  const startDate = dayjs.tz(start_date, 'America/Sao_Paulo').startOf('day').toDate()
  const finalDate = dayjs.tz(final_date, 'America/Sao_Paulo').endOf('day').toDate()

  try {
    // Cálculo de consertos realizados
    const consertos = await db
      .select({
        qtd_consertos: sql<number>`COUNT(${ordemServico.id})`,
        valor_consertos: sql<number>`SUM(COALESCE(${ordemServico.valorTotal}, 0))`,
        valor_medio_consertos: sql<number>`ROUND(SUM(COALESCE(${ordemServico.valorTotal}, 0)) / COUNT(${ordemServico.id}), 2)`
      })
      .from(ordemServico)
      .where(
        and(
          between(ordemServico.dataSaida, startDate, finalDate),
          sql`${ordemServico.situacao} IN ('Consertado e retirado', 'Sem conserto e retirado')`
        )
      )

    // Cálculo de aprovados vs total
    const aprovados = await db
      .select({
        total: sql<number>`SUM(CASE 
          WHEN ${ordemServico.situacao} IN ('Consertado e retirado', 'Sem conserto e retirado') THEN 1 ELSE 0 END)`,
        aprovados: sql<number>`SUM(CASE 
          WHEN ${ordemServico.situacao} IN ('Consertado e retirado') THEN 1 ELSE 0 END)`
      })
      .from(ordemServico)
      .where(
        between(ordemServico.dataSaida
          , startDate, finalDate)
      )

    const c = consertos[0] || {}
    const a = aprovados[0] || {}

    return {
      qtd_consertos: Number(c.qtd_consertos ?? 0),
      valor_consertos: Number(c.valor_consertos ?? 0),
      valor_medio_consertos: Number(c.valor_medio_consertos ?? 0),
      aprovados: Number(a.aprovados ?? 0),
      taxa_aprovacao: Number(a.total ? ((Number(a.aprovados ?? 0) * 100) / Number(a.total)).toFixed(2) : 0)
    }    

  } catch (error) {
    // Caso ocorra um erro com a consulta ao banco
    console.error("Erro ao calcular métricas:", error)
    throw new Error("Erro ao processar métricas")
  }
}
