import { FastifyPluginCallbackTypebox } from "@fastify/type-provider-typebox";
import { ColorSchemas } from "../../../../schemas/index.ts";

const route: FastifyPluginCallbackTypebox = (app, _, done) => {
  app.post(
    "/",
    {
      onRequest: [app.authenticate],
      schema: {
        params: ColorSchemas.Params.StoreId,
        body: ColorSchemas.Bodies.CreateColor,
        response: {
          201: ColorSchemas.Bodies.Color,
        },
      },
    },
    async (request, reply) => {
      const { name, value } = request.body;

      const color = await app.prisma.color.create({
        data: {
          name,
          value,
          storeId: Number(request.params.storeId),
        },
      });

      reply.status(201);
      return {
        ...color,
        storeId: Number(color.storeId),
        createdAt: color.createdAt.toISOString(),
        updatedAt: color.updatedAt.toISOString(),
      };
    }
  );
  done();
};
export default route;
