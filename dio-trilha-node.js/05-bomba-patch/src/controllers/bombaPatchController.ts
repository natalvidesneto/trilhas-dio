import { Request, Response } from "express";
import { bombaPatchService } from "../services/bombaPatchService";
import { HttpStatus } from "../utils/httpStatus";

export const bombaPatchController = {
  info(req: Request, res: Response): void {
    const info = bombaPatchService.obterInfo();
    res.status(HttpStatus.OK).json({
      nome_patch: info.nome_patch,
      versao: info.versao,
      slogan: info.slogan,
      total_jogadores: info.jogadores.length,
    });
  },

  listarJogadores(req: Request, res: Response): void {
    const { nome, time, pais } = req.query;

    let jogadores = bombaPatchService.listarJogadores();

    if (typeof nome === "string" && nome.trim()) {
      jogadores = bombaPatchService.buscarPorNome(nome);
    } else if (typeof time === "string" && time.trim()) {
      jogadores = bombaPatchService.buscarPorTime(time);
    } else if (typeof pais === "string" && pais.trim()) {
      jogadores = bombaPatchService.buscarPorPais(pais);
    }

    res.status(HttpStatus.OK).json({
      total: jogadores.length,
      jogadores,
    });
  },

  obterJogadorPorId(req: Request, res: Response): void {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      res.status(HttpStatus.BAD_REQUEST).json({
        erro: "ID inválido",
        mensagem: "O parâmetro 'id' deve ser um número.",
      });
      return;
    }

    const jogador = bombaPatchService.obterJogadorPorId(id);

    if (!jogador) {
      res.status(HttpStatus.NOT_FOUND).json({
        erro: "Jogador não encontrado",
        mensagem: `Nenhum jogador com o id ${id}.`,
      });
      return;
    }

    res.status(HttpStatus.OK).json(jogador);
  },
};