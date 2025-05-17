import { db } from '../db'
import { cep, cliente, endereco } from '../db/schema'
import { desc, eq } from 'drizzle-orm'

export async function getClients() {
  const result = await db
    .select({
      // Dados não exibidos
      id: cliente.id,
      idEndereco: cliente.idEndereco,
      // Secção - dados pessoais
      dataCadastro: cliente.dataCadastro,
      tipoPessoa: cliente.tipoPessoa,
      sexo: cliente.sexo,
      dataNascimento: cliente.dataNascimento,
      nomeCompleto: cliente.nomeCompleto,
      cpf: cliente.cpf,
      rg: cliente.rg,
      filiacao: cliente.filiacao,
      observacao: cliente.observacao,
      flagNegativado: cliente.flagNegativado,
      // Secção - endereço
      cep: cep.codigoCep,
      cidade: cep.cidade,
      bairro: endereco.bairro,
      logradouro: endereco.logradouro,
      numeroEndereco: endereco.numeroEndereco,
      complemento: endereco.complemento,
      // Secção - contato
      celular1: cliente.celular1,
      celular2: cliente.celular2,
      telefone1: cliente.telefone1,
      telefone2: cliente.telefone2,
    })
    .from(cliente)
    .leftJoin(
      endereco,
      eq(endereco.id, cliente.idEndereco)
    )
    .leftJoin(
      cep,
      eq(cep.codigoCep, endereco.cep)
    )
    .orderBy(desc(cliente.dataCadastro))

  return {
    result,
  }
}