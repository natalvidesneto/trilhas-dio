import type { PodcastModel } from "../models/podecastModel";
import { podcastSearch } from "../repositories/podcastSearch.js";

export interface PodcastFilters {
    id?: number;
    nome?: string;
    categoria?: string;
}

export async function podcastService(
    filters: PodcastFilters = {}
): Promise<PodcastModel[]> {
    const list = await podcastSearch();
    const { id, nome, categoria } = filters;

    // Busca por ID (prioridade máxima)
    if (id !== undefined) {
        return list.filter((p) => p.id === id);
    }

    // Busca por nome (parcial, case-insensitive)
    if (nome) {
        const termo = nome.toLowerCase();
        return list.filter((p) => p.titulo.toLowerCase().includes(termo));
    }

    // Busca por categoria (parcial, case-insensitive)
    if (categoria) {
        const termo = categoria.toLowerCase();
        return list.filter((p) => p.categoria.toLowerCase().includes(termo));
    }

    return list;
}