import bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import { FastifyPluginCallbackTypebox } from "@fastify/type-provider-typebox";
import { UserSchemas } from "../../../../schemas/index.ts";

const route: FastifyPluginCallbackTypebox = (app, _, done) => {
  app.post(
    "/",
    {
      schema: {
        body: UserSchemas.Bodies.LoginBody,
        response: {
          200: UserSchemas.Bodies.LoginResponse,
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body;

      const user = await app.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw app.httpErrors.unauthorized("Invalid credentials");
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw app.httpErrors.unauthorized("Invalid credentials");
      }

      // Удаляем старые refresh токены этого пользователя (опционально)
      await app.prisma.refreshToken.deleteMany({
        where: {
          userId: user.id,
        },
      });

      // Создание access token
      const accessToken = app.jwt.sign({
        id: user.id,
        email: user.email,
      });

      // Создание refresh token
      const refreshToken = randomBytes(64).toString("hex");
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // 7 дней

      await app.prisma.refreshToken.create({
        data: {
          token: refreshToken,
          userId: user.id,
          expiresAt,
        },
      });

      // Установка refresh token в httpOnly cookie
      reply.setCookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
        path: "/",
      });

      return {
        accessToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString(),
        },
      };
    }
  );

  done();
};

export default route;
