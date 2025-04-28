import { db } from "../db";
import { cliente } from "../db/schema";

interface CreateClientRequest {
  // Secção - Dados Pessoais
  tipoPessoa: string
  sexo: string
  dataNascimento: Date
  nomeCompleto: string
  cpf: string
  rg: string
  filiacao: string
  observacao?: string | null
  // Secção - Endereço
  idEndereco: string
  // Secção - Contato 
  celular1: string
  celular2?: string | null
  telefone1?: string | null
  telefone2?: string | null
}

export async function createClient({
  idEndereco,
  tipoPessoa,
  sexo,
  dataNascimento,
  nomeCompleto,
  cpf,
  rg,
  filiacao,
  observacao,
  celular1,
  celular2,
  telefone1,
  telefone2
}: CreateClientRequest) {
  const dataNascimentoFormatada = dataNascimento.toISOString().split('T')[0]

  const result = await db.insert(cliente).values({
    idEndereco,
    tipoPessoa,
    sexo,
    dataNascimento: dataNascimentoFormatada,
    nomeCompleto,
    cpf,
    rg,
    filiacao,
    observacao,
    celular1,
    celular2,
    telefone1,
    telefone2,
  }).returning()

  const newClient = result[0]

  return {
    client: newClient,
  };
}
