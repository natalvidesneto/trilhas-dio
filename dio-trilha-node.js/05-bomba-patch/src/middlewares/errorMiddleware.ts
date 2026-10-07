import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../utils/httpStatus";

export function notFoundMiddleware(
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  res.status(HttpStatus.NOT_FOUND).json({
    erro: "Rota não encontrada",
    metodo: req.method,
    path: req.originalUrl,
    dica: "Consulte GET /api/bomba-patch para ver as rotas disponíveis.",
  });
}

export function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error("[ERRO]", err);
  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    erro: "Erro interno do servidor",
    mensagem: err.message,
  });
}