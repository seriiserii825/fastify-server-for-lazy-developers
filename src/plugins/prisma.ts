import { PrismaClient } from "@prisma/client";
import fp from "fastify-plugin";

async function prismaPlugin(fastify, options) {
  const prisma = new PrismaClient();

  // Добавляем Prisma в декоратор Fastify
  fastify.decorate("prisma", prisma);

  // Закрываем соединение при остановке сервера
  fastify.addHook("onClose", async (fastify) => {
    await fastify.prisma.$disconnect();
  });
}

export default fp(prismaPlugin);
