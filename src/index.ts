import fastify from "fastify";
import buildServer from "./server.ts";
import sensible from "@fastify/sensible";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import { swaggerOptions, swaggerUIOptions } from "./swagger.ts";

async function run() {
  const app = fastify({
    logger: {
      transport: {
        target: "pino-pretty",
      },
    },
  });

  await app.register(fastifySwagger, swaggerOptions);
  await app.register(fastifySwaggerUI, swaggerUIOptions);

  app.register(buildServer);
  // Регистрируем sensible
  app.register(sensible);

  try {
    await app.listen({
      port: 3300,
      host: "0.0.0.0",
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
