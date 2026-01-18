import { PrismaClient } from "@prisma/client";
import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";

const prismaPlugin: FastifyPluginAsync = async (fastify) => {
  const prisma = new PrismaClient({
    log: ["query", "error", "warn"],
  });

  await prisma.$connect();

  fastify.decorate("prisma", prisma);

  fastify.addHook("onClose", async (fastify) => {
    await fastify.prisma.$disconnect();
  });
};

export default fp(prismaPlugin);
