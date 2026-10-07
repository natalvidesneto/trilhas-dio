import { FastifyReply, FastifyRequest } from "fastify";
import { env } from "../config/env";

export async function apiKeyMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const apiKeyHeader = request.headers["x-api-key"];
  const authHeader = request.headers["authorization"];
  const apiKeyQuery = (request.query as Record<string, string>)?.api_key;

  let chaveRecebida: string | undefined;

  if (typeof apiKeyHeader === "string") {
    chaveRecebida = apiKeyHeader;
  } else if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
    chaveRecebida = authHeader.slice(7).trim();
  } else if (typeof apiKeyQuery === "string") {
    chaveRecebida = apiKeyQuery;
  }

  if (!chaveRecebida || chaveRecebida !== env.API_KEY) {
    return reply.status(401).send({
      statusCode: 401,
      error: "Unauthorized",
      message: "API Key inválida ou ausente.",
    });
  }
}