"use client";

import { Pie, PieChart, Tooltip, type TooltipIndex } from 'recharts';
import { useHeader } from '@/contextos/Header';
import { useFiltrosChamadas } from '@/contextos/FiltrosChamadas';
import { useDados } from '@/contextos/Dados';




export default function TwoLevelPieChart({
  isAnimationActive,
  defaultIndex,
}: {
  isAnimationActive?: boolean;
  defaultIndex?: TooltipIndex;
}) {

  const { darkMode } = useHeader();
  const chamadas = useFiltrosChamadas();
  const dados = useDados();

  return (
    <PieChart
      style={{ width: '100%', height: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1 }}
      responsive
    >
      <Pie
        data={data01}
        dataKey="value"
        cx="50%"
        cy="50%"
        outerRadius="50%"
        fill="#8884d8"
        isAnimationActive={isAnimationActive}
      />
      <Pie
        data={data02}
        dataKey="value"
        cx="50%"
        cy="50%"
        innerRadius="60%"
        outerRadius="80%"
        fill="#82ca9d"
        label
        isAnimationActive={isAnimationActive}
      />
      <Tooltip defaultIndex={defaultIndex} />
    </PieChart>
  );
}

export function ChamadasPorTecnico({
  isAnimationActive,
  defaultIndex,
}: {
  isAnimationActive?: boolean;
  defaultIndex?: TooltipIndex;
}) {

  const { darkMode } = useHeader();
  const chamadas = useFiltrosChamadas();
  const dados = useDados();

  const [atrasadas, setAtrasadas] = useState<Record<string, number> | null>(null);
  

  const dados = []

  return (
    <PieChart
      style={{ width: '100%', height: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1 }}
      responsive
    >
      <Pie
        data={data01}
        dataKey="value"
        cx="50%"
        cy="50%"
        outerRadius="50%"
        fill="#8884d8"
        isAnimationActive={isAnimationActive}
      />
      <Pie
        data={data02}
        dataKey="value"
        cx="50%"
        cy="50%"
        innerRadius="60%"
        outerRadius="80%"
        fill="#82ca9d"
        label
        isAnimationActive={isAnimationActive}
      />
      <Tooltip defaultIndex={defaultIndex} />
    </PieChart>
  );
}