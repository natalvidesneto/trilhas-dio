import express from "express";
import cors from "cors";
import routes from "./routes";
import { apiKeyMiddleware } from "./middlewares/apiKeyMiddleware";
import {
  errorMiddleware,
  notFoundMiddleware,
} from "./middlewares/errorMiddleware";

const app = express();

app.use(cors());
app.use(express.json());

// Rota pública (health check) — sem API Key
app.get("/", (_req, res) => {
  res.json({
    api: "Bomba Patch 2026",
    status: "online",
    auth: "Envie o header 'x-api-key' para acessar /api",
  });
});

// Todas as rotas /api exigem API Key
app.use("/api", apiKeyMiddleware, routes);

// 404 e tratamento de erros
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;