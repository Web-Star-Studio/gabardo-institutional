'use client';

import { motion } from "motion/react";
import { useHeader } from "@/contextos/Header";

export interface ItemAba {
  id: string;
  rotulo: string;
  icone?: React.ReactNode;
}

interface AbasProps {
  itens: ItemAba[];
  ativa: string;
  aoSelecionar: (id: string) => void;
}

export function Abas({ itens, ativa, aoSelecionar }: AbasProps) {
  const { darkMode } = useHeader();

  return (
    <nav
      className="flex flex-wrap gap-1 rounded-2xl p-1.5 w-fit
      bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
    >
      {itens.map((item) => {
        const selecionada = item.id === ativa;
        return (
          <button
            key={item.id}
            onClick={() => aoSelecionar(item.id)}
            className="relative px-5 py-2.5 rounded-xl text-sm font-semibold
            flex items-center gap-2 cursor-pointer select-none"
          >
            {selecionada && (
              <motion.div
                layoutId="indicador-aba"
                className="absolute inset-0 rounded-xl bg-white dark:bg-blue-600 shadow-md"
                initial={false}
                animate={{ opacity: 1 }}
              />
            )}
            <span
              className={`relative z-10 flex items-center gap-2 ${
                selecionada
                  ? "text-blue-600 dark:text-white"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              {item.icone}
              {item.rotulo}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
