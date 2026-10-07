import { Request, Response, NextFunction } from "express";
import { env } from "../config/env";
import { HttpStatus } from "../utils/httpStatus";

export function apiKeyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const apiKey = req.header("x-api-key");

  if (!apiKey) {
    res.status(HttpStatus.UNAUTHORIZED).json({
      erro: "API Key ausente",
      mensagem: "Envie o cabeçalho 'x-api-key' na requisição.",
    });
    return;
  }

  if (apiKey !== env.apiKey) {
    res.status(HttpStatus.FORBIDDEN).json({
      erro: "API Key inválida",
      mensagem: "A chave fornecida não tem permissão de acesso.",
    });
    return;
  }

  next();
}