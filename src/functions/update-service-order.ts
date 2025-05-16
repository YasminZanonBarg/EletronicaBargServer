import { db } from "../db"
import { ordemServico } from "../db/schema"
import { eq, sql } from "drizzle-orm"
import type { SQL } from "drizzle-orm/sql"

interface UpdateServiceOrderRequest {
  id: string
  idCliente?: string
  situacao?: string
  aparelho?: string
  marca?: string
  modelo?: string
  serie?: string
  defeito?: string
  acessorios?: string
  localizacaoAparelho?: string
  preOrcamento?: string | null
  valorMaoDeObra?: string | null
  valorPecas?: string | null
  valorTotal?: string | null
  motivos?: string | null
  notas?: string | null
  dataSaida?: Date | SQL | null
  flagUrgencia?: boolean
}

export async function updateServiceOrder({
  id,
  ...data
}: UpdateServiceOrderRequest) {
  // Se "situacao" for "retirado", define a data de saída
  if (
    data.situacao === "Consertado e retirado" ||
    data.situacao === "Sem conserto e retirado"
  ) {
    data.dataSaida = sql`CURRENT_TIMESTAMP`
  }

  // Função para garantir que valores vazios sejam tratados como null
  const parseToNumericOrNull = (value: string | null | undefined): string | null => {
    if (value === null || value === undefined || value.trim() === "") return null
    const parsedValue = Number.parseFloat(value)
    return Number.isNaN(parsedValue) ? null : parsedValue.toFixed(2)
  }

  // Calcular valorTotal
  let valorTotal: string | null = null;

  const maoDeObra = parseToNumericOrNull(data.valorMaoDeObra);
  const pecas = parseToNumericOrNull(data.valorPecas);

  // Lógica para calcular o valorTotal considerando os diferentes casos
  if (maoDeObra !== null && pecas !== null) {
    // Se ambos os valores estão presentes, soma-os
    valorTotal = (Number.parseFloat(maoDeObra) + Number.parseFloat(pecas)).toFixed(2);
  } else if (maoDeObra !== null) {
    // Se apenas o valor da mão de obra está presente
    valorTotal = maoDeObra;
  } else if (pecas !== null) {
    // Se apenas o valor das peças está presente
    valorTotal = pecas;
  }

  // Atribui o valorTotal calculado à data
  data.valorTotal = valorTotal;

  // Tratar campos preOrcamento, valorMaoDeObra, valorPecas
  data.preOrcamento = parseToNumericOrNull(data.preOrcamento)
  data.valorMaoDeObra = parseToNumericOrNull(data.valorMaoDeObra)
  data.valorPecas = parseToNumericOrNull(data.valorPecas)

  // Remove campos undefined
  const cleanData = Object.fromEntries(
    Object.entries(data).filter(([_, v]) => v !== undefined)
  );

  const result = await db
    .update(ordemServico)
    .set(cleanData)
    .where(eq(ordemServico.id, id))
    .returning()

  return {
    updatedOrder: result[0],
  }
}