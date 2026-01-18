import autoLoad from "@fastify/autoload";
import { FastifyInstance } from "fastify";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import prismaPlugin from "./plugins/prisma.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function (app: FastifyInstance) {
  app.register(autoLoad, {
    dir: join(__dirname, "routes"),
    options: { prefix: "/api" },
    forceESM: true,
    routeParams: true,
  });

  await app.register(prismaPlugin);

  app.ready(() => {
    app.log.info(app.printRoutes());
  });
}
