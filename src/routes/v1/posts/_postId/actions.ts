import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { PostSchemas } from "../../../../schemas/index.ts";
import db from "../../../../db/index.ts";

const route: FastifyPluginAsyncTypebox = async (app) => {
  app.get(
    "/",
    {
      schema: {
        params: PostSchemas.Params.PostId,
        response: {
          200: PostSchemas.Bodies.Post,
        },
      },
    },
    async (request) => {
      const { postId } = request.params;
      const post = db.posts.find((post) => post.id === postId);
      if (!post) {
        throw app.httpErrors.notFound(`Post with ${postId} not found`);
      }
      return post;
    }
  );

  app.delete(
    "/",
    {
      schema: {
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
        throw app.httpErrors.notFound(`Post with ${postId} not found`);
      }
      db.posts = db.posts.filter((p) => p.id !== postId);
      return post;
    }
  );

  app.patch(
    "/",
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

      const post = await app.prisma.post.create({
        data: {
          title,
          content,
        },
      });

      reply.status(201);
      return post;
    }
  );
};
export default route;
