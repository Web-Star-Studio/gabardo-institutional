import type { Contagem } from "@/contextos/tipos-contexto";

export function montarEntradasGrafico(dados: Contagem) {
  return Object.entries(dados)
    .filter(([, valor]) => valor > 0)
    .sort((a, b) => b[1] - a[1]);
}
