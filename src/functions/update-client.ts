import { db } from "../db"
import { cliente } from "../db/schema"
import { eq } from "drizzle-orm"

interface UpdateClientRequest {
  id: string; // id_cliente
  tipoPessoa?: string;
  sexo?: string;
  dataNascimento?: Date;
  nomeCompleto?: string;
  cpf?: string;
  rg?: string;
  filiacao?: string;
  observacao?: string | null;
  idEndereco?: string;
  celular1?: string;
  celular2?: string | null;
  telefone1?: string | null;
  telefone2?: string | null;
  flagNegativado?: boolean;
}

export async function updateClient({
  id,
  ...data
}: UpdateClientRequest) {
  const formattedData = {
    ...data,
    dataNascimento: data.dataNascimento
      ? data.dataNascimento.toISOString().split("T")[0]
      : undefined,
  }

  const result = await db
    .update(cliente)
    .set(formattedData)
    .where(eq(cliente.id, id))
    .returning()

  return {
    client: result[0],
  }
}