import { db } from "../db"
import { ordemServico } from "../db/schema"
import { and, between, sql } from "drizzle-orm"
import dayjs from "dayjs"

interface GetBigNumbersMetricsRequest {
  start_date: string
  final_date: string
}

export async function getBigNumbersMetrics({ start_date, final_date }: GetBigNumbersMetricsRequest) {
  // Converter as datas de string para objetos Date
  const startDate = dayjs(start_date).startOf('day').toDate() // Começa o dia (00:00:00)
  const finalDate = dayjs(final_date).endOf('day').toDate() // Termina o dia (23:59:59.999)

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
          WHEN ${ordemServico.situacao} IN ('Aguardando orçamento', 'Pendente aprovação', 'Pendente conserto', 'Consertado', 'Consertado e retirado', 'Sem conserto e retirado', 'Conserto negado') THEN 1 ELSE 0 END)`,
        aprovados: sql<number>`SUM(CASE 
          WHEN ${ordemServico.situacao} IN ('Pendente conserto', 'Consertado', 'Consertado e retirado') THEN 1 ELSE 0 END)`
      })
      .from(ordemServico)
      .where(
        between(ordemServico.dataEntrada, startDate, finalDate)
      )

    const c = consertos[0] || {}
    const a = aprovados[0] || {}

    return {
      qtd_consertos: c.qtd_consertos ?? 0,
      valor_consertos: c.valor_consertos ?? 0,
      valor_medio_consertos: c.valor_medio_consertos ?? 0,
      aprovados: a.aprovados ?? 0,
      taxa_aprovacao: a.total ? Number(((a.aprovados ?? 0) * 100 / a.total).toFixed(2)) : 0
    }

  } catch (error) {
    // Caso ocorra um erro com a consulta ao banco
    console.error("Erro ao calcular métricas:", error)
    throw new Error("Erro ao processar métricas")
  }
}
