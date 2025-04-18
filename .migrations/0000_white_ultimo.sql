CREATE TABLE "bairro" (
	"id_bairro" text PRIMARY KEY NOT NULL,
	"nome_bairro" text NOT NULL,
	"id_cidade" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cep" (
	"id_cep" text PRIMARY KEY NOT NULL,
	"cep" text NOT NULL,
	"id_cidade" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cidade" (
	"id_cidade" text PRIMARY KEY NOT NULL,
	"nome_cidade" text NOT NULL
);
--> statement-breakpoint
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
--> statement-breakpoint
CREATE TABLE "endereco" (
	"id_endereco" text PRIMARY KEY NOT NULL,
	"id_bairro" text NOT NULL,
	"id_cep" text NOT NULL,
	"logradouro" text NOT NULL,
	"numero_endereco" integer NOT NULL,
	"complemento" text
);
--> statement-breakpoint
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
--> statement-breakpoint
CREATE TABLE "usuario" (
	"id_usuario" text PRIMARY KEY NOT NULL,
	"nome_usuario" text NOT NULL,
	"tipo_usuario" text NOT NULL,
	"senha" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "bairro" ADD CONSTRAINT "bairro_id_cidade_cidade_id_cidade_fk" FOREIGN KEY ("id_cidade") REFERENCES "public"."cidade"("id_cidade") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cep" ADD CONSTRAINT "cep_id_cidade_cidade_id_cidade_fk" FOREIGN KEY ("id_cidade") REFERENCES "public"."cidade"("id_cidade") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cliente" ADD CONSTRAINT "cliente_id_endereco_endereco_id_endereco_fk" FOREIGN KEY ("id_endereco") REFERENCES "public"."endereco"("id_endereco") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "endereco" ADD CONSTRAINT "endereco_id_bairro_bairro_id_bairro_fk" FOREIGN KEY ("id_bairro") REFERENCES "public"."bairro"("id_bairro") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "endereco" ADD CONSTRAINT "endereco_id_cep_cep_id_cep_fk" FOREIGN KEY ("id_cep") REFERENCES "public"."cep"("id_cep") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ordem_servico" ADD CONSTRAINT "ordem_servico_id_cliente_cliente_id_cliente_fk" FOREIGN KEY ("id_cliente") REFERENCES "public"."cliente"("id_cliente") ON DELETE no action ON UPDATE no action;