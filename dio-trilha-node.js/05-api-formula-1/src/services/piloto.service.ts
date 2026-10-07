import { pilotoRepository } from "../repositories/piloto.repository";
import { Piloto } from "../models/piloto.model";
import { HttpError } from "../utils/httpError";

export const pilotoService = {
  listarTodos(): Piloto[] {
    return pilotoRepository.findAll();
  },

  buscarPorId(id: number): Piloto {
    const piloto = pilotoRepository.findById(id);
    if (!piloto) {
      throw new HttpError(404, `Piloto com id ${id} não encontrado`);
    }
    return piloto;
  },

  buscarPorEquipe(equipe: string): Piloto[] {
    const pilotos = pilotoRepository.findByEquipe(equipe);
    if (pilotos.length === 0) {
      throw new HttpError(404, `Nenhum piloto encontrado na equipe ${equipe}`);
    }
    return pilotos;
  },

  buscarPorNome(nome: string): Piloto[] {
    const pilotos = pilotoRepository.findByNome(nome);
    if (pilotos.length === 0) {
      throw new HttpError(404, `Nenhum piloto encontrado com o nome ${nome}`);
    }
    return pilotos;
  },
};