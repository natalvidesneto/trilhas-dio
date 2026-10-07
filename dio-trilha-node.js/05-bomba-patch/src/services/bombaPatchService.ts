import { bombaPatchRepository } from "../repositories/bombaPatchRepository";
import { BombaPatch, Jogador } from "../models/jogadorModel";

export const bombaPatchService = {
  obterInfo(): BombaPatch {
    return bombaPatchRepository.getPatch();
  },

  listarJogadores(): Jogador[] {
    return bombaPatchRepository.listarJogadores();
  },

  obterJogadorPorId(id: number): Jogador | undefined {
    return bombaPatchRepository.buscarJogadorPorId(id);
  },

  buscarPorNome(nome: string): Jogador[] {
    return bombaPatchRepository.buscarPorNome(nome);
  },

  buscarPorTime(time: string): Jogador[] {
    return bombaPatchRepository.buscarPorTime(time);
  },

  buscarPorPais(pais: string): Jogador[] {
    return bombaPatchRepository.buscarPorPais(pais);
  },
};