import type { Chamada } from "@/lib/tipos_chamadas";
import type { ChamadaComSla } from "../tipos/chamada";

export function segundosSla(chamada: Chamada, agora: number) {
  const segundosBase = Math.max(0, chamada.segundos_restantes ?? 0);

  if (!chamada.continuar_contagem || !chamada.contando_desde) {
    return segundosBase;
  }

  const inicio = new Date(chamada.contando_desde).getTime();

  if (!Number.isFinite(inicio)) {
    return segundosBase;
  }

  const segundosPassados = Math.floor((agora - inicio) / 1000);
  return Math.max(0, segundosBase - segundosPassados);
}

export function aplicarSlaNasChamadas(
  chamadas: Chamada[],
  agora: number,
): ChamadaComSla[] {
  return chamadas.map((chamada) => {
    const segundosRestantes = segundosSla(chamada, agora);

    return {
      ...chamada,
      segundos_sla: segundosRestantes,
      sla_estourado: segundosRestantes <= 0,
    };
  });
}
