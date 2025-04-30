import { db } from "../db"
import { ordemServico } from "../db/schema"

interface CreateServiceOrderRequest {
  idCliente: string
  aparelho: string
  marca: string
  modelo: string
  serie: string
  defeito: string
  acessorios: string
  localizacaoAparelho: string
  preOrcamento?: string | null //Decimal do ORM retorna como string
  valorMaoDeObra?: string | null
  valorPecas?: string | null
  valorTotal?: string | null
  motivos?: string | null
  notas?: string | null
}

export async function createServiceOrder({
  idCliente, aparelho, marca, modelo, serie, defeito, acessorios, localizacaoAparelho,
  preOrcamento, valorMaoDeObra, valorPecas, valorTotal, motivos, notas
}: CreateServiceOrderRequest) {
  const result = await db.insert(ordemServico).values({
    idCliente,
    aparelho,
    marca,
    modelo,
    serie,
    defeito,
    acessorios,
    localizacaoAparelho,
    preOrcamento,
    valorMaoDeObra,
    valorPecas,
    valorTotal,
    motivos,
    notas
  }).returning()

  const serviceOrder = result[0] //Necessário pegar a primeira posição, pois o insert retorna um array

  return {
    serviceOrder,
  }
}