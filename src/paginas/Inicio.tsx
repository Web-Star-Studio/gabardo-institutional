import { Cartao } from '@/componentes/dashboard/cartao';
import { useAutenticacao } from "@/contextos/Autenticacao";
import { useHeader } from "@/contextos/Header";
import { useFiltrosChamadas } from "@/contextos/FiltrosChamadas";
import { useDados } from "@/contextos/Dados";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  SubTitle,
  Colors,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { GetDoughnut } from '@/componentes/dashboard/Doughnut-helpers';
import { motion } from 'motion/react';
import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  SubTitle,
  Colors,
  annotationPlugin
);

export default function GridInicial() {

  const { darkMode } = useHeader();
  const dados = useDados();
  const filtros = useFiltrosChamadas();

  return (
    <motion.section
      animate={{
        backgroundColor: darkMode ? "#000" : "#fff",
      }}
    className="flex flex-col px-50 pt-30 w-full h-full">
      <h2 className="text-3xl font-bold">'teste'</h2>

      <div className="grid grid-cols-1 xl:grid-cols-3 justify-items-center">
        <GetDoughnut 
          titulo="teste"
          ladoLegenda="left"
          darkMode={darkMode}
          dados={dados.monitores}
        />
        <GetDoughnut 
          titulo="teste"
          ladoLegenda="top"
          darkMode={darkMode}
          dados={dados.monitores}
        />
        <GetDoughnut 
          titulo="teste"
          ladoLegenda="right"
          darkMode={darkMode}
          dados={dados.processadores}
        />
        <GetDoughnut 
          titulo="Chamadas por status"
          ladoLegenda="left"
          darkMode={darkMode}
          dados={filtros?.chamadasPorStatus}
        />
        <GetDoughnut 
          titulo="teste"
          ladoLegenda="bottom"
          darkMode={darkMode}
          dados={dados.monitores}
        />
        <GetDoughnut 
          titulo="teste"
          ladoLegenda="right"
          darkMode={darkMode}
          dados={dados.monitores}
        />
        <div className="flex ">
          <Cartao
          titulo="N° computadores"
          valor={dados.numeroUsuarios}
        />
        <Cartao
          titulo="N° monitores"
          valor={Object.values(dados.monitores).reduce((soma, valor) => soma + valor, 0)}
        />
        <Cartao
          titulo="N° Chamadas totais"
          valor={dados.chamadas.data?.length ?? 0}
        />
        <Cartao
          titulo="N° Chamadas em andamento"
          valor={filtros.chamadasEmAndamento?.length ?? 0}
        />
        </div>
      </div>
    </motion.section>
  );
}