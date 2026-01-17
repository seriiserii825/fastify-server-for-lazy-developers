import { FastifyInstance } from "fastify";
import db from "../../../db/index.ts";
import notFound from "../../../utils/notFound.ts";

export default async function (app: FastifyInstance) {
  app.get<{
    Params: {
      postId: string;
    };
  }>("/:postId", async (request, reply) => {
    const postId = parseInt(request.params.postId, 10);
    const post = db.posts.find((post) => post.id === postId);
    if (!post) {
      return notFound("Post with ${postId} not found", reply);
    }
    return post;
  });

  app.get("/", async () => {
    return db.posts;
  });
}
