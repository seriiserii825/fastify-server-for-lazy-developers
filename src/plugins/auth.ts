import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

declare module "fastify" {
  interface FastifyInstance {
    authenticate(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  }
}

// eslint-disable-next-line @typescript-eslint/require-await
const authPluginImpl: FastifyPluginAsync = async (fastify) => {
  fastify.decorate("authenticate", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      fastify.log.error(err);
      reply.code(401).send({ error: "Unauthorized" });
    }
  });
};

/**
 * ⬇️ ЭТО ОБЯЗАТЕЛЬНО
 * fp() -> unknown
 * кастим РЕЗУЛЬТАТ
 */
const authPlugin = fp(authPluginImpl, {
  name: "auth-plugin",
  dependencies: ["@fastify/jwt"],
});

export default authPlugin;
