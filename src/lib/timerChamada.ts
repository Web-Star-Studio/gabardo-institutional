import { useEffect, useState } from 'react';

type ChamadaTimer = {
  status: number;
  segundos_restantes: number | null;
  continuar_contagem: boolean;
  prazo_final: string | null;
};

function calcularSegundosRestantes(chamada: ChamadaTimer) {
  if (
    chamada.continuar_contagem &&
    chamada.prazo_final
  ) {
    const prazoFinal = new Date(chamada.prazo_final).getTime();

    const restante = Math.floor(
      (prazoFinal - Date.now()) / 1000
    );

    return Math.max(0, restante);
  }

  return chamada.segundos_restantes ?? 0;
}

export default function useTimerChamada(chamada: ChamadaTimer) {
  const [segundos, setSegundos] = useState(() =>
    calcularSegundosRestantes(chamada)
  );

  useEffect(() => {
    const atualizarTimer = () => {
      setSegundos(calcularSegundosRestantes(chamada));
    };

    atualizarTimer();

    if (!chamada.continuar_contagem) {
      return;
    }

    const interval = setInterval(atualizarTimer, 1000);

    return () => clearInterval(interval);
  }, [
    chamada.prazo_final,
    chamada.segundos_restantes,
    chamada.continuar_contagem,
  ]);

  return segundos;
}