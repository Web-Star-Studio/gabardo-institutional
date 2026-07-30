'use client';

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Search, ArchiveRestore } from "lucide-react";
import { useDados } from "@/contextos/Dados";
import { useFiltrosChamadas } from "@/contextos/FiltrosChamadas";
import { Paginacao } from "@/componentes/ui/Paginacao";
import { PilulaStatus, Pilula } from "@/componentes/ui/Pilula";
import { formatarData, normalizar, type ChamadaComCategoria } from "@/componentes/dashboard/utilitarios";

const ITENS_POR_PAGINA = 10;

interface TabelaChamadasProps {
  categoriaAtiva: string | null;
  aoAbrirChamada: (chamada: ChamadaComCategoria) => void;
}

export function TabelaChamadas({ categoriaAtiva, aoAbrirChamada }: TabelaChamadasProps) {
  const { chamadas } = useDados();
  const {
    aplicarFiltros,
    removerFiltros,
    incluirAntigas,
    antigasTambem,
    chamadasEmAndamento,
  } = useFiltrosChamadas();

  const [busca, setBusca] = useState("");
  const [pagina, setPagina] = useState(1);

  const baseDados = (incluirAntigas ? chamadas.data : chamadasEmAndamento) as
    | ChamadaComCategoria[]
    | undefined;

  const filtradas = useMemo(() => {
    const lista = baseDados ?? [];
    const buscaNormalizada = normalizar(busca);

    return lista.filter((chamada) => {
      const bateCategoria = !categoriaAtiva || chamada.categoria === categoriaAtiva;
      if (!bateCategoria) return false;
      if (!buscaNormalizada) return true;

      return Object.values(chamada).some((valor) =>
        normalizar(String(valor ?? "")).includes(buscaNormalizada)
      );
    });
  }, [baseDados, busca, categoriaAtiva]);

  const totalPaginas = Math.max(1, Math.ceil(filtradas.length / ITENS_POR_PAGINA));
  const paginaSegura = Math.min(pagina, totalPaginas);
  const visiveis = filtradas.slice(
    (paginaSegura - 1) * ITENS_POR_PAGINA,
    paginaSegura * ITENS_POR_PAGINA
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <div
          className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800
          bg-white dark:bg-slate-900 px-3 py-2 flex-1 min-w-[220px]"
        >
          <Search size={16} className="text-slate-400 shrink-0" />
          <input
            value={busca}
            onChange={(e) => {
              setBusca(e.target.value);
              setPagina(1);
              if (e.target.value.trim()) aplicarFiltros(e.target.value);
              else removerFiltros();
            }}
            placeholder="Buscar por técnico, status, categoria..."
            className="w-full bg-transparent text-sm text-slate-700 dark:text-slate-200
            placeholder:text-slate-400 outline-none"
          />
        </div>

        <button
          onClick={antigasTambem}
          className="flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold cursor-pointer
          border-slate-200 dark:border-slate-800"
        >
          <ArchiveRestore size={14} />
          <motion.span
            animate={{
              color: incluirAntigas ? "#2563EB" : undefined,
            }}
            className="text-slate-600 dark:text-slate-300"
          >
            {incluirAntigas ? "Mostrando todas" : "Incluir antigas"}
          </motion.span>
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
              <th className="px-4 py-3 text-left font-semibold text-slate-500">ID</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-500">Técnico(s)</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-500">Categoria</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-500">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-500">Abertura</th>
            </tr>
          </thead>
          <tbody>
            {visiveis.map((chamada, indice) => (
              <motion.tr
                key={chamada.id ?? indice}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => aoAbrirChamada(chamada)}
                className="border-b border-slate-100 dark:border-slate-800/60 last:border-0
                hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer"
              >
                <td className="px-4 py-3 font-mono text-xs text-slate-500">
                  #{String(chamada.id).slice(0, 8)}
                </td>
                <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-200">
                  {chamada.tecnicos}
                </td>
                <td className="px-4 py-3">
                  <Pilula texto={chamada.categoria ?? "Sem categoria"} />
                </td>
                <td className="px-4 py-3">
                  <PilulaStatus status={chamada.status} />
                </td>
                <td className="px-4 py-3 font-mono text-xs text-slate-500">
                  {formatarData((chamada as any).criado_em)}
                </td>
              </motion.tr>
            ))}

            {visiveis.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-sm text-slate-400">
                  Nenhuma chamada encontrada com esses filtros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Paginacao paginaAtual={paginaSegura} totalPaginas={totalPaginas} aoMudar={setPagina} />
    </div>
  );
}
