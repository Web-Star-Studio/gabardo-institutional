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
}

export function GetDoughnut({
  titulo,
  ladoLegenda,
  darkMode,
  dados,
}: GetDoughnutProps){
    const data: ChartData<"doughnut"> = {
        labels: Object.keys(dados ?? {}),
        datasets: [
        {
            label: titulo,
            data: Object.values(dados ?? {}),
            backgroundColor: darkMode ? [
                "#0c5bdc",
                "#da0d0d",
                "#09a973",
                "#dc8d06",
            ] : [
                "#3B82F6",
                "#EF4444",
                "#10B981",
                "#F59E0B",
            ],
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
        color: darkMode ? "white" : "black",
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

        onClick(event, elements) {
            if (!elements.length) return;
            console.log(elements);
            const index = elements[0].index;
            console.log(index);
        },

        plugins: {
            legend: {
                display: true,
                position: ladoLegenda,
                align: "center",
                labels: {
                    color: darkMode ? "white" : "black",
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
                    weight: 'bold'
                    },
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
            display: true,
            text: "Inventory",
            },
        },
    };

    return <DoughnutChart dados={data} opcoes={opcoes} />
}