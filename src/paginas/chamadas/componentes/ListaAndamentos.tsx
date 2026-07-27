import { motion } from "motion/react";
import type { ListaAndamentosProps } from "../props/lista-andamentos";

export default function ListaAndamentos({
  darkMode,
  andamentos,
  carregando,
  temChamada,
}: ListaAndamentosProps) {
  return (
    <div className="mt-3 space-y-3">
      {andamentos.map((andamento) => (
        <motion.div
          key={andamento.id}
          animate={{
            backgroundColor: darkMode ? "#09090b" : "#fff7ed",
            borderColor: darkMode ? "#3f3f46" : "#fed7aa",
            color: darkMode ? "#f4f4f5" : "#18181b",
          }}
          className="rounded-md border p-3"
        >
          <motion.div
            animate={{
              color: darkMode ? "#a1a1aa" : "#6b4634",
            }}
            className="flex flex-wrap items-center justify-between gap-2 text-xs"
          >
            <span>{andamento.quem_atualizou}</span>
            <span>Motivo {andamento.motivo}</span>
          </motion.div>
          <p className="mt-2 whitespace-pre-wrap text-sm">
            {andamento.descricao ?? "Sem descricao"}
          </p>
        </motion.div>
      ))}

      {carregando && (
        <p className="text-sm opacity-70">Carregando comentarios.</p>
      )}

      {!carregando && temChamada && andamentos.length === 0 && (
        <p className="text-sm opacity-70">Nenhum comentario nessa chamada.</p>
      )}
    </div>
  );
}
