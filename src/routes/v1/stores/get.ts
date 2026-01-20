import { FastifyPluginCallbackTypebox } from "@fastify/type-provider-typebox";
import { StoreSchemas } from "../../../schemas/index.ts";

const route: FastifyPluginCallbackTypebox = (app, _, done) => {
  app.get(
    "/",
    {
      onRequest: [app.authenticate],
      schema: {
        response: {
          200: StoreSchemas.Bodies.StoreArray,
        },
      },
    },
    async (request) => {
      const userId = request.user.id;
      const stores = await app.prisma.store.findMany({
        where: {
          userId,
        },
        orderBy: {
          createdAt: "desc", // ✅ Сортировка: новые первыми
        },
      });
      return stores.map((store) => ({
        ...store,
        createdAt: store.createdAt.toISOString(),
        updatedAt: store.updatedAt.toISOString(),
      }));
    }
  );
  done();
};
export default route;
