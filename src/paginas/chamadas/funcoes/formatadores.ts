export function formatarData(data: string | null) {
  if (!data) {
    return "-";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(data));
}

export function formatarTempo(segundos: number) {
  const total = Math.max(0, segundos);
  const horas = Math.floor(total / 3600);
  const minutos = Math.floor((total % 3600) / 60);
  const segundosRestantes = total % 60;

  if (horas > 0) {
    return `${horas}h ${minutos.toString().padStart(2, "0")}min`;
  }

  if (minutos > 0) {
    return `${minutos}min ${segundosRestantes.toString().padStart(2, "0")}s`;
  }

  return `${segundosRestantes}s`;
}
