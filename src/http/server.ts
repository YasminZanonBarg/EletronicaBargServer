import fastify from "fastify"
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod"
import fastifyCors from "@fastify/cors"
import { createLoginRoute } from "./routes/create-login"
import { getServiceOrderRoute } from "./routes/get-service-order"

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*' // qualquer frontend pode conectar com meu backend, em prod se substitui com a URL do frontend
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createLoginRoute)
app.register(getServiceOrderRoute)

app.listen({
  port: 3333,
}).then(() => {
  console.log('HTTP server running')
})