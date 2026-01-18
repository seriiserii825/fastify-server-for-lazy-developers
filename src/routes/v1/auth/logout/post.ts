import { FastifyPluginCallbackTypebox } from "@fastify/type-provider-typebox";
import { LogoutResponse } from "../../../../schemas/users/bodies.ts";

const route: FastifyPluginCallbackTypebox = (app, _, done) => {
  app.post(
    "/",
    {
      onRequest: [app.authenticate],
      schema: {
        response: {
          200: LogoutResponse,
        },
      },
    },
    async (request, reply) => {
      const refreshToken = request.cookies.refreshToken;

      if (refreshToken) {
        await app.prisma.refreshToken.deleteMany({
          where: { token: refreshToken },
        });
      }

      reply.clearCookie("refreshToken", { path: "/" });

      return { message: "Logged out successfully" };
    }
  );

  done();
};

export default route;
