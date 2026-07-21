// components/MultiLineChart.tsx
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Registrar o que vamos usar
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// ===== Tipos =====
interface Series {
  name: string;           // nome da linha (ex: "Produto A")
  data: number[];         // valores do eixo Y
  color?: string;         // cor opcional
}

interface MultiLineChartProps {
  labels: string[];       // datas formatadas (ex: ["01/07", "02/07", ...])
  series: Series[];       // várias linhas
  title?: string;
  height?: number;
}

export function MultiLineChart({
  labels,
  series,
  title = "Resultados",
  height = 400,
}: MultiLineChartProps) {
  const data: ChartData<"line"> = {
    labels,
    datasets: series.map((s) => ({
      label: s.name,
      data: s.data,
      borderColor: s.color || undefined,
      backgroundColor: s.color ? s.color + "33" : undefined, // transparência
      tension: 0.3,          // deixa a linha mais suave
      fill: false,
      pointRadius: 4,
      pointHoverRadius: 6,
    })),
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: !!title,
        text: title,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || "";
            const value = context.parsed.y;
            return `${label}: ${value?.toLocaleString("pt-BR")}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Data",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Valor",
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height }}>
      <Line data={data} options={options} />
    </div>
  );
}