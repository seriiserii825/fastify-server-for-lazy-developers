import { FastifyPluginCallbackTypebox } from "@fastify/type-provider-typebox";
import { UserSchemas } from "../../../../../schemas/index.ts";

const route: FastifyPluginCallbackTypebox = (app, _, done) => {
  app.patch(
    "/",
    {
      onRequest: [app.authenticate],
      schema: {
        params: UserSchemas.Params.ProductId,
        response: {
          200: UserSchemas.Bodies.FavoriteResponse,
        },
      },
    },
    async (request, reply) => {
      // await Promise.resolve(); // TODO remove after adding logic
      const { productId } = request.params;
      return reply.code(200).send({
        message: "Added to favorites",
        isFavorite: false,
        productId,
      });
    }
  );
  done();
};
export default route;
