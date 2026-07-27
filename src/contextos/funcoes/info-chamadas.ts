import { rotuloPrioridadeChamada, rotuloStatusChamada } from "@/lib/rotulos_chamadas";
import type { Chamada } from "@/lib/tipos_chamadas";
import type { Contagem, InfoChamadas } from "../tipos-contexto";

function contar(destino: Contagem, valor: string) {
  destino[valor] = (destino[valor] ?? 0) + 1;
}

export function montarInfoChamadas(chamadas: Chamada[]): InfoChamadas {
  const chamadasPorStatus: Contagem = {};
  const chamadasPorPrioridade: Contagem = {};
  const chamadasPorTecnico: Contagem = {};
  let chamadasEmContagem = 0;

  chamadas.forEach((chamada) => {
    contar(chamadasPorStatus, rotuloStatusChamada(chamada.status));
    contar(chamadasPorPrioridade, rotuloPrioridadeChamada(chamada.prioridade));
    contar(chamadasPorTecnico, chamada.tecnicos || "Nao informado");

    if (chamada.continuar_contagem) {
      chamadasEmContagem += 1;
    }
  });

  return {
    chamadasPorStatus,
    chamadasPorPrioridade,
    chamadasPorTecnico,
    chamadasEmContagem,
  };
}
