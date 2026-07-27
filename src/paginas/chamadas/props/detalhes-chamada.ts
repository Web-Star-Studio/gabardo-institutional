import type { Andamento, NovoAndamento } from "@/lib/tipos_chamadas";
import type { ChamadaComSla } from "../tipos/chamada";

export type DetalhesChamadaProps = {
  darkMode: boolean;
  chamada: ChamadaComSla | null;
  pausando: boolean;
  continuando: boolean;
  salvandoAndamento: boolean;
  aoPausar: (id: string) => Promise<void>;
  aoContinuar: (id: string) => Promise<void>;
  aoCriarAndamento: (andamento: NovoAndamento) => Promise<Andamento>;
};
