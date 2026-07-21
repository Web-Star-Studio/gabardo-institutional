// components/HorizontalBarChart.tsx
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Registrar os elementos necessários
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// ===== Tipos =====
interface Series {
  name: string;
  data: number[];
  color?: string;
}

interface HorizontalBarChartProps {
  labels: string[];       // categorias (ex: nomes de produtos, cidades, etc)
  series: Series[];       // uma ou várias séries
  title?: string;
  height?: number;
  showLegend?: boolean;
}

export function HorizontalBarChart({
  labels,
  series,
  title = "Gráfico de Barras Horizontal",
  height = 400,
  showLegend = true,
}: HorizontalBarChartProps) {
  const data: ChartData<"bar"> = {
    labels,
    datasets: series.map((s) => ({
      label: s.name,
      data: s.data,
      backgroundColor: s.color || "rgba(54, 162, 235, 0.7)",
      borderColor: s.color || "rgba(54, 162, 235, 1)",
      borderWidth: 1,
      borderRadius: 4, // deixa as barras mais modernas
    })),
  };

  const options: ChartOptions<"bar"> = {
    indexAxis: "y", // ← ISSO deixa a barra horizontal
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    plugins: {
      legend: {
        display: showLegend,
        position: "top" as const,
      },
      title: {
        display: !!title,
        text: title,
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || "";
            const value = context.parsed.x; // no horizontal o valor está no eixo X
            return `${label}: ${value?.toLocaleString("pt-BR")}`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Valor",
        },
      },
      y: {
        title: {
          display: true,
          text: "Categoria",
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height }}>
      <Bar data={data} options={options} />
    </div>
  );
}