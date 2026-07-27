import { motion } from "motion/react";
import type { CartaoResumoProps } from "../props/cartao-resumo";

export default function CartaoResumo({
  darkMode,
  rotulo,
  valor,
}: CartaoResumoProps) {
  return (
    <motion.div
      animate={{
        backgroundColor: darkMode ? "#18181b" : "#ffffff",
        borderColor: darkMode ? "#3f3f46" : "#fed7aa",
        color: darkMode ? "#f4f4f5" : "#18181b",
      }}
      className="rounded-lg border px-4 py-3"
    >
      <motion.p
        animate={{
          color: darkMode ? "#a1a1aa" : "#6b4634",
        }}
        className="text-xs font-medium uppercase"
      >
        {rotulo}
      </motion.p>
      <motion.p
        animate={{
          color: darkMode ? "#ffffff" : "#111827",
        }}
        className="mt-1 text-2xl font-semibold"
      >
        {valor.toLocaleString("pt-BR")}
      </motion.p>
    </motion.div>
  );
}
