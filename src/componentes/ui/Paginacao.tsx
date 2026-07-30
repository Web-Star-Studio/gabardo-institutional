'use client';

import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginacaoProps {
  paginaAtual: number;
  totalPaginas: number;
  aoMudar: (pagina: number) => void;
}

export function Paginacao({ paginaAtual, totalPaginas, aoMudar }: PaginacaoProps) {
  if (totalPaginas <= 1) return null;

  const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPaginas || Math.abs(p - paginaAtual) <= 1
  );

  return (
    <div className="flex items-center justify-between gap-3 px-1">
      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
        Página {paginaAtual} de {totalPaginas}
      </span>
      <div className="flex items-center gap-1">
        <button
          disabled={paginaAtual === 1}
          onClick={() => aoMudar(paginaAtual - 1)}
          className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800
          disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronLeft size={16} />
        </button>

        {paginas.map((pagina, indice) => {
          const anterior = paginas[indice - 1];
          const pulou = anterior && pagina - anterior > 1;
          return (
            <div key={pagina} className="flex items-center gap-1">
              {pulou && <span className="px-1 text-slate-400 text-xs">…</span>}
              <motion.button
                onClick={() => aoMudar(pagina)}
                animate={{
                  backgroundColor: pagina === paginaAtual ? "#2563EB" : "transparent",
                  color: pagina === paginaAtual ? "#fff" : undefined,
                }}
                className="h-8 w-8 rounded-lg text-xs font-semibold text-slate-600
                dark:text-slate-300 cursor-pointer"
              >
                {pagina}
              </motion.button>
            </div>
          );
        })}

        <button
          disabled={paginaAtual === totalPaginas}
          onClick={() => aoMudar(paginaAtual + 1)}
          className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800
          disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
