import type { Chamada } from "@/lib/tipos_chamadas";

export type ChamadaComSla = Chamada & {
  segundos_sla: number;
  sla_estourado: boolean;
};
