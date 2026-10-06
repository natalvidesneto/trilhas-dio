import { IncomingMessage } from "http";
import { API_KEY } from "../config/podcastConfig";

/**
 * Valida a API Key em:
 *  - Header `x-api-key`
 *  - Header `Authorization: Bearer <key>`
 *  - Query param `?api_key=<key>`
 */
export function authentication(request: IncomingMessage, url: URL): boolean {
    // 1) x-api-key
    const headerKey = request.headers["x-api-key"];
    if (typeof headerKey === "string" && headerKey === API_KEY) return true;

    // 2) Authorization: Bearer <key>
    const auth = request.headers["authorization"];
    if (typeof auth === "string" && auth.startsWith("Bearer ")) {
        const token = auth.slice(7).trim();
        if (token === API_KEY) return true;
    }

    // 3) Query param
    const queryKey = url.searchParams.get("api_key");
    if (queryKey && queryKey === API_KEY) return true;

    return false;
}