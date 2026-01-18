import { FastifyRequest, FastifyReply, FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
  }
}

const authPlugin: FastifyPluginCallback = (fastify, _, done) => {
  fastify.decorate(
    "authenticate",
    // Используем стрелочную функцию вместо async function
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (err: unknown) {
        console.error(err, "err");
        reply.code(401).send({ error: "Unauthorized" });
      }
    }
  );

  done();
};

export default fp(authPlugin, {
  name: "auth-plugin",
  dependencies: ["@fastify/jwt"],
});
