import db from "../../../db/index.ts";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { CommonSchemas } from "../../../schemas/commons/CommonSchemas.ts";
import { PostSchemas } from "../../../schemas/index.ts";

const route: FastifyPluginAsyncTypebox = async (app) => {
  app.get(
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
      const post = db.posts.find((post) => post.id === postId);
      if (!post) {
        return reply.notFound("Post with ${postId} not found");
      }
      return post;
    }
  );

  app.get(
    "/",
    {
      schema: {
        querystring: CommonSchemas.Queries.Pagination,
        response: {
          200: PostSchemas.Bodies.PostsPaginated,
        },
      },
    },
    async () => {
      return {
        items: db.posts,
        total: db.posts.length,
        page: 1,
        pageSize: db.posts.length,
      };
    }
  );
};
export default route;
