import { useEffect, useState } from "react";
import type { Chamada } from "@/lib/tipos_chamadas";
import { segundosSla } from "../funcoes/sla";

export function useContadorSla(chamadas: Chamada[]) {
  const [agora, setAgora] = useState(() => Date.now());

  useEffect(() => {
    const existeChamadaContando = chamadas.some(
      (chamada) =>
        chamada.continuar_contagem &&
        chamada.contando_desde &&
        segundosSla(chamada, Date.now()) > 0,
    );

    if (!existeChamadaContando) {
      setAgora(Date.now());
      return;
    }

    const intervalo = window.setInterval(() => {
      setAgora(Date.now());
    }, 1000);

    return () => window.clearInterval(intervalo);
  }, [chamadas]);

  return agora;
}
