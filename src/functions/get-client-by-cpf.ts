import { db } from "../db"
import { cep, cliente, endereco } from "../db/schema"
import { eq } from "drizzle-orm"

export async function getClientByCpf(cpf: string) {
  const result = await db
    .select({
      id: cliente.id,
      dataCadastro: cliente.dataCadastro,
      tipoPessoa: cliente.tipoPessoa,
      sexo: cliente.sexo,
      dataNascimento: cliente.dataNascimento,
      nomeCompleto: cliente.nomeCompleto,
      cpf: cliente.cpf,
      rg: cliente.rg,
      filiacao: cliente.filiacao,
      observacao: cliente.observacao,
      cep: cep.codigoCep,
      cidade: cep.cidade,
      bairro: endereco.bairro,
      logradouro: endereco.logradouro,
      numeroEndereco: endereco.numeroEndereco,
      complemento: endereco.complemento,
      celular1: cliente.celular1,
      celular2: cliente.celular2,
      telefone1: cliente.telefone1,
      telefone2: cliente.telefone2,
      flagNegativado: cliente.flagNegativado
    })
    .from(cliente)
    .leftJoin(
      endereco,
      eq(cliente.idEndereco, endereco.id)
    )
    .leftJoin(
      cep,
      eq(endereco.cep, cep.codigoCep)
    )
    .where(eq(cliente.cpf, cpf))

  return {
    client: result[0] ?? null
  }
}