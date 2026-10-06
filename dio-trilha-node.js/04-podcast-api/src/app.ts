import type { IncomingMessage, ServerResponse } from "http";
import { controller } from "./controllers/podcastController";

export const app = async (
    request: IncomingMessage,
    response: ServerResponse
): Promise<void> => {
    await controller(request, response);
};