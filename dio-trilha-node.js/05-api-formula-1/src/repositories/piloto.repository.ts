import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Piloto } from "../models/piloto.model";

const dataPath = join(__dirname, "..", "data", "data.json");

function carregarPilotos(): Piloto[] {
  const raw = readFileSync(dataPath, "utf-8");
  return JSON.parse(raw) as Piloto[];
}

export const pilotoRepository = {
  findAll(): Piloto[] {
    return carregarPilotos();
  },

  findById(id: number): Piloto | undefined {
    return carregarPilotos().find((p) => p.id === id);
  },

  findByEquipe(equipe: string): Piloto[] {
    return carregarPilotos().filter(
      (p) => p.equipe.toLowerCase() === equipe.toLowerCase()
    );
  },

  findByNome(nome: string): Piloto[] {
    return carregarPilotos().filter((p) =>
      p.nome.toLowerCase().includes(nome.toLowerCase())
    );
  },
};