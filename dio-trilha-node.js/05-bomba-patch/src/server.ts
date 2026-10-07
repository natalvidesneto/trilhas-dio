import app from "./app";
import { env } from "./config/env";

app.listen(env.port, () => {
  console.log(`⚽ Bomba Patch 2026 API rodando em http://localhost:${env.port}`);
  console.log(`🔐 API Key configurada: ${env.apiKey}`);
});