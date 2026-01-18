import { FastifyPluginCallbackTypebox } from "@fastify/type-provider-typebox";
import { User } from "../../../../schemas/users/bodies.ts";

const route: FastifyPluginCallbackTypebox = (app, _, done) => {
  app.get(
    "/",
    {
      onRequest: [app.authenticate],
      schema: {
        response: {
          200: User,
        },
      },
    },
    async (request) => {
      const userId = request.user.id; // Теперь типизировано

      const user = await app.prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!user) {
        throw app.httpErrors.notFound("User not found");
      }

      return {
        ...user,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      };
    }
  );

  done();
};

export default route;
