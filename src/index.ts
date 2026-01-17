import fastify from "fastify";
import buildServer from "./server.ts";
import sensible from "@fastify/sensible";

async function run() {
  const app = fastify({
    logger: {
      transport: {
        target: "pino-pretty",
      },
    },
  });
  app.register(buildServer);
  // Регистрируем sensible
  app.register(sensible);

  try {
    await app.listen({
      port: 3000,
      host: "0.0.0.0",
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

run();
