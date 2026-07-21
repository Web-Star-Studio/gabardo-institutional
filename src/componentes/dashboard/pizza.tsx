import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

// 1. Registrar os elementos
ChartJS.register(ArcElement, Tooltip, Legend);

// 2. Tipagem forte (opcional mas recomendado)
type PieChartData = ChartData<'pie'>;
type PieChartOptions = ChartOptions<'pie'>;

const data: PieChartData = {
  labels: ['Produto A', 'Produto B', 'Produto C', 'Produto D', 'Outros'],
  datasets: [
    {
      label: 'Vendas 2026',
      data: [420, 310, 280, 190, 95],
      backgroundColor: [
        'rgba(54, 162, 235, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(255, 99, 132, 0.8)',
        'rgba(153, 102, 255, 0.8)',
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 2,
    },
  ],
};

const options: PieChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        padding: 20,
        usePointStyle: true,
      },
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          const label = context.label || '';
          const value = context.raw as number;
          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return `${label}: ${value} (${percentage}%)`;
        },
      },
    },
  },
};

export function PizzaChart() {
  return (
    <div style={{ width: '100%', height: 380 }}>
      <Pie data={data} options={options} />
    </div>
  );
}