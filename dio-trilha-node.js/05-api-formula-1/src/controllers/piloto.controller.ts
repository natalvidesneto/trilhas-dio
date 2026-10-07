import { FastifyReply, FastifyRequest } from "fastify";
import { pilotoService } from "../services/piloto.service";

export const pilotoController = {
  async listarTodos(_request: FastifyRequest, reply: FastifyReply) {
    const pilotos = pilotoService.listarTodos();
    return reply.status(200).send(pilotos);
  },

  async buscarPorId(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    const id = Number(request.params.id);
    const piloto = pilotoService.buscarPorId(id);
    return reply.status(200).send(piloto);
  },

  async buscarPorEquipe(
    request: FastifyRequest<{ Querystring: { equipe: string } }>,
    reply: FastifyReply
  ) {
    const pilotos = pilotoService.buscarPorEquipe(request.query.equipe);
    return reply.status(200).send(pilotos);
  },

  async buscarPorNome(
    request: FastifyRequest<{ Querystring: { nome: string } }>,
    reply: FastifyReply
  ) {
    const pilotos = pilotoService.buscarPorNome(request.query.nome);
    return reply.status(200).send(pilotos);
  },
};