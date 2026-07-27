import type { Chamada } from "./tipos_chamadas";

export const statusChamadas: Record<number, string> = {
  1: "Aberta",
  2: "Em atendimento",
  3: "Pausada",
  4: "Finalizada",
};

export const prioridadesChamadas: Record<number, string> = {
  1: "Baixa",
  2: "Media",
  3: "Alta",
  4: "Critica",
};

export function rotuloStatusChamada(status: Chamada["status"]) {
  if (status === null || status === undefined) {
    return "Nao informado";
  }

  return statusChamadas[status] ?? `Status ${status}`;
}

export function rotuloPrioridadeChamada(prioridade: Chamada["prioridade"]) {
  if (prioridade === null || prioridade === undefined) {
    return "Nao informada";
  }

  return prioridadesChamadas[prioridade] ?? `Prioridade ${prioridade}`;
}
