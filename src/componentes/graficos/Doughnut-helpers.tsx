import type {
  ChartData,
  ChartOptions,
} from "chart.js";

import { DoughnutChart } from "./doughnut";
import { type DoughnutLabelOptions } from 'chartjs-plugin-annotation';

interface GetDoughnutProps {
  titulo: string;
  ladoLegenda: "bottom" | "left" | "right" | "top";
  darkMode: boolean;
  dados: Record<string, number>;
  /** Chamado quando o usuário clica em uma fatia — habilita drill-down. */
  aoClicarSegmento?: (rotulo: string, valor: number) => void;
  /** Rótulo atualmente em destaque (ex: filtro ativo), para realçar a fatia. */
  rotuloAtivo?: string | null;
}

export function GetDoughnut({
  titulo,
  ladoLegenda,
  darkMode,
  dados,
  aoClicarSegmento,
  rotuloAtivo = null,
}: GetDoughnutProps){
    const rotulos = Object.keys(dados ?? {});
    const paletaClara = ["#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6", "#06B6D4", "#EC4899", "#84CC16"];
    const paletaEscura = ["#0c5bdc", "#da0d0d", "#09a973", "#dc8d06", "#7c3aed", "#0891b2", "#db2777", "#65a30d"];
    const paleta = darkMode ? paletaEscura : paletaClara;

    const data: ChartData<"doughnut"> = {
        labels: rotulos,
        datasets: [
        {
            label: titulo,
            data: Object.values(dados ?? {}),
            backgroundColor: rotulos.map((rotulo, indice) => {
              const cor = paleta[indice % paleta.length];
              if (!rotuloAtivo) return cor;
              return rotulo === rotuloAtivo ? cor : `${cor}33`;
            }),
            borderColor: "#00000011",
            borderWidth: 2,
            hoverOffset: 20,
        },
        ],
    };
    const opcoes: ChartOptions<"doughnut"> = {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: 20,
        },
        color: darkMode ? "#fff" : "#000",
        animation: {
            duration: 2000,
            easing: "easeOutQuart",
            animateRotate: true,
            animateScale: true,
        },
        interaction: {
            mode: "nearest",
            intersect: true,
        },
        elements: {
            arc: {
                borderWidth: 2,
                borderColor: "#002afb49",
                hoverBorderWidth: 5,
            },
        },
        onHover: (event, elements) => {
          const alvo = event.native?.target as HTMLElement | undefined;
          if (alvo) alvo.style.cursor = elements.length && aoClicarSegmento ? "pointer" : "default";
        },

        onClick(event, elements) {
            if (!elements.length || !aoClicarSegmento) return;
            const indice = elements[0].index;
            const rotulo = rotulos[indice];
            const valor = Object.values(dados ?? {})[indice];
            aoClicarSegmento(rotulo, valor);
        },

        plugins: {
            legend: {
                display: true,
                position: ladoLegenda,
                align: "center",
                labels: {
                    color: darkMode ? "#fff" : "#000",
                    padding: 24,
                    usePointStyle: true,
                    pointStyle: "circle",
                    font: {
                        size: 18,
                        weight: "bold",
                    },
                },
            },
            annotation: {
                annotations: {
                centerText: {
                    type: "doughnutLabel",
                    content: Object.values(dados ?? {}).reduce((a, b) => a + b, 0).toString(),
                    font: {
                    size: 20,
                    weight: 'bold',
                    },
                    color: darkMode ? "#fff" : "#000",
                } as DoughnutLabelOptions
            },
            },
            tooltip: {
            enabled: true,
            backgroundColor: "#222",

            callbacks: {
                label(context) {
                    return `${context.label}: ${context.raw}`;
                },
            },
            },

            title: {
                color: darkMode ? "#fff" : "#000",
                display: true,
                text: titulo,
                font: {
                    size: 26,
                },
            },
        },
    };

    return <DoughnutChart dados={data} opcoes={opcoes} />
}
