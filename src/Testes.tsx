// pages/Dashboard.tsx ou App.tsx
import { MultiLineChart } from "./componentes/dashboard/metrica";
import { HorizontalBarChart } from "./componentes/dashboard/barras";

export function Teste2() {
  // Dados que vêm de props / API
  const categorias = [
    "São Paulo",
    "Rio de Janeiro",
    "Belo Horizonte",
    "Curitiba",
    "Porto Alegre",
    "Brasília",
  ];

  const series = [
    {
      name: "Vendas 2025",
      data: [420, 380, 290, 210, 180, 150],
      color: "rgba(54, 162, 235, 0.8)",
    },
    {
      name: "Vendas 2026",
      data: [510, 450, 340, 280, 230, 190],
      color: "rgba(75, 192, 192, 0.8)",
    },
  ];

  return (
    <div className="p-6">
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <HorizontalBarChart
          labels={categorias}
          series={series}
          title="Vendas por Cidade"
          height={450}
        />
      </div>
    </div>
  );
}

export default function Teste() {
  // ===== Dados que vêm de props / API =====
  const datas = [
    "01/07", "02/07", "03/07", "04/07", "05/07",
    "06/07", "07/07", "08/07", "09/07", "10/07",
  ];

  const resultados = [
    {
      name: "Vendas Online",
      data: [120, 190, 150, 210, 280, 240, 310, 290, 350, 400],
      color: "#3B82F6",
    },
    {
      name: "Vendas Loja Física",
      data: [80, 110, 95, 140, 160, 180, 170, 200, 220, 250],
      color: "#10B981",
    },
    {
      name: "Marketplace",
      data: [40, 60, 55, 80, 95, 110, 130, 145, 160, 190],
      color: "#F59E0B",
    },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Gráfico de múltiplas linhas */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <MultiLineChart
          labels={datas}
          series={resultados}
          title="Performance por Canal (últimos 10 dias)"
          height={420}
        />
      </div>
      <Teste2 />
    </div>
  );
}