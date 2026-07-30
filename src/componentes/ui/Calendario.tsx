'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

interface CalendarioProps {
  dataInicio: Date | null;
  dataFim: Date | null;
  aoSelecionar: (inicio: Date | null, fim: Date | null) => void;
}

const NOMES_MES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];
const DIAS_SEMANA = ["D", "S", "T", "Q", "Q", "S", "S"];

function inicioDia(d: Date) {
  const novo = new Date(d);
  novo.setHours(0, 0, 0, 0);
  return novo;
}
function fimDia(d: Date) {
  const novo = new Date(d);
  novo.setHours(23, 59, 59, 999);
  return novo;
}

const PRESETS = [
  { rotulo: "Últimos 7 dias", dias: 7 },
  { rotulo: "Últimos 30 dias", dias: 30 },
  { rotulo: "Últimos 90 dias", dias: 90 },
];

export function Calendario({ dataInicio, dataFim, aoSelecionar }: CalendarioProps) {
  const [aberto, setAberto] = useState(false);
  const [mesVisivel, setMesVisivel] = useState(() => dataInicio ?? new Date());

  const primeiroDiaDoMes = new Date(mesVisivel.getFullYear(), mesVisivel.getMonth(), 1);
  const deslocamento = primeiroDiaDoMes.getDay();
  const diasNoMes = new Date(mesVisivel.getFullYear(), mesVisivel.getMonth() + 1, 0).getDate();

  const celulas: (Date | null)[] = [
    ...Array(deslocamento).fill(null),
    ...Array.from({ length: diasNoMes }, (_, i) => new Date(mesVisivel.getFullYear(), mesVisivel.getMonth(), i + 1)),
  ];

  const clicarDia = (dia: Date) => {
    if (!dataInicio || (dataInicio && dataFim)) {
      aoSelecionar(inicioDia(dia), null);
      return;
    }
    if (dia < dataInicio) {
      aoSelecionar(inicioDia(dia), fimDia(dataInicio));
      return;
    }
    aoSelecionar(dataInicio, fimDia(dia));
  };

  const noIntervalo = (dia: Date) => {
    if (!dataInicio) return false;
    const limite = dataFim ?? dataInicio;
    return dia >= inicioDia(dataInicio) && dia <= fimDia(limite);
  };

  const rotuloAtual = dataInicio
    ? `${dataInicio.toLocaleDateString("pt-BR")}${dataFim ? ` – ${dataFim.toLocaleDateString("pt-BR")}` : ""}`
    : "Selecionar período";

  return (
    <div className="relative">
      <button
        onClick={() => setAberto((v) => !v)}
        className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800
        bg-white dark:bg-slate-900 px-4 py-2.5 text-sm font-semibold
        text-slate-700 dark:text-slate-200 shadow-sm cursor-pointer"
      >
        <CalendarDays size={16} className="text-blue-600 dark:text-blue-400" />
        {rotuloAtual}
      </button>

      <AnimatePresence>
        {aberto && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute right-0 z-30 mt-2 w-80 rounded-2xl border border-slate-200
            dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-2xl"
          >
            <div className="mb-3 flex flex-wrap gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset.rotulo}
                  onClick={() => {
                    const fim = new Date();
                    const inicio = new Date();
                    inicio.setDate(inicio.getDate() - preset.dias);
                    aoSelecionar(inicioDia(inicio), fimDia(fim));
                    setMesVisivel(inicio);
                  }}
                  className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs
                  font-medium text-slate-600 dark:text-slate-300 cursor-pointer"
                >
                  {preset.rotulo}
                </button>
              ))}
              <button
                onClick={() => aoSelecionar(null, null)}
                className="rounded-full bg-red-50 dark:bg-red-950 px-3 py-1 text-xs
                font-medium text-red-600 dark:text-red-400 cursor-pointer"
              >
                Limpar
              </button>
            </div>

            <div className="mb-2 flex items-center justify-between">
              <button
                onClick={() => setMesVisivel(new Date(mesVisivel.getFullYear(), mesVisivel.getMonth() - 1, 1))}
                className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-sm font-bold text-slate-800 dark:text-white">
                {NOMES_MES[mesVisivel.getMonth()]} {mesVisivel.getFullYear()}
              </span>
              <button
                onClick={() => setMesVisivel(new Date(mesVisivel.getFullYear(), mesVisivel.getMonth() + 1, 1))}
                className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
              {DIAS_SEMANA.map((dia, i) => (
                <span key={i} className="text-[11px] font-semibold text-slate-400 py-1">
                  {dia}
                </span>
              ))}
              {celulas.map((dia, i) => {
                if (!dia) return <span key={i} />;
                const selecionado = noIntervalo(dia);
                const extremo =
                  (dataInicio && inicioDia(dia).getTime() === inicioDia(dataInicio).getTime()) ||
                  (dataFim && inicioDia(dia).getTime() === inicioDia(dataFim).getTime());
                return (
                  <motion.button
                    key={i}
                    onClick={() => clicarDia(dia)}
                    animate={{
                      backgroundColor: extremo ? "#2563EB" : selecionado ? "#DBEAFE" : "transparent",
                      color: extremo ? "#fff" : selecionado ? "#1E3A8A" : undefined,
                    }}
                    className="rounded-lg py-1.5 text-xs font-medium text-slate-600
                    dark:text-slate-300 cursor-pointer"
                  >
                    {dia.getDate()}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
