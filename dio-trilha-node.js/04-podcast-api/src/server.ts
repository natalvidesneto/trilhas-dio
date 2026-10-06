import * as http from "http";
import { app } from "./app";
import "dotenv/config";
import { PORT } from "./config/podcastConfig";

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
});