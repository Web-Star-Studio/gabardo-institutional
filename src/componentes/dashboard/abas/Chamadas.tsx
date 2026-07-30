'use client';

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { useDados } from "@/contextos/Dados";
import { useFiltrosChamadas } from "@/contextos/FiltrosChamadas";
import { useHeader } from "@/contextos/Header";
import { GetDoughnut } from "@/componentes/graficos/Doughnut-helpers";
import { HorizontalBarChart } from "@/componentes/graficos/barras";
import { TabelaChamadas } from "@/componentes/dashboard/TabelaChamadas";
import { Painel } from "@/componentes/ui/Painel";
import { PilulaStatus, Pilula } from "@/componentes/ui/Pilula";
import { formatarData, type ChamadaComCategoria } from "@/componentes/dashboard/utilitarios";

export function Chamadas() {
  const { darkMode } = useHeader();
  const { chamadas } = useDados();
  const { chamadasPorStatus } = useFiltrosChamadas();

  const [categoriaAtiva, setCategoriaAtiva] = useState<string | null>(null);
  const [chamadaAberta, setChamadaAberta] = useState<ChamadaComCategoria | null>(null);

  const chamadasComCategoria = (chamadas.data ?? []) as ChamadaComCategoria[];

  const porCategoria = useMemo(() => {
    const contagem: Record<string, number> = {};
    chamadasComCategoria.forEach((c) => {
      const chave = c.categoria ?? "Sem categoria";
      contagem[chave] = (contagem[chave] ?? 0) + 1;
    });
    return contagem;
  }, [chamadasComCategoria]);

  const categorias = Object.keys(porCategoria);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {categorias.map((categoria) => {
          const ativa = categoria === categoriaAtiva;
          return (
            <motion.button
              key={categoria}
              onClick={() => setCategoriaAtiva(ativa ? null : categoria)}
              animate={{
                backgroundColor: ativa ? "#2563EB" : darkMode ? "#1e293b" : "#f1f5f9",
                color: ativa ? "#fff" : darkMode ? "#cbd5e1" : "#475569",
              }}
              className="rounded-full px-4 py-2 text-xs font-semibold cursor-pointer"
            >
              {categoria} · {porCategoria[categoria]}
            </motion.button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="h-80 rounded-2xl border border-slate-200 dark:border-slate-800 p-2">
          <GetDoughnut
            titulo="Chamadas por status"
            ladoLegenda="right"
            darkMode={darkMode}
            dados={chamadasPorStatus}
          />
        </div>
        <div className="h-80 rounded-2xl border border-slate-200 dark:border-slate-800 p-2">
          <HorizontalBarChart
            title="Chamadas por categoria"
            labels={categorias}
            series={[{ name: "Chamadas", data: categorias.map((c) => porCategoria[c]), color: "#2563EB" }]}
          />
        </div>
      </div>

      <TabelaChamadas categoriaAtiva={categoriaAtiva} aoAbrirChamada={setChamadaAberta} />

      <Painel
        aberto={!!chamadaAberta}
        aoFechar={() => setChamadaAberta(null)}
        titulo="Detalhes da chamada"
        subtitulo={chamadaAberta ? `#${String(chamadaAberta.id).slice(0, 8)}` : undefined}
      >
        {chamadaAberta && (
          <div className="flex flex-col gap-4 text-sm">
            <div className="flex flex-wrap gap-2">
              <PilulaStatus status={chamadaAberta.status} />
              <Pilula texto={chamadaAberta.categoria ?? "Sem categoria"} />
            </div>
            <InfoLinha rotulo="Técnico(s)" valor={chamadaAberta.tecnicos} />
            <InfoLinha rotulo="Gerado por" valor={chamadaAberta.gerado_por} />
            <InfoLinha rotulo="Abertura" valor={formatarData((chamadaAberta as any).criado_em, true)} />
          </div>
        )}
      </Painel>
    </div>
  );
}

function InfoLinha({ rotulo, valor }: { rotulo: string; valor: any }) {
  return (
    <div className="flex flex-col gap-1 rounded-xl bg-slate-50 dark:bg-slate-800/50 px-4 py-3">
      <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">{rotulo}</span>
      <span className="font-medium text-slate-700 dark:text-slate-200">{valor ?? "—"}</span>
    </div>
  );
}
