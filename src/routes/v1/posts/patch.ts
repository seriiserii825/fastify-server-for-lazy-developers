import db from "../../../db/index.ts";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { PostSchemas } from "../../../schemas/index.ts";

const route: FastifyPluginAsyncTypebox = async (app) => {
  app.patch(
    "/:postId",
    {
      schema: {
        body: PostSchemas.Bodies.UpdatePost,
        params: PostSchemas.Params.PostId,
        response: {
          200: PostSchemas.Bodies.Post,
        },
      },
    },
    async (request) => {
      const { postId } = request.params;
      const post = db.posts.find((p) => p.id === postId);
      if (!post) {
        throw app.httpErrors.notFound(`Post with id ${postId} not found`);
      }

      const updatedPost = {
        ...post,
        ...request.body,
        id: post.id,
      };
      db.posts = db.posts.map((p) => {
        if (p.id === postId) {
          return updatedPost;
        }
        return p;
      });
      return updatedPost;
    }
  );
};
export default route;
