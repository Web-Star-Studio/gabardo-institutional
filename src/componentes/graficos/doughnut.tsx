import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  annotationPlugin
);

interface DoughnutChartProps {
  dados: ChartData<"doughnut">;
  opcoes?: ChartOptions<"doughnut">;
  width?: number;
  height?: number;
}

export function DoughnutChart({
  dados,
  opcoes,
  width = 500,
  height = 500,
}: DoughnutChartProps) {
  return (
    <div style={{ width, height }}>
      <Doughnut
        data={dados}
        options={opcoes}
      />
    </div>
  );
}