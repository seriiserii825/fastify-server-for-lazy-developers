import db from "../../../db/index.ts";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { PostSchemas } from "../../../schemas/index.ts";

const route: FastifyPluginAsyncTypebox = async (app) => {
  app.post(
    "/",
    {
      schema: {
        body: PostSchemas.Bodies.CreatePost,
        response: {
          201: PostSchemas.Bodies.Post,
        },
      },
    },
    async (request, reply) => {
      const { title, content } = request.body;
      const post = {
        id: db.posts.length + 1,
        title,
        content,
      };
      db.posts.push(post);

      reply.status(201);
      return post;
    }
  );
};

export default route;

