import { FastifyPluginCallbackTypebox } from "@fastify/type-provider-typebox";
import { UserSchemas } from "../../../../schemas/index.ts";

const route: FastifyPluginCallbackTypebox = (app, _, done) => {
  app.get(
    "/",
    {
      schema: {
        params: UserSchemas.Params.UserId,
        response: {
          200: UserSchemas.Bodies.User,
        },
      },
    },
    async (request) => {
      const { userId } = request.params;
      const user = await app.prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        throw app.httpErrors.notFound(`User with id ${userId} not found`);
      }
      return {
        ...user,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      };
    }
  );

  app.delete(
    "/",
    {
      schema: {
        params: UserSchemas.Params.UserId,
        response: {
          200: UserSchemas.Bodies.User,
        },
      },
    },
    async (request) => {
      const { userId } = request.params;
      const user = await app.prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        throw app.httpErrors.notFound(`User with id ${userId} not found`);
      }
      await app.prisma.user.delete({
        where: { id: userId },
      });
      return {
        ...user,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      };
    }
  );

  app.patch(
    "/",
    {
      schema: {
        body: UserSchemas.Bodies.UpdateUser,
        params: UserSchemas.Params.UserId,
        response: {
          200: UserSchemas.Bodies.User,
        },
      },
    },
    async (request) => {
      const { userId } = request.params;
      const { name, password } = request.body;
      const user = await app.prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        throw app.httpErrors.notFound(`User with id ${userId} not found`);
      }
      const updatedUser = await app.prisma.user.update({
        where: { id: userId },
        data: {
          name: name ?? user.name,
          password: password ?? user.password,
        },
      });
      return {
        ...updatedUser,
        createdAt: updatedUser.createdAt.toISOString(),
        updatedAt: updatedUser.updatedAt.toISOString(),
      };
    }
  );
  done();
};
export default route;
