import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { UserSchemas } from "../../../schemas/index.ts";

const route: FastifyPluginAsyncTypebox = async (app) => {
  app.post(
    "/",
    {
      schema: {
        body: UserSchemas.Bodies.CreateUser,
        response: {
          201: UserSchemas.Bodies.User,
        },
      },
    },
    async (request, reply) => {
      const { email, password, name } = request.body;

      const old_user = await app.prisma.user.findUnique({
        where: { email },
      });

      if (old_user) {
        throw app.httpErrors.conflict(`User with email ${email} already exists`);
      }

      const user = await app.prisma.user.create({
        data: {
          name,
          email,
          password,
        },
      });

      reply.status(201);
      return {
        ...user,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      };
    }
  );
};
export default route;
