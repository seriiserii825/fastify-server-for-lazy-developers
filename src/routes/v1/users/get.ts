import { FastifyPluginCallbackTypebox } from "@fastify/type-provider-typebox";
import { UserSchemas } from "../../../schemas/index.ts";

const route: FastifyPluginCallbackTypebox = (app, _, done) => {
  app.get(
    "/",
    {
      schema: {
        response: {
          200: UserSchemas.Bodies.UsersList,
        },
      },
    },
    async () => {
      const users = await app.prisma.user.findMany();
      return users.map((user) => ({
        ...user,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      }));
    }
  );
  done();
};
export default route;
