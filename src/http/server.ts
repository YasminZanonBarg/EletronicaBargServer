import fastify from "fastify"
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod"
import fastifyCors from "@fastify/cors"
import { createLoginRoute } from "./routes/create-login"
import { getServiceOrderRoute } from "./routes/get-service-order"
import { deleteServiceOrderRoute } from "./routes/delete-service-order"
import { createServiceOrderRoute } from "./routes/create-service-order"
import { getClientByCpfRoute } from "./routes/get-client-by-cpf"
import { getClientsRoute } from "./routes/get-clients"

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*', // qualquer frontend pode conectar com meu backend, em prod se substitui com a URL do frontend
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createLoginRoute)
app.register(getServiceOrderRoute)
app.register(deleteServiceOrderRoute)
app.register(createServiceOrderRoute)
app.register(getClientByCpfRoute)
app.register(getClientsRoute)

app.listen({
  port: 3333,
}).then(() => {
  console.log('HTTP server running')
})