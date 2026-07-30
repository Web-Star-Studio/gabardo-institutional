'use client';

import { motion } from "motion/react";
import { useHeader } from "@/contextos/Header";
import { MAPA_STATUS, type StatusChamada } from "@/componentes/dashboard/utilitarios";

export function PilulaStatus({ status }: { status: number | null }) {
  const { darkMode } = useHeader();
  const info = status !== null ? MAPA_STATUS[status as StatusChamada] : null;

  const texto = info?.texto ?? "Sem status";
  const pulsante = status === 5; // Atrasado — chama atenção

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1
      text-xs font-semibold whitespace-nowrap"
    >
      <motion.span
        animate={{
          backgroundColor: info?.cor ?? "#6B7280",
        }}
        className={`h-1.5 w-1.5 rounded-full ${pulsante ? "animate-pulse" : ""}`}
      />
      <motion.span
        animate={{
          color: darkMode ? "#fff" : info?.cor ?? "#374151",
        }}
      >
        {texto}
      </motion.span>
    </span>
  );
}

export function Pilula({ texto, cor }: { texto: string; cor?: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold
      bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200 whitespace-nowrap"
    >
      {cor && <motion.span animate={{ backgroundColor: cor }} className="h-1.5 w-1.5 rounded-full" />}
      {texto}
    </span>
  );
}
