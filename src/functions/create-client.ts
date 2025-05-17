import { db } from "../db";
import { cliente } from "../db/schema";
import { eq } from "drizzle-orm"; // Importante ter isso!

interface CreateClientRequest {
  tipoPessoa: string
  sexo: string
  dataNascimento: Date
  nomeCompleto: string
  cpf: string
  rg: string
  filiacao: string
  observacao?: string | null
  idEndereco: string
  celular1: string
  celular2?: string | null
  telefone1?: string | null
  telefone2?: string | null
  flagNegativado?: boolean
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
  telefone2,
  flagNegativado
}: CreateClientRequest) {
  // Primeiro: verificar se já existe CPF cadastrado
  const existingClient = await db.query.cliente.findFirst({
    where: eq(cliente.cpf, cpf),
  });

  if (existingClient) {
    throw new Error('CPF já cadastrado.');
  }

  const dataNascimentoFormatada = dataNascimento.toISOString().split('T')[0];

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
    flagNegativado
  }).returning();

  const newClient = result[0];

  return {
    client: newClient,
  };
}