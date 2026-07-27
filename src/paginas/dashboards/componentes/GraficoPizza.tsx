import { useMemo } from "react";
import { motion } from "motion/react";
import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { montarEntradasGrafico } from "../funcoes/graficos";
import type { GraficoPizzaProps } from "../props/grafico-pizza";

ChartJS.register(ArcElement, Tooltip, Legend);

const paleta = [
  "rgba(45, 212, 191, 0.82)",
  "rgba(99, 102, 241, 0.82)",
  "rgba(245, 158, 11, 0.82)",
  "rgba(244, 63, 94, 0.82)",
  "rgba(34, 197, 94, 0.82)",
  "rgba(14, 165, 233, 0.82)",
  "rgba(168, 85, 247, 0.82)",
  "rgba(249, 115, 22, 0.82)",
  "rgba(100, 116, 139, 0.82)",
];

const bordas = [
  "rgba(20, 184, 166, 1)",
  "rgba(79, 70, 229, 1)",
  "rgba(217, 119, 6, 1)",
  "rgba(225, 29, 72, 1)",
  "rgba(22, 163, 74, 1)",
  "rgba(2, 132, 199, 1)",
  "rgba(147, 51, 234, 1)",
  "rgba(234, 88, 12, 1)",
  "rgba(71, 85, 105, 1)",
];

export default function GraficoPizza({
  titulo,
  dados,
  darkMode,
}: GraficoPizzaProps) {
  const entradas = useMemo(() => montarEntradasGrafico(dados), [dados]);
  const dadosGrafico = useMemo(() => {
    const temDados = entradas.length > 0;
    const labels = temDados ? entradas.map(([label]) => label) : ["Sem dados"];
    const valores = temDados ? entradas.map(([, valor]) => valor) : [1];
    const total = temDados
      ? valores.reduce((soma, valor) => soma + valor, 0)
      : 0;

    return {
      labels,
      temDados,
      total,
      valores,
    };
  }, [entradas]);

  const chartData = useMemo<ChartData<"pie">>(
    () => ({
      labels: dadosGrafico.labels,
      datasets: [
        {
          data: dadosGrafico.valores,
          backgroundColor: dadosGrafico.temDados
            ? dadosGrafico.valores.map((_, indice) => paleta[indice % paleta.length])
            : ["rgba(148, 163, 184, 0.28)"],
          borderColor: dadosGrafico.temDados
            ? dadosGrafico.valores.map((_, indice) => bordas[indice % bordas.length])
            : [darkMode ? "rgba(82, 82, 91, 1)" : "rgba(203, 213, 225, 1)"],
          borderWidth: 2,
        },
      ],
    }),
    [darkMode, dadosGrafico],
  );

  const options = useMemo<ChartOptions<"pie">>(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: darkMode ? "#f4f4f5" : "#18181b",
            padding: 14,
            usePointStyle: true,
          },
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              if (!dadosGrafico.temDados) {
                return "Sem dados";
              }

              const valor = Number(context.raw ?? 0);
              const percentual = dadosGrafico.total > 0
                ? ((valor / dadosGrafico.total) * 100).toFixed(1)
                : "0.0";
              return `${valor} (${percentual}%)`;
            },
          },
        },
      },
    }),
    [darkMode, dadosGrafico],
  );

  return (
    <motion.section
      animate={{
        backgroundColor: darkMode ? "#18181b" : "#ffffff",
        borderColor: darkMode ? "#3f3f46" : "#fed7aa",
        color: darkMode ? "#f4f4f5" : "#18181b",
      }}
      className="rounded-lg border p-4"
    >
      <motion.h3
        animate={{
          color: darkMode ? "#f4f4f5" : "#18181b",
        }}
        className="mb-3 text-base font-semibold"
      >
        {titulo}
      </motion.h3>

      <div className="h-72">
        <Pie data={chartData} options={options} />
      </div>
    </motion.section>
  );
}
