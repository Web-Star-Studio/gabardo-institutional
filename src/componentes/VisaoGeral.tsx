'use client';

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { useDados } from "@/contextos/Dados";
import { HorizontalBarChart } from "@/componentes/graficos/barras";
import { MultiLineChart } from "@/componentes/graficos/metrica";
import { Cartao } from "@/componentes/graficos/cartao";
import { Calendario } from "@/componentes/ui/Calendario";
import {
  duracaoEmHoras,
  estaNoIntervalo,
  formatarHoras,
  mediaDuracao,
  normalizar,
  type ChamadaComCategoria,
} from "@/componentes/dashboard/utilitarios";
import type { Tables } from "@/lib/tipos";

// ATENÇÃO: ajuste "criado_em" para o nome real da coluna de data de abertura
// da chamada, caso seja diferente no seu schema (ex: "created_at").
const CAMPO_DATA = "criado_em";

export function Metricas() {
  const { chamadas, tecnicos } = useDados();
  const [dataInicio, setDataInicio] = useState<Date | null>(null);
  const [dataFim, setDataFim] = useState<Date | null>(null);
  const [tecnicoSelecionado, setTecnicoSelecionado] = useState<string | null>(null);

  const chamadasNoPeriodo = useMemo(() => {
    const lista = (chamadas.data ?? []) as ChamadaComCategoria[];
    if (!dataInicio && !dataFim) return lista;
    return lista.filter((c) => estaNoIntervalo((c as any)[CAMPO_DATA], dataInicio, dataFim));
  }, [chamadas.data, dataInicio, dataFim]);

  const desempenhoPorTecnico = useMemo(() => {
    const tecnicosLista = (tecnicos.data ?? []) as Tables<"tecnicos">[];

    return tecnicosLista.map((tecnico) => {
      const nomeAlvo = normalizar(tecnico.nome ?? "");
      const chamadasDoTecnico = chamadasNoPeriodo.filter((c) =>
        c.tecnicos?.split(",").some((t) => normalizar(t) === nomeAlvo)
      );

      const fechadas = chamadasDoTecnico.filter((c) => c.status === 1 || c.status === 2);
      const atrasadas = chamadasDoTecnico.filter((c) => c.status === 5);
      const duracaoMedia = mediaDuracao(chamadasDoTecnico.map((c) => duracaoEmHoras(c, CAMPO_DATA)));

      return {
        tecnico,
        total: chamadasDoTecnico.length,
        fechadas: fechadas.length,
        atrasadas: atrasadas.length,
        duracaoMediaHoras: duracaoMedia,
      };
    });
  }, [chamadasNoPeriodo, tecnicos.data]);

  const ordenadoPorVolume = [...desempenhoPorTecnico].sort((a, b) => b.total - a.total);
  const detalheSelecionado = desempenhoPorTecnico.find(
    (d) => d.tecnico.id === tecnicoSelecionado
  );

  const tendenciaSemanal = useMemo(() => {
    if (!detalheSelecionado) return { labels: [] as string[], valores: [] as number[] };
    const nomeAlvo = normalizar(detalheSelecionado.tecnico.nome ?? "");
    const porSemana: Record<string, number> = {};

    chamadasNoPeriodo
      .filter((c) => c.tecnicos?.split(",").some((t) => normalizar(t) === nomeAlvo))
      .forEach((c) => {
        const data = (c as any)[CAMPO_DATA];
        if (!data) return;
        const d = new Date(data);
        if (Number.isNaN(d.getTime())) return;
        const chave = `${d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}`;
        porSemana[chave] = (porSemana[chave] ?? 0) + 1;
      });

    const labels = Object.keys(porSemana);
    return { labels, valores: labels.map((l) => porSemana[l]) };
  }, [detalheSelecionado, chamadasNoPeriodo]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">
          Desempenho por técnico
        </h3>
        <Calendario
          dataInicio={dataInicio}
          dataFim={dataFim}
          aoSelecionar={(inicio, fim) => {
            setDataInicio(inicio);
            setDataFim(fim);
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Cartao titulo="Chamadas no período" valor={chamadasNoPeriodo.length} />
        <Cartao
          titulo="Fechadas no prazo"
          valor={chamadasNoPeriodo.filter((c) => c.status === 2).length}
        />
        <Cartao
          titulo="Atrasadas"
          valor={chamadasNoPeriodo.filter((c) => c.status === 5).length}
        />
        <Cartao titulo="Técnicos avaliados" valor={desempenhoPorTecnico.length} />
      </div>

      <div className="h-96 rounded-2xl border border-slate-200 dark:border-slate-800 p-2">
        <HorizontalBarChart
          title="Volume de chamadas por técnico"
          labels={ordenadoPorVolume.map((d) => d.tecnico.nome ?? "—")}
          series={[{ name: "Chamadas", data: ordenadoPorVolume.map((d) => d.total), color: "#2563EB" }]}
        />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
              <th className="px-4 py-3 text-left font-semibold text-slate-500">Técnico</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-500">Total</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-500">Fechadas</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-500">Atrasadas</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-500">Tempo médio</th>
            </tr>
          </thead>
          <tbody>
            {ordenadoPorVolume.map((linha) => (
              <motion.tr
                key={linha.tecnico.id}
                onClick={() => setTecnicoSelecionado(linha.tecnico.id)}
                animate={{
                  backgroundColor: linha.tecnico.id === tecnicoSelecionado ? "#EFF6FF" : "transparent",
                }}
                className="border-b border-slate-100 dark:border-slate-800/60 last:border-0 cursor-pointer"
              >
                <td className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-200">
                  {linha.tecnico.nome}
                </td>
                <td className="px-4 py-3 text-slate-500">{linha.total}</td>
                <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-medium">
                  {linha.fechadas}
                </td>
                <td className="px-4 py-3 text-red-600 dark:text-red-400 font-medium">
                  {linha.atrasadas}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-slate-500">
                  {formatarHoras(linha.duracaoMediaHoras)}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {detalheSelecionado && (
        <div className="h-80 rounded-2xl border border-slate-200 dark:border-slate-800 p-2">
          <MultiLineChart
            title={`Chamadas fechadas por ${detalheSelecionado.tecnico.nome}`}
            labels={tendenciaSemanal.labels}
            series={[{ name: "Chamadas", data: tendenciaSemanal.valores, color: "#2563EB" }]}
          />
        </div>
      )}
    </div>
  );
}
