import { db } from '../db'
import { cliente, ordemServico } from '../db/schema'
import { desc, eq } from 'drizzle-orm'

export async function getServiceOrder() {
  const result = await db
    .select({
      id: ordemServico.id,
      idCliente: ordemServico.idCliente,
      nomeCliente: cliente.nomeCompleto,
      numeroOrdemServico: ordemServico.numeroOrdemServico,
      dataEntrada: ordemServico.dataEntrada,
      dataSaida: ordemServico.dataSaida,
      situacao: ordemServico.situacao,
      aparelho: ordemServico.aparelho,
      marca: ordemServico.marca,
      modelo: ordemServico.modelo,
      serie: ordemServico.serie,
      defeito: ordemServico.defeito,
      acessorios: ordemServico.acessorios,
      localizacaoAparelho: ordemServico.localizacaoAparelho,
      preOrcamento: ordemServico.preOrcamento,
      valorMaoDeObra: ordemServico.valorMaoDeObra,
      valorPecas: ordemServico.valorPecas,
      valorTotal: ordemServico.valorTotal,
      motivos: ordemServico.motivos,
      notas: ordemServico.notas
    })
    .from(ordemServico)
    .leftJoin(
      cliente,
      eq(cliente.id, ordemServico.idCliente)
    )
    .orderBy(desc(ordemServico.dataEntrada))

  return {
    result,
  }
}