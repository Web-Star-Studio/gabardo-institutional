import type { Andamento, NovoAndamento } from "@/lib/tipos_chamadas";

export type FormularioAndamentoProps = {
  darkMode: boolean;
  idChamada: string | null;
  salvando: boolean;
  aoCriarAndamento: (andamento: NovoAndamento) => Promise<Andamento>;
};
