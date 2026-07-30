import type { Tables } from "@/lib/tipos";

/**
 * A tabela `chamadas` ganhou a coluna `categoria`. Como o tipo `Tables<'chamadas'>`
 * é gerado a partir do schema do Supabase, estendemos localmente até você
 * regenerar os tipos oficiais (`supabase gen types ...`).
 */
export type ChamadaComCategoria = Tables<"chamadas"> & {
  categoria: string | null;
};

export type StatusChamada = 1 | 2 | 3 | 4 | 5;

export const MAPA_STATUS: Record<
  StatusChamada,
  { texto: string; cor: string; corSuave: string; corSuaveDark: string }
> = {
  1: { texto: "Fechado com atraso", cor: "#F59E0B", corSuave: "#FEF3C7", corSuaveDark: "#78350F" },
  2: { texto: "Fechado", cor: "#10B981", corSuave: "#D1FAE5", corSuaveDark: "#064E3B" },
  3: { texto: "Pausado", cor: "#8B5CF6", corSuave: "#EDE9FE", corSuaveDark: "#4C1D95" },
  4: { texto: "Aberto", cor: "#3B82F6", corSuave: "#DBEAFE", corSuaveDark: "#1E3A8A" },
  5: { texto: "Atrasado", cor: "#EF4444", corSuave: "#FEE2E2", corSuaveDark: "#7F1D1D" },
};

export function textoStatus(status: number | null): string {
  if (status === null) return "Sem status";
  return MAPA_STATUS[status as StatusChamada]?.texto ?? "Sem status";
}

export function corStatus(status: number | null): string {
  if (status === null) return "#6B7280";
  return MAPA_STATUS[status as StatusChamada]?.cor ?? "#6B7280";
}

export function formatarData(valor: string | null | undefined, comHora = false): string {
  if (!valor) return "—";
  const data = new Date(valor);
  if (Number.isNaN(data.getTime())) return "—";
  return data.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    ...(comHora ? { hour: "2-digit", minute: "2-digit" } : {}),
  });
}

/**
 * Duração de uma chamada em horas, do momento de abertura ao de fechamento.
 *
 * ATENÇÃO: ajuste `campoInicio`/`campoFim` para os nomes reais das colunas de
 * data na tabela `chamadas` (o schema enviado não incluía essas colunas).
 * Valores comuns: "criado_em" / "fechado_em", "created_at" / "closed_at".
 */
export function duracaoEmHoras(
  chamada: Record<string, any>,
  campoInicio: string = "criado_em",
  campoFim: string = "fechado_em"
): number | null {
  const inicio = chamada?.[campoInicio];
  const fim = chamada?.[campoFim];
  if (!inicio || !fim) return null;

  const dataInicio = new Date(inicio).getTime();
  const dataFim = new Date(fim).getTime();
  if (Number.isNaN(dataInicio) || Number.isNaN(dataFim) || dataFim < dataInicio) return null;

  return (dataFim - dataInicio) / (1000 * 60 * 60);
}

export function mediaDuracao(valores: (number | null)[]): number | null {
  const validos = valores.filter((v): v is number => v !== null);
  if (validos.length === 0) return null;
  return validos.reduce((a, b) => a + b, 0) / validos.length;
}

export function formatarHoras(horas: number | null): string {
  if (horas === null) return "—";
  if (horas < 24) return `${horas.toFixed(1)}h`;
  return `${(horas / 24).toFixed(1)}d`;
}

/** Normaliza texto para comparações e filtros de busca. */
export function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export function estaNoIntervalo(
  data: string | null | undefined,
  inicio: Date | null,
  fim: Date | null
): boolean {
  if (!data) return false;
  const d = new Date(data).getTime();
  if (Number.isNaN(d)) return false;
  if (inicio && d < inicio.getTime()) return false;
  if (fim && d > fim.getTime()) return false;
  return true;
}
