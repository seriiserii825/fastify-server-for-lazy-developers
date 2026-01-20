import { FastifyPluginCallbackTypebox } from "@fastify/type-provider-typebox";
import { StoreSchemas } from "../../../../schemas/index.ts";

const route: FastifyPluginCallbackTypebox = (app, _, done) => {
  app.patch(
    "/:storeId",
    {
      onRequest: [app.authenticate],
      schema: {
        params: StoreSchemas.Params.StoreId,
        body: StoreSchemas.Bodies.UpdateStore,
        response: {
          200: StoreSchemas.Bodies.Store,
        },
      },
    },
    async (request, reply) => {
      const { title, description } = request.body;
      const userId = request.user.id;
      const storeId = request.params.storeId;

      // 1) Ensure store exists and belongs to user
      const existing = await app.prisma.store.findFirst({
        where: { id: storeId, userId },
      });

      if (!existing) {
        throw app.httpErrors.notFound("Store not found");
      }

      // 2) If title is provided/changed, check uniqueness for this user
      if (title && title !== existing.title) {
        const duplicate = await app.prisma.store.findFirst({
          where: {
            userId,
            title,
            NOT: { id: storeId },
          },
        });

        if (duplicate) {
          throw app.httpErrors.badRequest(
            "Store with this title already exists"
          );
        }
      }

      // 3) Update and return updated entity
      const updated = await app.prisma.store.update({
        where: { id: storeId },
        data: {
          ...(title !== undefined ? { title } : {}),
          ...(description !== undefined ? { description } : {}),
        },
      });

      reply.code(200);
      return {
        ...updated,
        createdAt: updated.createdAt.toISOString(),
        updatedAt: updated.updatedAt.toISOString(),
      };
    }
  );

  done();
};

export default route;
