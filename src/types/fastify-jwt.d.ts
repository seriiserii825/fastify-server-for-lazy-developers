import "@fastify/jwt";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      id: number; // Или string, если используете UUID
      email: string;
    };
  }
}
