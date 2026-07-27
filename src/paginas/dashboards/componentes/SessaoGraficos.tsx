import { motion } from "motion/react";
import type { SessaoGraficosProps } from "../props/sessao-graficos";
import GraficoPizza from "./GraficoPizza";

export default function SessaoGraficos({
  titulo,
  graficos,
  darkMode,
}: SessaoGraficosProps) {
  return (
    <motion.section
      animate={{
        color: darkMode ? "#f4f4f5" : "#18181b",
      }}
      className="my-12 space-y-4"
    >
      <motion.h2
        animate={{
          color: darkMode ? "#a5b4fc" : "#4338ca",
        }}
        className="text-lg font-bold uppercase"
      >
        {titulo}
      </motion.h2>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {graficos.map((grafico) => (
          <GraficoPizza
            key={`${titulo}-${grafico.titulo}`}
            titulo={grafico.titulo}
            dados={grafico.dados}
            darkMode={darkMode}
          />
        ))}
      </div>
    </motion.section>
  );
}
