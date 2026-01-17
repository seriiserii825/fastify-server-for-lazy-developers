import { FastifyReply } from "fastify";

interface INotFoundResponse {
  statusCode: number;
  error: string;
  message: string;
}

export default function notFound(message: string, reply: FastifyReply): FastifyReply {
  const response = {
    statusCode: 404,
    error: "Not Found",
    message,
  } satisfies INotFoundResponse;

  return reply.status(404).send(response);
}
