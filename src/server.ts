import autoLoad from "@fastify/autoload";
import { FastifyInstance } from "fastify";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import prismaPlugin from "./plugins/prisma.ts";
import authPlugin from "./plugins/auth.ts";
import fastifyCookie from "@fastify/cookie";
import fastifyJWT from "@fastify/jwt";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function (app: FastifyInstance) {
  // 1. Сначала регистрируем Cookie
  app.register(fastifyCookie);

  // 2. Затем JWT
  app.register(fastifyJWT, {
    secret: process.env.JWT_SECRET || "your-secret-key-change-in-production",
    sign: {
      expiresIn: "15m",
    },
  });

  // 3. Затем наш плагин аутентификации (зависит от JWT)
  app.register(authPlugin);

  // 4. Prisma
  await app.register(prismaPlugin);

  // 5. В конце автозагрузка роутов
  app.register(autoLoad, {
    dir: join(__dirname, "routes"),
    options: { prefix: "/api" },
    forceESM: true,
    routeParams: true,
  });

  app.ready(() => {
    app.log.info(app.printRoutes());
  });
}
