import { ServerResponse } from "http";
import { HttpStatus } from "./httpStatus";

export function sendJson(
    response: ServerResponse,
    status: HttpStatus,
    body: unknown
): void {
    response.writeHead(status, {
        "content-type": "application/json; charset=utf-8",
        "access-control-allow-origin": "*",
        "access-control-allow-headers": "content-type, x-api-key, authorization",
        "access-control-allow-methods": "GET, OPTIONS",
    });
    response.end(JSON.stringify(body));
}