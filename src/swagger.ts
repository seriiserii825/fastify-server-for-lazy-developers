import type { FastifySwaggerUiOptions } from "@fastify/swagger-ui";
import type { FastifyDynamicSwaggerOptions } from "@fastify/swagger";

export const swaggerOptions: FastifyDynamicSwaggerOptions = {
  openapi: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      description: "API documentation",
      version: "1.0.0",
      contact: {
        name: "API Support",
        email: "support@example.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
      {
        url: "https://api.example.com",
        description: "Production server",
      },
    ],
  },
};

export const swaggerUIOptions: FastifySwaggerUiOptions = {
  routePrefix: "/documentation",
  uiConfig: {
    docExpansion: "list",
    deepLinking: false,
  },
  staticCSP: true,
  transformStaticCSP: (header: string) => header,
};
