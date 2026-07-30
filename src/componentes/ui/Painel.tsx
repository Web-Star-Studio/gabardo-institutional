'use client';

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

interface PainelProps {
  aberto: boolean;
  aoFechar: () => void;
  titulo: string;
  subtitulo?: string;
  children: React.ReactNode;
}

export function Painel({ aberto, aoFechar, titulo, subtitulo, children }: PainelProps) {
  return (
    <AnimatePresence>
      {aberto && (
        <>
          <motion.div
            key="fundo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={aoFechar}
            className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm"
          />
          <motion.div
            key="painel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-lg
            overflow-y-auto bg-white dark:bg-slate-900
            border-l border-slate-200 dark:border-slate-800 shadow-2xl"
          >
            <div
              className="sticky top-0 z-10 flex items-start justify-between gap-4
              px-6 py-5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md
              border-b border-slate-200 dark:border-slate-800"
            >
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{titulo}</h2>
                {subtitulo && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                    {subtitulo}
                  </p>
                )}
              </div>
              <button
                onClick={aoFechar}
                className="shrink-0 rounded-full p-2 text-slate-500 hover:text-slate-900
                dark:text-slate-400 dark:hover:text-white
                hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-6">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
