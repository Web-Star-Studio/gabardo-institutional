import type { ChamadaComSla } from "../tipos/chamada";

export type TabelaChamadasProps = {
  darkMode: boolean;
  chamadas: ChamadaComSla[];
  chamadaSelecionadaId: string | null;
  carregando: boolean;
  aoSelecionarChamada: (id: string) => void;
};
