import { pgTable, text, integer, timestamp, decimal, date, serial, boolean } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'

export const usuario = pgTable('usuario', {
  id: text('id_usuario').primaryKey().$defaultFn(() => createId()),
  nomeUsuario: text('nome_usuario').notNull(),
  tipoUsuario: text('tipo_usuario').notNull(),
  senha: text('senha').notNull(),
})

export const cep = pgTable('cep', {
  codigoCep: text('codigo_cep').primaryKey().$defaultFn(() => createId()),
  estado: text('estado').notNull(),
  cidade: text('cidade').notNull(),
})

export const endereco = pgTable('endereco', {
  id: text('id_endereco').primaryKey().$defaultFn(() => createId()),
  cep: text('cep').references(() => cep.codigoCep).notNull(),
  bairro: text('bairro').notNull(),
  logradouro: text('logradouro').notNull(),
  numeroEndereco: integer('numero_endereco').notNull(),
  complemento: text('complemento'),
})

export const cliente = pgTable('cliente', {
  id: text('id_cliente').primaryKey().$defaultFn(() => createId()),
  idEndereco: text('id_endereco').references(() => endereco.id).notNull(),
  dataCadastro: timestamp('data_cadastro', { withTimezone: true })
    .notNull()
    .defaultNow(),
  tipoPessoa: text('tipo_pessoa').notNull(),
  sexo: text('sexo').notNull(),
  dataNascimento: date('data_nascimento').notNull(),
  nomeCompleto: text('nome_completo').notNull(),
  cpf: text('cpf').notNull(),
  rg: text('rg').notNull(),
  filiacao: text('filiacao').notNull(),
  observacao: text('observacao'),
  celular1: text('celular_1').notNull(),
  celular2: text('celular_2'),
  telefone1: text('telefone_1'),
  telefone2: text('telefone_2'),
  flagNegativado: boolean("flag_negativado").default(false).notNull()
})

export const ordemServico = pgTable('ordem_servico', {
  id: text('id_ordem_servico').primaryKey().$defaultFn(() => createId()),
  idCliente: text('id_cliente').references(() => cliente.id).notNull(),
  numeroOrdemServico: serial('numero_ordem_servico').notNull().unique(),
  dataEntrada: timestamp('data_entrada', { withTimezone: true })
    .notNull()
    .$defaultFn(() => new Date(Date.now())),
  dataSaida: timestamp('data_saida', { withTimezone: true }),
  situacao: text('situacao', {
    enum: [
      'Aguardando orçamento',
      'Pendente aprovação',
      'Conserto negado',
      'Pendente conserto',
      'Consertado',
      'Consertado e retirado',
      'Sem conserto e retirado'
    ]
  }).default('Aguardando orçamento').notNull(),
  aparelho: text('aparelho').notNull(),
  marca: text('marca').notNull(),
  modelo: text('modelo').notNull(),
  serie: text('serie').notNull(),
  defeito: text('defeito').notNull(),
  acessorios: text('acessorios').notNull(),
  localizacaoAparelho: text('localizacao_aparelho').notNull(),
  preOrcamento: decimal('pre_orcamento'),
  valorMaoDeObra: decimal('valor_mao_de_obra'),
  valorPecas: decimal('valor_pecas'),
  valorTotal: decimal('valor_total'),
  motivos: text('motivos'),
  notas: text('notas'),
  flagUrgencia: boolean("flag_urgencia").default(false).notNull()
})