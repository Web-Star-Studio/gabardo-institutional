'use client';

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Monitor, Search } from "lucide-react";
import { useDados } from "@/contextos/Dados";
import { useHeader } from "@/contextos/Header";
import { GetDoughnut } from "@/componentes/graficos/Doughnut-helpers";
import { Painel } from "@/componentes/ui/Painel";
import { Abas } from "@/componentes/ui/Abas";
import { normalizar } from "@/componentes/dashboard/utilitarios";

const SECOES = [
  { id: "computadores", rotulo: "Computadores" },
  { id: "memoria", rotulo: "Memória" },
  { id: "monitores", rotulo: "Monitores" },
  { id: "placas", rotulo: "Placas-mãe" },
  { id: "impressoras", rotulo: "Impressoras" },
  { id: "seguranca", rotulo: "Segurança" },
];

export function Inventario() {
  const { darkMode } = useHeader();
  const {
    inventario,
    usuarios,
    computadoresSO,
    computadoresFabricantes,
    computadoresArquitetura,
    computadoresAtivacao,
    memoriasTipos,
    memoriasVelocidades,
    memoriasStatus,
    memoriasCapacidades,
    monitoresStatus,
    monitoresFabricantes,
    monitoresContagem,
    placasMaeFabricantes,
    placasMaeModelos,
    placasMaeStatus,
    impressoras,
    impressorasDrivers,
    impressorasStatus,
    uac,
    firewall,
  } = useDados();

  const [secaoAtiva, setSecaoAtiva] = useState("computadores");
  const [busca, setBusca] = useState("");
  const [filtroDrilldown, setFiltroDrilldown] = useState<string | null>(null);
  const [registroAberto, setRegistroAberto] = useState<any>(null);

  const registros = (inventario.data as any[]) ?? [];

  const filtrados = useMemo(() => {
    const buscaN = normalizar(busca);
    return registros.filter((registro) => {
      const dados = registro.data ?? {};
      if (filtroDrilldown) {
        const valores = [
          dados?.sistema?.nome,
          dados?.sistema?.fabricante_computador,
          dados?.sistema?.arquitetura,
          String(dados?.sistema?.ativacao),
        ];
        if (!valores.some((v) => v === filtroDrilldown)) return false;
      }
      if (!buscaN) return true;
      return normalizar(String(registro.hostname ?? "")).includes(buscaN);
    });
  }, [registros, busca, filtroDrilldown]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Abas itens={SECOES} ativa={secaoAtiva} aoSelecionar={setSecaoAtiva} />
        <div
          className="flex items-center gap-2 rounded-xl border border-slate-200
          dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 w-64"
        >
          <Search size={16} className="text-slate-400 shrink-0" />
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar hostname..."
            className="w-full bg-transparent text-sm outline-none text-slate-700 dark:text-slate-200"
          />
        </div>
      </div>

      {filtroDrilldown && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setFiltroDrilldown(null)}
          className="w-fit rounded-full bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white cursor-pointer"
        >
          Filtro: {filtroDrilldown} · limpar ✕
        </motion.button>
      )}

      {secaoAtiva === "computadores" && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4">
          <div className="h-80 rounded-2xl border border-slate-200 dark:border-slate-800 p-2 xl:col-span-2">
            <GetDoughnut
              titulo="Sistemas operacionais"
              ladoLegenda="right"
              darkMode={darkMode}
              dados={computadoresSO}
              rotuloAtivo={filtroDrilldown}
              aoClicarSegmento={(rotulo) => setFiltroDrilldown(rotulo)}
            />
          </div>
          <div className="h-80 rounded-2xl border border-slate-200 dark:border-slate-800 p-2">
            <GetDoughnut
              titulo="Fabricantes"
              ladoLegenda="bottom"
              darkMode={darkMode}
              dados={computadoresFabricantes}
              rotuloAtivo={filtroDrilldown}
              aoClicarSegmento={(rotulo) => setFiltroDrilldown(rotulo)}
            />
          </div>
          <div className="h-80 rounded-2xl border border-slate-200 dark:border-slate-800 p-2">
            <GetDoughnut
              titulo="Arquitetura"
              ladoLegenda="bottom"
              darkMode={darkMode}
              dados={computadoresArquitetura}
              rotuloAtivo={filtroDrilldown}
              aoClicarSegmento={(rotulo) => setFiltroDrilldown(rotulo)}
            />
          </div>
          <div className="h-80 rounded-2xl border border-slate-200 dark:border-slate-800 p-2 xl:col-span-4">
            <GetDoughnut
              titulo="Status de ativação"
              ladoLegenda="right"
              darkMode={darkMode}
              dados={computadoresAtivacao}
              rotuloAtivo={filtroDrilldown}
              aoClicarSegmento={(rotulo) => setFiltroDrilldown(rotulo)}
            />
          </div>
        </div>
      )}

      {secaoAtiva === "memoria" && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="h-80 rounded-2xl border border-slate-200 dark:border-slate-800 p-2">
            <GetDoughnut titulo="Tipos de memória" ladoLegenda="right" darkMode={darkMode} dados={memoriasTipos} />
          </div>
          <div className="h-80 rounded-2xl border border-slate-200 dark:border-slate-800 p-2">
            <GetDoughnut titulo="Velocidades" ladoLegenda="right" darkMode={darkMode} dados={memoriasVelocidades} />
          </div>
          <div className="h-80 rounded-2xl border border-slate-200 dark:border-slate-800 p-2">
            <GetDoughnut titulo="Status" ladoLegenda="right" darkMode={darkMode} dados={memoriasStatus} />
          </div>
          <div className="h-80 rounded-2xl border border-slate-200 dark:border-slate-800 p-2">
            <GetDoughnut titulo="Capacidades" ladoLegenda="right" darkMode={darkMode} dados={memoriasCapacidades} />
          </div>
        </div>
      )}

      {secaoAtiva === "monitores" && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="h-80 rounded-2xl border border-slate-200 dark:border-slate-800 p-2">
            <GetDoughnut titulo="Status" ladoLegenda="bottom" darkMode={darkMode} dados={monitoresStatus} />
          </div>
          <div className="h-80 rounded-2xl border border-slate-200 dark:border-slate-800 p-2">
            <GetDoughnut titulo="Fabricantes" ladoLegenda="bottom" darkMode={darkMode} dados={monitoresFabricantes} />
          </div>
          <div className="h-80 rounded-2xl border border-slate-200 dark:border-slate-800 p-2">
            <GetDoughnut titulo="Monitores por máquina" ladoLegenda="bottom" darkMode={darkMode} dados={monitoresContagem} />
          </div>
        </div>
      )}

      {secaoAtiva === "placas" && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="h-80 rounded-2xl border border-slate-200 dark:border-slate-800 p-2">
            <GetDoughnut titulo="Fabricantes" ladoLegenda="bottom" darkMode={darkMode} dados={placasMaeFabricantes} />
          </div>
          <div className="h-80 rounded-2xl border border-slate-200 dark:border-slate-800 p-2">
            <GetDoughnut titulo="Modelos" ladoLegenda="bottom" darkMode={darkMode} dados={placasMaeModelos} />
          </div>
          <div className="h-80 rounded-2xl border border-slate-200 dark:border-slate-800 p-2">
            <GetDoughnut titulo="Status" ladoLegenda="bottom" darkMode={darkMode} dados={placasMaeStatus} />
          </div>
        </div>
      )}

      {secaoAtiva === "impressoras" && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="h-80 rounded-2xl border border-slate-200 dark:border-slate-800 p-2">
            <GetDoughnut titulo="Modelos" ladoLegenda="bottom" darkMode={darkMode} dados={impressoras} />
          </div>
          <div className="h-80 rounded-2xl border border-slate-200 dark:border-slate-800 p-2">
            <GetDoughnut titulo="Drivers" ladoLegenda="bottom" darkMode={darkMode} dados={impressorasDrivers} />
          </div>
          <div className="h-80 rounded-2xl border border-slate-200 dark:border-slate-800 p-2">
            <GetDoughnut titulo="Status" ladoLegenda="bottom" darkMode={darkMode} dados={impressorasStatus} />
          </div>
        </div>
      )}

      {secaoAtiva === "seguranca" && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="h-80 rounded-2xl border border-slate-200 dark:border-slate-800 p-2">
            <GetDoughnut titulo="UAC" ladoLegenda="bottom" darkMode={darkMode} dados={uac} />
          </div>
          <div className="h-80 rounded-2xl border border-slate-200 dark:border-slate-800 p-2">
            <GetDoughnut titulo="Firewall" ladoLegenda="bottom" darkMode={darkMode} dados={firewall} />
          </div>
        </div>
      )}

      <div>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
          Máquinas ({filtrados.length})
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtrados.map((registro, indice) => {
            const dados = registro.data ?? {};
            return (
              <motion.button
                key={registro.id ?? indice}
                onClick={() => setRegistroAberto(registro)}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -3 }}
                className="flex flex-col gap-2 rounded-2xl border border-slate-200 dark:border-slate-800
                bg-white dark:bg-slate-900 p-4 text-left shadow-sm cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Monitor size={16} className="text-blue-600 dark:text-blue-400" />
                  <span className="font-mono text-sm font-semibold text-slate-800 dark:text-white truncate">
                    {registro.hostname}
                  </span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {usuarios[registro.hostname] || "Sem usuário"}
                </span>
                <span className="text-xs font-medium text-slate-400">
                  {dados?.sistema?.nome ?? "SO desconhecido"}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <Painel
        aberto={!!registroAberto}
        aoFechar={() => setRegistroAberto(null)}
        titulo={registroAberto?.hostname ?? ""}
        subtitulo={usuarios[registroAberto?.hostname] || undefined}
      >
        {registroAberto && <DetalheMaquina registro={registroAberto} />}
      </Painel>
    </div>
  );
}

function DetalheMaquina({ registro }: { registro: any }) {
  const dados = registro.data ?? {};
  const sistema = dados.sistema ?? {};
  const processador = dados.processador ?? {};
  const memoria = dados.memoria ?? {};
  const placaMae = dados.placas_mae ?? {};
  const seguranca = dados.seguranca ?? {};
  const monitoresEdid = dados.monitores_edid ?? [];
  const impressoras = dados.impressoras ?? [];

  return (
    <div className="flex flex-col gap-6 text-sm">
      <Secao titulo="Sistema">
        <Grade>
          <Campo rotulo="SO" valor={sistema.nome} />
          <Campo rotulo="Arquitetura" valor={sistema.arquitetura} />
          <Campo rotulo="Fabricante" valor={sistema.fabricante_computador} />
          <Campo rotulo="Modelo" valor={sistema.modelo_computador} />
          <Campo rotulo="Ativação" valor={sistema.ativacao} />
        </Grade>
      </Secao>

      <Secao titulo="Processador">
        <Grade>
          <Campo rotulo="Nome" valor={processador.nome} />
        </Grade>
      </Secao>

      <Secao titulo="Memória">
        <Grade>
          <Campo rotulo="Tipo" valor={memoria.tipo} />
          <Campo rotulo="Status" valor={memoria.status} />
        </Grade>
        {memoria.modulos?.length > 0 && (
          <div className="mt-3 flex flex-col gap-2">
            {memoria.modulos.map((modulo: any, i: number) => (
              <div key={i} className="flex justify-between rounded-lg bg-slate-50 dark:bg-slate-800/50 px-3 py-2 text-xs">
                <span>{modulo.capacidade_gb} GB</span>
                <span>{modulo.velocidade_mhz} MHz</span>
              </div>
            ))}
          </div>
        )}
      </Secao>

      <Secao titulo="Placa-mãe">
        <Grade>
          <Campo rotulo="Fabricante" valor={placaMae.fabricante} />
          <Campo rotulo="Modelo" valor={placaMae.modelo} />
          <Campo rotulo="Status" valor={placaMae.status} />
        </Grade>
      </Secao>

      <Secao titulo={`Monitores (${monitoresEdid.length})`}>
        <div className="flex flex-col gap-2">
          {monitoresEdid.map((monitor: any, i: number) => (
            <div key={i} className="rounded-lg bg-slate-50 dark:bg-slate-800/50 px-3 py-2 text-xs">
              {monitor.nome_amigavel ?? "Monitor sem nome"}
            </div>
          ))}
          {monitoresEdid.length === 0 && <p className="text-xs text-slate-400">Nenhum monitor detectado.</p>}
        </div>
      </Secao>

      <Secao titulo="Segurança">
        <Grade>
          <Campo rotulo="UAC" valor={seguranca.uac} />
          <Campo rotulo="Firewall" valor={seguranca.firewall} />
        </Grade>
      </Secao>

      <Secao titulo={`Impressoras (${impressoras.length})`}>
        <div className="flex flex-col gap-2">
          {impressoras.map((imp: any, i: number) => (
            <div key={i} className="flex justify-between rounded-lg bg-slate-50 dark:bg-slate-800/50 px-3 py-2 text-xs">
              <span>{imp.nome}</span>
              <span className="text-slate-400">{imp.status}</span>
            </div>
          ))}
          {impressoras.length === 0 && <p className="text-xs text-slate-400">Nenhuma impressora detectada.</p>}
        </div>
      </Secao>
    </div>
  );
}

function Secao({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">{titulo}</h4>
      {children}
    </div>
  );
}
function Grade({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-2">{children}</div>;
}
function Campo({ rotulo, valor }: { rotulo: string; valor: any }) {
  return (
    <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 px-3 py-2">
      <p className="text-[10px] font-semibold uppercase text-slate-400">{rotulo}</p>
      <p className="font-medium text-slate-700 dark:text-slate-200 truncate">{valor ?? "—"}</p>
    </div>
  );
}
