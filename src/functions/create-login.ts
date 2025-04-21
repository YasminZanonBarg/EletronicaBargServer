import { db } from "../db"
import { usuario } from "../db/schema"
import { eq } from "drizzle-orm"

interface CreateLoginRequest {
  nomeUsuario: string
  senha: string
}

export async function createLogin({ nomeUsuario, senha }: CreateLoginRequest) {
  const result = await db
    .select()
    .from(usuario)
    .where(eq(usuario.nomeUsuario, nomeUsuario))
    .limit(1)

  const user = result[0]

  if (!user) {
    throw new Error("Usuário não encontrado")
  }

  if (user.senha !== senha) {
    throw new Error("Senha incorreta")
  }

  return {
    id: user.id,
    nomeUsuario: user.nomeUsuario,
    tipoUsuario: user.tipoUsuario,
  }
}
