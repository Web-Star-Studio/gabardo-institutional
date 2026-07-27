import { motion } from "motion/react";
import {
  rotuloPrioridadeChamada,
  rotuloStatusChamada,
} from "@/lib/rotulos_chamadas";
import { useAndamentos } from "@/lib/query_chamadas";
import { formatarData, formatarTempo } from "../funcoes/formatadores";
import type { DetalhesChamadaProps } from "../props/detalhes-chamada";
import FormularioAndamento from "./FormularioAndamento";
import ListaAndamentos from "./ListaAndamentos";

export default function DetalhesChamada({
  darkMode,
  chamada,
  pausando,
  continuando,
  salvandoAndamento,
  aoPausar,
  aoContinuar,
  aoCriarAndamento,
}: DetalhesChamadaProps) {
  const andamentosQuery = useAndamentos(chamada?.id);

  return (
    <motion.section
      animate={{
        backgroundColor: darkMode ? "#18181b" : "#ffffff",
        borderColor: darkMode ? "#3f3f46" : "#fed7aa",
        color: darkMode ? "#f4f4f5" : "#18181b",
      }}
      className="grid gap-5 rounded-lg border p-4 lg:grid-cols-[minmax(0,1fr)_360px]"
    >
      <div>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="text-lg font-semibold">Detalhes</h2>

          {chamada && (
            <div className="flex flex-wrap gap-2">
              <motion.button
                type="button"
                onClick={() => aoPausar(chamada.id)}
                disabled={!chamada.continuar_contagem || pausando}
                animate={{
                  backgroundColor: darkMode ? "#27272a" : "#fff7ed",
                  borderColor: darkMode ? "#3f3f46" : "#fed7aa",
                  color: darkMode ? "#f4f4f5" : "#18181b",
                  opacity: !chamada.continuar_contagem || pausando ? 0.5 : 1,
                }}
                className="rounded-md border px-3 py-2 text-sm font-semibold disabled:cursor-not-allowed"
              >
                {pausando ? "Pausando" : "Pausar SLA"}
              </motion.button>

              <motion.button
                type="button"
                onClick={() => aoContinuar(chamada.id)}
                disabled={chamada.continuar_contagem || continuando}
                animate={{
                  backgroundColor: "#4f46e5",
                  color: "#ffffff",
                  opacity: chamada.continuar_contagem || continuando ? 0.6 : 1,
                }}
                className="rounded-md px-3 py-2 text-sm font-semibold disabled:cursor-not-allowed"
              >
                {continuando ? "Continuando" : "Continuar SLA"}
              </motion.button>
            </div>
          )}
        </div>

        {chamada ? (
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <div>
              <motion.p
                animate={{ color: darkMode ? "#a1a1aa" : "#6b4634" }}
                className="text-xs font-medium uppercase"
              >
                Titulo
              </motion.p>
              <p className="mt-1 font-medium">{chamada.titulo}</p>
            </div>
            <div>
              <motion.p
                animate={{ color: darkMode ? "#a1a1aa" : "#6b4634" }}
                className="text-xs font-medium uppercase"
              >
                Status
              </motion.p>
              <p className="mt-1">{rotuloStatusChamada(chamada.status)}</p>
            </div>
            <div>
              <motion.p
                animate={{ color: darkMode ? "#a1a1aa" : "#6b4634" }}
                className="text-xs font-medium uppercase"
              >
                Prioridade
              </motion.p>
              <p className="mt-1">{rotuloPrioridadeChamada(chamada.prioridade)}</p>
            </div>
            <div>
              <motion.p
                animate={{ color: darkMode ? "#a1a1aa" : "#6b4634" }}
                className="text-xs font-medium uppercase"
              >
                SLA
              </motion.p>
              <motion.p
                animate={{
                  color: chamada.sla_estourado
                    ? "#dc2626"
                    : chamada.continuar_contagem
                      ? darkMode ? "#5eead4" : "#0f766e"
                      : darkMode ? "#d4d4d8" : "#52525b",
                }}
                className="mt-1 font-semibold"
              >
                {formatarTempo(chamada.segundos_sla)}
              </motion.p>
            </div>
            <div>
              <motion.p
                animate={{ color: darkMode ? "#a1a1aa" : "#6b4634" }}
                className="text-xs font-medium uppercase"
              >
                Criacao
              </motion.p>
              <p className="mt-1">{formatarData(chamada.data_criacao)}</p>
            </div>
            <div>
              <motion.p
                animate={{ color: darkMode ? "#a1a1aa" : "#6b4634" }}
                className="text-xs font-medium uppercase"
              >
                Prazo
              </motion.p>
              <p className="mt-1">{formatarData(chamada.prazo_final)}</p>
            </div>
            <div>
              <motion.p
                animate={{ color: darkMode ? "#a1a1aa" : "#6b4634" }}
                className="text-xs font-medium uppercase"
              >
                Requerente
              </motion.p>
              <p className="mt-1">{chamada.requerentes}</p>
            </div>
            <div>
              <motion.p
                animate={{ color: darkMode ? "#a1a1aa" : "#6b4634" }}
                className="text-xs font-medium uppercase"
              >
                Tecnico
              </motion.p>
              <p className="mt-1">{chamada.tecnicos}</p>
            </div>
            <div className="md:col-span-2 xl:col-span-4">
              <motion.p
                animate={{ color: darkMode ? "#a1a1aa" : "#6b4634" }}
                className="text-xs font-medium uppercase"
              >
                Descricao
              </motion.p>
              <p className="mt-1 whitespace-pre-wrap">
                {chamada.descricao ?? "Sem descricao"}
              </p>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-sm opacity-70">Nenhuma chamada selecionada.</p>
        )}

        <div className="mt-6">
          <h3 className="text-base font-semibold">Comentarios</h3>
          <ListaAndamentos
            darkMode={darkMode}
            andamentos={andamentosQuery.data ?? []}
            carregando={andamentosQuery.isFetching}
            temChamada={Boolean(chamada)}
          />
        </div>
      </div>

      <FormularioAndamento
        darkMode={darkMode}
        idChamada={chamada?.id ?? null}
        salvando={salvandoAndamento}
        aoCriarAndamento={aoCriarAndamento}
      />
    </motion.section>
  );
}
