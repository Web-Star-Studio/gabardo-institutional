import { motion } from "motion/react";
import type { CabecalhoChamadasProps } from "../props/cabecalho-chamadas";

export default function CabecalhoChamadas({
  darkMode,
  total,
  emContagem,
  atualizando,
}: CabecalhoChamadasProps) {
  return (
    <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <motion.p
          animate={{
            color: darkMode ? "#a1a1aa" : "#6b4634",
          }}
          className="text-sm font-medium uppercase"
        >
          Assistencia
        </motion.p>
        <motion.h1
          animate={{
            color: darkMode ? "#ffffff" : "#111827",
          }}
          className="mt-1 text-3xl font-bold"
        >
          Chamadas
        </motion.h1>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <motion.div
          animate={{
            backgroundColor: darkMode ? "#18181b" : "#ffffff",
            borderColor: darkMode ? "#3f3f46" : "#fed7aa",
            color: darkMode ? "#f4f4f5" : "#18181b",
          }}
          className="rounded-md border px-4 py-3"
        >
          <motion.p
            animate={{ color: darkMode ? "#a1a1aa" : "#6b4634" }}
            className="text-xs font-medium uppercase"
          >
            Total
          </motion.p>
          <p className="mt-1 text-2xl font-semibold">{total}</p>
        </motion.div>

        <motion.div
          animate={{
            backgroundColor: darkMode ? "#18181b" : "#ffffff",
            borderColor: darkMode ? "#3f3f46" : "#fed7aa",
            color: darkMode ? "#f4f4f5" : "#18181b",
          }}
          className="rounded-md border px-4 py-3"
        >
          <motion.p
            animate={{ color: darkMode ? "#a1a1aa" : "#6b4634" }}
            className="text-xs font-medium uppercase"
          >
            SLA contando
          </motion.p>
          <p className="mt-1 text-2xl font-semibold">{emContagem}</p>
        </motion.div>

        <motion.div
          animate={{
            backgroundColor: darkMode ? "#18181b" : "#ffffff",
            borderColor: darkMode ? "#3f3f46" : "#fed7aa",
            color: darkMode ? "#f4f4f5" : "#18181b",
          }}
          className="rounded-md border px-4 py-3"
        >
          <motion.p
            animate={{ color: darkMode ? "#a1a1aa" : "#6b4634" }}
            className="text-xs font-medium uppercase"
          >
            Dados
          </motion.p>
          <p className="mt-1 text-sm font-semibold">
            {atualizando ? "Atualizando" : "Realtime ativo"}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
