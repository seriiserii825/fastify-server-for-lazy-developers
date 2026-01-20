import { FastifyPluginCallbackTypebox } from "@fastify/type-provider-typebox";
import { StoreSchemas } from "../../../schemas/index.ts";

const route: FastifyPluginCallbackTypebox = (app, _, done) => {
  app.post(
    "/",
    {
      onRequest: [app.authenticate],
      schema: {
        body: StoreSchemas.Bodies.CreateStore,
        response: {
          201: StoreSchemas.Bodies.Store,
        },
      },
    },
    async (request, reply) => {
      const { title, description } = request.body;
      const userId = request.user.id;

      const old_title = await app.prisma.store.findFirst({
        where: {
          userId,
          title,
        },
      });
      if (old_title) {
        throw app.httpErrors.badRequest("Store with this title already exists");
      }

      const store = await app.prisma.store.create({
        data: {
          userId,
          title,
          description,
        },
      });

      reply.status(201);
      return {
        ...store,
        createdAt: store.createdAt.toISOString(),
        updatedAt: store.updatedAt.toISOString(),
      };
    }
  );
  done();
};
export default route;
