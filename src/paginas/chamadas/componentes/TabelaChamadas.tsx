import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  rotuloPrioridadeChamada,
  rotuloStatusChamada,
} from "@/lib/rotulos_chamadas";
import { formatarData, formatarTempo } from "../funcoes/formatadores";
import type { TabelaChamadasProps } from "../props/tabela-chamadas";

const tamanhoPagina = 10;

export default function TabelaChamadas({
  darkMode,
  chamadas,
  chamadaSelecionadaId,
  carregando,
  aoSelecionarChamada,
}: TabelaChamadasProps) {
  const [busca, setBusca] = useState("");
  const [pagina, setPagina] = useState(0);
  const [linhaHover, setLinhaHover] = useState<string | null>(null);

  const chamadasFiltradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    if (!termo) {
      return chamadas;
    }

    return chamadas.filter((chamada) => {
      const texto = [
        chamada.titulo,
        chamada.descricao,
        chamada.requerentes,
        chamada.tecnicos,
        rotuloStatusChamada(chamada.status),
        rotuloPrioridadeChamada(chamada.prioridade),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return texto.includes(termo);
    });
  }, [busca, chamadas]);

  const totalPaginas = Math.max(1, Math.ceil(chamadasFiltradas.length / tamanhoPagina));
  const inicio = pagina * tamanhoPagina;
  const chamadasPagina = chamadasFiltradas.slice(inicio, inicio + tamanhoPagina);

  useEffect(() => {
    if (pagina > totalPaginas - 1) {
      setPagina(totalPaginas - 1);
    }
  }, [pagina, totalPaginas]);

  useEffect(() => {
    setPagina(0);
  }, [busca]);

  return (
    <motion.section
      animate={{
        backgroundColor: darkMode ? "#18181b" : "#ffffff",
        borderColor: darkMode ? "#3f3f46" : "#fed7aa",
        color: darkMode ? "#f4f4f5" : "#18181b",
      }}
      className="overflow-hidden rounded-lg border"
    >
      <div className="flex flex-col gap-3 border-b p-4 md:flex-row md:items-center md:justify-between">
        <motion.input
          value={busca}
          onChange={(evento) => setBusca(evento.target.value)}
          placeholder="Buscar chamada"
          animate={{
            backgroundColor: darkMode ? "#09090b" : "#ffffff",
            borderColor: darkMode ? "#3f3f46" : "#fed7aa",
            color: darkMode ? "#f4f4f5" : "#18181b",
          }}
          className="w-full rounded-md border px-3 py-2 text-sm outline-none"
        />

        <div className="flex items-center gap-2 text-sm">
          <motion.button
            type="button"
            onClick={() => setPagina((atual) => Math.max(0, atual - 1))}
            disabled={pagina === 0}
            animate={{
              backgroundColor: darkMode ? "#27272a" : "#fff7ed",
              borderColor: darkMode ? "#3f3f46" : "#fed7aa",
              color: darkMode ? "#f4f4f5" : "#18181b",
              opacity: pagina === 0 ? 0.45 : 1,
            }}
            className="rounded-md border px-3 py-2 disabled:cursor-not-allowed"
          >
            Anterior
          </motion.button>
          <span className="min-w-20 text-center">
            {pagina + 1} / {totalPaginas}
          </span>
          <motion.button
            type="button"
            onClick={() => setPagina((atual) => Math.min(totalPaginas - 1, atual + 1))}
            disabled={pagina >= totalPaginas - 1}
            animate={{
              backgroundColor: darkMode ? "#27272a" : "#fff7ed",
              borderColor: darkMode ? "#3f3f46" : "#fed7aa",
              color: darkMode ? "#f4f4f5" : "#18181b",
              opacity: pagina >= totalPaginas - 1 ? 0.45 : 1,
            }}
            className="rounded-md border px-3 py-2 disabled:cursor-not-allowed"
          >
            Proxima
          </motion.button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm">
          <motion.thead
            animate={{
              backgroundColor: darkMode ? "#09090b" : "#fff7ed",
              color: darkMode ? "#d4d4d8" : "#431407",
            }}
          >
            <tr>
              <th className="whitespace-nowrap border-b px-4 py-3 text-xs font-semibold uppercase">
                Titulo
              </th>
              <th className="whitespace-nowrap border-b px-4 py-3 text-xs font-semibold uppercase">
                Status
              </th>
              <th className="whitespace-nowrap border-b px-4 py-3 text-xs font-semibold uppercase">
                Prioridade
              </th>
              <th className="whitespace-nowrap border-b px-4 py-3 text-xs font-semibold uppercase">
                Requerente
              </th>
              <th className="whitespace-nowrap border-b px-4 py-3 text-xs font-semibold uppercase">
                Tecnico
              </th>
              <th className="whitespace-nowrap border-b px-4 py-3 text-xs font-semibold uppercase">
                Prazo
              </th>
              <th className="whitespace-nowrap border-b px-4 py-3 text-xs font-semibold uppercase">
                SLA
              </th>
            </tr>
          </motion.thead>
          <tbody>
            {chamadasPagina.map((chamada) => {
              const selecionada = chamada.id === chamadaSelecionadaId;
              const hover = linhaHover === chamada.id;

              return (
                <motion.tr
                  key={chamada.id}
                  onClick={() => aoSelecionarChamada(chamada.id)}
                  onMouseEnter={() => setLinhaHover(chamada.id)}
                  onMouseLeave={() => setLinhaHover(null)}
                  animate={{
                    backgroundColor: selecionada
                      ? darkMode ? "#312e81" : "#e0e7ff"
                      : hover
                        ? darkMode ? "#27272a" : "#fff7ed"
                        : darkMode ? "#18181b" : "#ffffff",
                    borderColor: darkMode ? "#3f3f46" : "#fed7aa",
                    color: darkMode ? "#f4f4f5" : "#18181b",
                  }}
                  className="cursor-pointer border-b"
                >
                  <td className="px-4 py-3 align-top">
                    <p className="min-w-56 font-semibold">{chamada.titulo}</p>
                    <motion.p
                      animate={{ color: darkMode ? "#a1a1aa" : "#6b4634" }}
                      className="mt-1 line-clamp-1 text-xs"
                    >
                      {chamada.descricao ?? "Sem descricao"}
                    </motion.p>
                  </td>
                  <td className="px-4 py-3 align-top">
                    {rotuloStatusChamada(chamada.status)}
                  </td>
                  <td className="px-4 py-3 align-top">
                    {rotuloPrioridadeChamada(chamada.prioridade)}
                  </td>
                  <td className="px-4 py-3 align-top">{chamada.requerentes}</td>
                  <td className="px-4 py-3 align-top">{chamada.tecnicos}</td>
                  <td className="px-4 py-3 align-top">
                    {formatarData(chamada.prazo_final)}
                  </td>
                  <td className="px-4 py-3 align-top">
                    <motion.span
                      animate={{
                        color: chamada.sla_estourado
                          ? "#dc2626"
                          : chamada.continuar_contagem
                            ? darkMode ? "#5eead4" : "#0f766e"
                            : darkMode ? "#d4d4d8" : "#52525b",
                      }}
                      className="font-semibold"
                    >
                      {formatarTempo(chamada.segundos_sla)}
                    </motion.span>
                  </td>
                </motion.tr>
              );
            })}

            {chamadasPagina.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-sm opacity-70"
                >
                  {carregando ? "Carregando chamadas." : "Nenhuma chamada encontrada."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
}
