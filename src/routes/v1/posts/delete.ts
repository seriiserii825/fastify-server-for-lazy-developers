import { FastifyInstance } from "fastify";
import db from "../../../db/index.ts";
import notFound from "../../../utils/notFound.ts";

export default async function (app: FastifyInstance) {
  app.delete<{ Params: { postId: string } }>("/:postId", async (request, reply) => {
    const postId = parseInt(request.params.postId, 10);
    const post = db.posts.find((p) => p.id === postId);
    if (!post) {
      return notFound(`Post with id ${postId} not found`, reply);
    }
    db.posts = db.posts.filter((p) => p.id !== postId);
    return post;
  });
}

