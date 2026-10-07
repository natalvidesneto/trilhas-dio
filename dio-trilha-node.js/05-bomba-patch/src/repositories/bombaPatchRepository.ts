import fs from "fs";
import path from "path";
import { BombaPatch, Jogador } from "../models/jogadorModel";

const DATA_PATH = path.resolve(__dirname, "..", "data", "bomba-patch.json");

function carregarDados(): BombaPatch {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw) as BombaPatch;
}

export const bombaPatchRepository = {
  getPatch(): BombaPatch {
    return carregarDados();
  },

  listarJogadores(): Jogador[] {
    return carregarDados().jogadores;
  },

  buscarJogadorPorId(id: number): Jogador | undefined {
    return carregarDados().jogadores.find((j) => j.id === id);
  },

  buscarPorNome(nome: string): Jogador[] {
    const termo = nome.toLowerCase();
    return carregarDados().jogadores.filter((j) =>
      j.nome.toLowerCase().includes(termo)
    );
  },

  buscarPorTime(time: string): Jogador[] {
    const termo = time.toLowerCase();
    return carregarDados().jogadores.filter((j) =>
      j.time.toLowerCase().includes(termo)
    );
  },

  buscarPorPais(pais: string): Jogador[] {
    const termo = pais.toLowerCase();
    return carregarDados().jogadores.filter((j) =>
      j.pais.toLowerCase().includes(termo)
    );
  },
};