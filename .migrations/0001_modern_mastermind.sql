ALTER TABLE "ordem_servico" ALTER COLUMN "data_entrada" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "ordem_servico" ADD COLUMN "flag_urgencia" boolean DEFAULT false NOT NULL;