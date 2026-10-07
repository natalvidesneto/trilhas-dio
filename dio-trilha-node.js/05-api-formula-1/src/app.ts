import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import { registerRoutes } from "./routes";
import { HttpError } from "./utils/httpError";

export async function buildApp(): Promise<FastifyInstance> {
  const app = Fastify({ logger: true });

  await app.register(cors, { origin: true });

  app.setErrorHandler((error, _request, reply) => {
    if (error instanceof HttpError) {
      return reply.status(error.statusCode).send({
        statusCode: error.statusCode,
        error: error.name,
        message: error.message,
      });
    }

    app.log.error(error);
    return reply.status(500).send({
      statusCode: 500,
      error: "Internal Server Error",
      message: "Erro interno no servidor",
    });
  });

  await registerRoutes(app);
  return app;
}