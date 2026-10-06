import { IncomingMessage, ServerResponse } from "http";
import { podcastService } from "../services/podcastService";
import { authentication } from "../middlewares/podcastAuthentication";
import { HttpStatus } from "../utils/httpStatus";
import { HttpRoutes } from "../routes/httpRoutes";
import { sendJson } from "../utils/response";

export async function controller(
    request: IncomingMessage,
    response: ServerResponse
): Promise<void> {
    // CORS preflight
    if (request.method === "OPTIONS") {
        sendJson(response, HttpStatus.NoContent, {});
        return;
    }

    // Só aceitamos GET
    if (request.method !== "GET") {
        sendJson(response, HttpStatus.BadRequest, {
            message: "Método não suportado. Use GET.",
        });
        return;
    }

    // Parse da URL
    const url = new URL(request.url ?? "/", `http://${request.headers.host}`);
    const pathname = url.pathname;

    // 🔐 Autenticação (exceto raiz, que serve de health check)
    if (pathname !== HttpRoutes.ROOT && !authentication(request, url)) {
        sendJson(response, HttpStatus.Unauthorized, {
            message: "API Key inválida ou ausente.",
            hint: "Envie via header x-api-key, Authorization: Bearer <key> ou ?api_key=<key>.",
        });
        return;
    }

    try {
        // "/" -> health check
        if (pathname === HttpRoutes.ROOT) {
            sendJson(response, HttpStatus.OK, {
                status: "ok",
                service: "Anime Podcasts API",
                endpoints: [
                    "/",
                    "/list-podcasts",
                    "/podcast?id=<number>",
                    "/podcast?nome=<string>",
                    "/podcast?categoria=<string>",
                ],
            });
            return;
        }

        // "/list-podcasts" -> lista completa
        if (pathname === HttpRoutes.LIST_PODCASTS) {
            const podcasts = await podcastService();
            sendJson(response, HttpStatus.OK, {
                total: podcasts.length,
                data: podcasts,
            });
            return;
        }

        // "/podcast" -> filtros por query string
        if (pathname === HttpRoutes.PODCAST) {
            const idParam = url.searchParams.get("id");
            const nome = url.searchParams.get("nome") ?? undefined;
            const categoria = url.searchParams.get("categoria") ?? undefined;

            let id: number | undefined;
            if (idParam !== null) {
                id = Number(idParam);
                if (Number.isNaN(id)) {
                    sendJson(response, HttpStatus.BadRequest, {
                        message: "Parâmetro 'id' deve ser numérico.",
                    });
                    return;
                }
            }

            if (id === undefined && !nome && !categoria) {
                sendJson(response, HttpStatus.BadRequest, {
                    message:
                        "Informe ao menos um filtro: ?id, ?nome ou ?categoria.",
                });
                return;
            }

            const result = await podcastService({ id, nome, categoria });

            if (result.length === 0) {
                sendJson(response, HttpStatus.NotFound, {
                    message: "Nenhum podcast encontrado com os filtros informados.",
                });
                return;
            }

            // Se busca por id exato, retorna o objeto único
            if (id !== undefined && result.length === 1) {
                sendJson(response, HttpStatus.OK, result[0]);
                return;
            }

            sendJson(response, HttpStatus.OK, {
                total: result.length,
                data: result,
            });
            return;
        }

        // Rota não encontrada
        sendJson(response, HttpStatus.NotFound, {
            message: "Rota não encontrada.",
        });
    } catch (error) {
        console.error("[controller] erro:", error);
        sendJson(response, HttpStatus.InternalServerError, {
            message: "Erro interno do servidor.",
        });
    }
}