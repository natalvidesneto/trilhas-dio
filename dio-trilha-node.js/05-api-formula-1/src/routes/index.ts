import { FastifyInstance } from "fastify";
import { pilotoRoutes } from "./piloto.routes";
import { apiKeyMiddleware } from "../middlewares/apiKey.middleware";

export async function registerRoutes(app: FastifyInstance) {
  app.get("/health", async () => ({ status: "ok", api: "F1 2026" }));

  // Todas as rotas de pilotos exigem API Key
  app.register(
    async (scoped) => {
      scoped.addHook("onRequest", apiKeyMiddleware);
      await pilotoRoutes(scoped);
    },
    { prefix: "/api/v1" }
  );
}