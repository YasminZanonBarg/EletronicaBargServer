import fastify from "fastify"
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod"
import fastifyCors from "@fastify/cors"
import { createLoginRoute } from "./routes/create-login"
import { getServiceOrderRoute } from "./routes/get-service-order"
import { deleteServiceOrderRoute } from "./routes/delete-service-order"
import { createServiceOrderRoute } from "./routes/create-service-order"
import { getClientByCpfRoute } from "./routes/get-client-by-cpf"
import { getClientsRoute } from "./routes/get-clients"
import { deleteClientRoute } from "./routes/delete-client"
import { createAndGetCepRoute } from './routes/create-and-get-cep'
import { createClientRoute } from './routes/create-client'
import { createAddressRoute } from './routes/create-address'
import { updateClientRoute } from './routes/update-client'
import { updateAddressRoute } from './routes/update-address'
import { updateCepRoute } from './routes/update-cep'
import { updateServiceOrderRoute } from './routes/update-service-order'
import { getBigNumbersMetricsRoute } from './routes/get-big-numbers-metrics'


const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*', // qualquer frontend pode conectar com meu backend, em prod se substitui com a URL do frontend
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
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
app.register(deleteClientRoute)
app.register(createAndGetCepRoute)
app.register(createClientRoute)
app.register(createAddressRoute)
app.register(updateClientRoute)
app.register(updateAddressRoute)
app.register(updateCepRoute)
app.register(updateServiceOrderRoute)
app.register(getBigNumbersMetricsRoute)

app.listen({
  port: 3333,
}).then(() => {
  console.log('HTTP server running')
})