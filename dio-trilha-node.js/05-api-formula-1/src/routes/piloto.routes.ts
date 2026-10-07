import { FastifyInstance } from "fastify";
import { pilotoController } from "../controllers/piloto.controller";

export async function pilotoRoutes(app: FastifyInstance) {
  app.get("/pilotos", pilotoController.listarTodos);
  app.get("/pilotos/equipe", pilotoController.buscarPorEquipe);
  app.get("/pilotos/busca", pilotoController.buscarPorNome);
  app.get("/pilotos/:id", pilotoController.buscarPorId);
}