import db from "../../../db/index.ts";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { PostSchemas } from "../../../schemas/index.ts";

const route: FastifyPluginAsyncTypebox = async (app) => {
  app.delete(
    "/:postId",
    {
      schema: {
        params: PostSchemas.Params.PostId,
        response: {
          200: PostSchemas.Bodies.Post,
        },
      },
    },
    async (request, reply) => {
      const { postId } = request.params;
      const post = db.posts.find((p) => p.id === postId);
      if (!post) {
        return reply.notFound(`Post with id ${postId} not found`);
      }
      db.posts = db.posts.filter((p) => p.id !== postId);
      return post;
    }
  );
};

export default route;
