import type { Andamento } from "@/lib/tipos_chamadas";

export type ListaAndamentosProps = {
  darkMode: boolean;
  andamentos: Andamento[];
  carregando: boolean;
  temChamada: boolean;
};
