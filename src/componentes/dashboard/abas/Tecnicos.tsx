'use client';

import { useMemo } from "react";
import { motion } from "motion/react";
import { UserRound } from "lucide-react";
import { useDados } from "@/contextos/Dados";
import { useFiltrosChamadas } from "@/contextos/FiltrosChamadas";
import { useHeader } from "@/contextos/Header";
import { GetDoughnut } from "@/componentes/graficos/Doughnut-helpers";
import { Painel } from "@/componentes/ui/Painel";
import { PilulaStatus } from "@/componentes/ui/Pilula";
import { normalizar, textoStatus, type ChamadaComCategoria } from "@/componentes/dashboard/utilitarios";
import type { Tables } from "@/lib/tipos";

export function Tecnicos() {
  const { darkMode } = useHeader();
  const { tecnicos, chamadas } = useDados();
  const { tecnicoSelecionado, selecionarTecnico, tirarTecnico } = useFiltrosChamadas();

  const chamadasDoTecnico = useMemo(() => {
    if (!tecnicoSelecionado || !chamadas.data) return [];
    const nomeAlvo = normalizar(tecnicoSelecionado.nome ?? "");
    return (chamadas.data as ChamadaComCategoria[]).filter((chamada) =>
      chamada.tecnicos
        ?.split(",")
        .some((tecnico) => normalizar(tecnico) === nomeAlvo)
    );
  }, [tecnicoSelecionado, chamadas.data]);

  const statusPorTecnico = useMemo(() => {
    const contagem: Record<string, number> = {};
    chamadasDoTecnico.forEach((c) => {
      const texto = textoStatus(c.status);
      contagem[texto] = (contagem[texto] ?? 0) + 1;
    });
    return contagem;
  }, [chamadasDoTecnico]);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {(tecnicos.data ?? []).map((tecnico: Tables<"tecnicos">, indice: number) => (
          <motion.button
            key={tecnico.id}
            onClick={() => selecionarTecnico(tecnico.id)}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -3 }}
            className="flex items-center gap-3 rounded-2xl border border-slate-200 dark:border-slate-800
            bg-white dark:bg-slate-900 p-4 text-left shadow-sm cursor-pointer"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950 shrink-0">
              <UserRound size={18} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div className="min-w-0">
              <p className="truncate font-semibold text-slate-800 dark:text-white">{tecnico.nome}</p>
              <p className="truncate text-xs text-slate-400">{tecnico.id}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <Painel
        aberto={!!tecnicoSelecionado}
        aoFechar={tirarTecnico}
        titulo={tecnicoSelecionado?.nome ?? ""}
        subtitulo={`${chamadasDoTecnico.length} chamada(s) atribuída(s)`}
      >
        <div className="flex flex-col gap-6">
          <div className="h-72 rounded-2xl border border-slate-200 dark:border-slate-800 p-2">
            <GetDoughnut
              titulo="Chamadas por status"
              ladoLegenda="bottom"
              darkMode={darkMode}
              dados={statusPorTecnico}
            />
          </div>

          <div className="flex flex-col gap-2">
            {chamadasDoTecnico.map((chamada, i) => (
              <div
                key={chamada.id ?? i}
                className="flex items-center justify-between rounded-xl bg-slate-50 dark:bg-slate-800/50 px-4 py-3"
              >
                <span className="font-mono text-xs text-slate-500">
                  #{String(chamada.id).slice(0, 8)}
                </span>
                <PilulaStatus status={chamada.status} />
              </div>
            ))}
            {chamadasDoTecnico.length === 0 && (
              <p className="text-sm text-slate-400">Nenhuma chamada encontrada para este técnico.</p>
            )}
          </div>
        </div>
      </Painel>
    </div>
  );
}
