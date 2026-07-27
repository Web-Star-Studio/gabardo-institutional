import type { Contagem } from "@/contextos/tipos-contexto";

export type GraficoConfig = {
  titulo: string;
  dados: Contagem;
};

export type SessaoConfig = {
  titulo: string;
  graficos: GraficoConfig[];
};
