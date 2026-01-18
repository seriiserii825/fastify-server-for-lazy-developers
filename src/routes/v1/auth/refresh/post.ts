import { FastifyPluginCallbackTypebox } from "@fastify/type-provider-typebox";
import { RefreshResponse } from "../../../../schemas/users/bodies.ts";

const route: FastifyPluginCallbackTypebox = (app, _, done) => {
  app.post(
    "/",
    {
      onRequest: [app.authenticate],
      schema: {
        response: {
          200: RefreshResponse,
        },
      },
    },
    async (request) => {
      const refreshToken = request.cookies.refreshToken;

      if (!refreshToken) {
        throw app.httpErrors.unauthorized("Refresh token not found");
      }

      const tokenRecord = await app.prisma.refreshToken.findUnique({
        where: { token: refreshToken },
        include: { user: true },
      });

      if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
        throw app.httpErrors.unauthorized("Invalid or expired refresh token");
      }

      // Создание нового access token
      const accessToken = app.jwt.sign({
        id: tokenRecord.user.id,
        email: tokenRecord.user.email,
      });

      return { accessToken };
    }
  );

  done();
};

export default route;
