-- Apagar as tabelas antigas
DROP TABLE IF EXISTS "cep" CASCADE;
DROP TABLE IF EXISTS "cliente" CASCADE;
DROP TABLE IF EXISTS "endereco" CASCADE;
DROP TABLE IF EXISTS "ordem_servico" CASCADE;
DROP TABLE IF EXISTS "usuario" CASCADE;
DROP TABLE IF EXISTS "bairro" CASCADE;
DROP TABLE IF EXISTS "cidade" CASCADE;

-- Criar as tabelas novamente
CREATE TABLE "cep" (
    "codigo_cep" text PRIMARY KEY NOT NULL,
    "estado" text NOT NULL,
    "cidade" text NOT NULL
);

CREATE TABLE "cliente" (
    "id_cliente" text PRIMARY KEY NOT NULL,
    "id_endereco" text NOT NULL,
    "data_cadastro" timestamp with time zone DEFAULT now() NOT NULL,
    "tipo_pessoa" text NOT NULL,
    "sexo" text NOT NULL,
    "data_nascimento" date NOT NULL,
    "nome_completo" text NOT NULL,
    "cpf" text NOT NULL,
    "rg" text NOT NULL,
    "filiacao" text NOT NULL,
    "observacao" text,
    "celular_1" text NOT NULL,
    "celular_2" text,
    "telefone_1" text,
    "telefone_2" text
);

CREATE TABLE "endereco" (
    "id_endereco" text PRIMARY KEY NOT NULL,
    "cep" text NOT NULL,
    "bairro" text NOT NULL,
    "logradouro" text NOT NULL,
    "numero_endereco" integer NOT NULL,
    "complemento" text
);

CREATE TABLE "ordem_servico" (
    "id_ordem_servico" text PRIMARY KEY NOT NULL,
    "id_cliente" text NOT NULL,
    "numero_ordem_servico" serial NOT NULL,
    "data_entrada" timestamp with time zone DEFAULT now() NOT NULL,
    "data_saida" timestamp with time zone,
    "situacao" text DEFAULT 'Aguardando orçamento' NOT NULL,
    "aparelho" text NOT NULL,
    "marca" text NOT NULL,
    "modelo" text NOT NULL,
    "serie" text NOT NULL,
    "defeito" text NOT NULL,
    "acessorios" text NOT NULL,
    "localizacao_aparelho" text NOT NULL,
    "pre_orcamento" numeric,
    "valor_mao_de_obra" numeric,
    "valor_pecas" numeric,
    "valor_total" numeric,
    "motivos" text,
    "notas" text,
    CONSTRAINT "ordem_servico_numero_ordem_servico_unique" UNIQUE("numero_ordem_servico")
);

CREATE TABLE "usuario" (
    "id_usuario" text PRIMARY KEY NOT NULL,
    "nome_usuario" text NOT NULL,
    "tipo_usuario" text NOT NULL,
    "senha" text NOT NULL
);

-- Criar as constraints (Foreign Keys)
ALTER TABLE "cliente" ADD CONSTRAINT "cliente_id_endereco_endereco_id_endereco_fk" FOREIGN KEY ("id_endereco") REFERENCES "public"."endereco"("id_endereco") ON DELETE no action ON UPDATE no action;
ALTER TABLE "endereco" ADD CONSTRAINT "endereco_cep_cep_codigo_cep_fk" FOREIGN KEY ("cep") REFERENCES "public"."cep"("codigo_cep") ON DELETE no action ON UPDATE no action;
ALTER TABLE "ordem_servico" ADD CONSTRAINT "ordem_servico_id_cliente_cliente_id_cliente_fk" FOREIGN KEY ("id_cliente") REFERENCES "public"."cliente"("id_cliente") ON DELETE no action ON UPDATE no action;