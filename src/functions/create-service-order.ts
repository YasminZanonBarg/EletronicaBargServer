import { db } from "../db"
import { ordemServico } from "../db/schema"

//Deixar explicíto o que não é obrigatorio
//Validar se dá certo o preenchimento default da situacao
interface CreateServiceOrderRequest {
  idCliente: string
  dataSaida?: string
  aparelho: string
  marca: string
  modelo: string
  serie: string
  defeito: string
  acessorios: string
  localizacaoAparelho: string
  preOrcamento?: number
  valorMaoDeObra?: number
  valorPecas?: number
  valorTotal?: number
  motivos?: string
  notas?: string
}

export async function createServiceOrder({ 
    idCliente, dataSaida, aparelho, marca, modelo, serie, defeito, acessorios, localizacaoAparelho, 
    preOrcamento, valorMaoDeObra, valorPecas, valorTotal, motivos, notas
}: CreateServiceOrderRequest) {
  const result = await db.insert(ordemServico).values({
    idCliente, 
    dataSaida, 
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

