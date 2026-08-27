import { useState, useEffect } from 'react';

type ChamadaParaTimer = {
    segundos_restantes: number | null;
    continuar_contagem: boolean;
    prazo_final?: string | null;
};

export default function useTimerFormatado(linha: ChamadaParaTimer) {
    const [tempoRestante, setTempoRestante] = useState(linha.segundos_restantes || 0);

    useEffect(() => {
        if (!linha.continuar_contagem) {
            setTempoRestante(linha.segundos_restantes || 0);
            return;
        }

        const calcularTempo = () => {
            if (linha.prazo_final) {
                const agora = new Date().getTime();
                const prazo = new Date(linha.prazo_final).getTime();
                const diferencaSegundos = Math.floor((prazo - agora) / 1000);
                
                setTempoRestante(Math.max(0, diferencaSegundos));
            } else {
                // Fallback: se não tiver prazo_final, diminui 1 por segundo da memória
                setTempoRestante((prev) => Math.max(0, prev - 1));
            }
        };

        calcularTempo();

        const intervalo = setInterval(calcularTempo, 1000);

        return () => clearInterval(intervalo);
    }, [linha.continuar_contagem, linha.prazo_final, linha.segundos_restantes]);

    const horas = Math.floor(tempoRestante / 3600);
    const minutos = Math.floor((tempoRestante % 3600) / 60);
    const segundos = Math.floor(tempoRestante % 60);

    return `${horas.toString().padStart(2, "0")}:${minutos
        .toString()
        .padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
}