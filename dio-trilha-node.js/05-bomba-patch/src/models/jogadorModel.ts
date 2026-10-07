export interface Jogador {
  id: number;
  nome: string;
  time: string;
  pais: string;
}

export interface BombaPatch {
  nome_patch: string;
  versao: string;
  slogan: string;
  jogadores: Jogador[];
}