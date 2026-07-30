'use client';

import { motion } from "motion/react";
import { useDados } from "@/contextos/Dados";
import { useFiltrosChamadas } from "@/contextos/FiltrosChamadas";
import { useHeader } from "@/contextos/Header";
import { Cartao } from "@/componentes/graficos/cartao";
import { GetDoughnut } from "@/componentes/graficos/Doughnut-helpers";

export function VisaoGeral() {
  const { darkMode } = useHeader();
  const {
    numeroUsuarios,
    tecnicos,
    computadoresSO,
    computadoresFabricantes,
    uac,
    firewall,
  } = useDados();
  const { chamadasEmAndamento, chamadasPorStatus, minhasChamadas } = useFiltrosChamadas();

  const abertas = chamadasEmAndamento?.length ?? 0;
  const atrasadas = chamadasPorStatus["Atrasado"] ?? 0;
  const totalTecnicos = tecnicos.data?.length ?? 0;

  return (
    <div className="flex flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <Cartao titulo="Computadores monitorados" valor={numeroUsuarios} />
        <Cartao titulo="Chamadas em andamento" valor={abertas} />
        <Cartao titulo="Chamadas atrasadas" valor={atrasadas} />
        <Cartao titulo="Técnicos ativos" valor={totalTecnicos} />
      </motion.div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4">
        <div className="h-96 rounded-2xl border border-slate-200 dark:border-slate-800 p-2">
          <GetDoughnut
            titulo="Chamadas por status"
            ladoLegenda="bottom"
            darkMode={darkMode}
            dados={chamadasPorStatus}
          />
        </div>
        <div className="h-96 rounded-2xl border border-slate-200 dark:border-slate-800 p-2">
          <GetDoughnut
            titulo="Sistemas operacionais"
            ladoLegenda="bottom"
            darkMode={darkMode}
            dados={computadoresSO}
          />
        </div>
        <div className="h-96 rounded-2xl border border-slate-200 dark:border-slate-800 p-2">
          <GetDoughnut
            titulo="Fabricantes de máquinas"
            ladoLegenda="bottom"
            darkMode={darkMode}
            dados={computadoresFabricantes}
          />
        </div>
        <div className="h-96 rounded-2xl border border-slate-200 dark:border-slate-800 p-2">
          <GetDoughnut
            titulo="UAC ativo"
            ladoLegenda="bottom"
            darkMode={darkMode}
            dados={uac}
          />
        </div>
      </div>

      <div
        className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5
        flex flex-col gap-2"
      >
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide">
          Suas chamadas
        </h3>
        <p className="text-3xl font-black text-slate-900 dark:text-white">
          {minhasChamadas?.length ?? 0}
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Chamadas abertas por você ou atribuídas ao seu usuário técnico.
        </p>
      </div>
    </div>
  );
}
