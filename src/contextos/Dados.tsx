'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { pegarTecnicosChamadas, pegarInventario, pegarTecnicos, pegarChamadas, pegarAndamentos } from "@/lib/query";
import { supabase } from '@/lib/supabase';
import { useQueryClient } from "@tanstack/react-query";
import type { DadosContextType } from './tipos-contexto';

const DadosContext = createContext<DadosContextType | null>(null);

function DadosProvider({ children }: { children: React.ReactNode }) {

  const queryClient = useQueryClient();

  const chamadas = pegarChamadas();
  const tecnicos = pegarTecnicos();
  const inventario = pegarInventario();
  const andamentos = pegarAndamentos();
  const tecnicosChamadas = pegarTecnicosChamadas();

  const [usuarios, setUsuarios] = useState<Record<string, string>>({});
  const [numeroUsuarios, setNumeroUsuarios] = useState<number>(0);

  const [impressoras, setImpressoras] = useState<Record<string, number>>({});
  const [impressorasDrivers, setImpressorasDrivers] = useState<Record<string, number>>({});
  const [impressorasStatus, setImpressorasStatus] = useState<Record<string, number>>({});

  const [processadores, setProcessadores] = useState<Record<string, number>>({});

  const [computadoresModelos, setComputadoresModelos] = useState<Record<string, number>>({});
  const [computadoresFabricantes, setComputadoresFabricantes] = useState<Record<string, number>>({});
  const [computadoresSO, setComputadoresSO] = useState<Record<string, number>>({});
  const [computadoresAtivacao, setComputadoresAtivacao] = useState<Record<string, number>>({});
  const [computadoresArquitetura, setComputadoresArquitetura] = useState<Record<string, number>>({});

  const [memoriasTipos, setMemoriasTipos] = useState<Record<string, number>>({});
  const [memoriasVelocidades, setMemoriasVelocidades] = useState<Record<string, number>>({});
  const [memoriasStatus, setMemoriasStatus] = useState<Record<string, number>>({});
  const [memoriasCapacidades, setMemoriasCapacidades] = useState<Record<string, number>>({});

  const [monitores, setMonitores] = useState<Record<string, number>>({});
  const [monitoresStatus, setMonitoresStatus] = useState<Record<string, number>>({});
  const [monitoresFabricantes, setMonitoresFabricantes] = useState<Record<string, number>>({});
  const [monitoresContagem, setMonitoresContagem] = useState<Record<string, number>>({});

  const [placasMaeFabricantes, setPlacasMaeFabricantes] = useState<Record<string, number>>({});
  const [placasMaeModelos, setPlacasMaeModelos] = useState<Record<string, number>>({});
  const [placasMaeStatus, setPlacasMaeStatus] = useState<Record<string, number>>({});

  const [uac, setUac] = useState<Record<string, number>>({});
  const [firewall, setFirewall] = useState<Record<string, number>>({});


  // INVENTARIO
  useEffect(() => {
    if (!inventario.isSuccess) return;

    const dados = inventario.data ?? [];

    setNumeroUsuarios(dados.length || 0);

    // Temporary accumulators
    const tempUsuarios: Record<string, string> = {};
    const tempProcessadores: Record<string, number> = {};
    const tempComputadoresModelos: Record<string, number> = {};
    const tempComputadoresFabricantes: Record<string, number> = {};
    const tempComputadoresSO: Record<string, number> = {};
    const tempComputadoresAtivacao: Record<string, number> = {};
    const tempComputadoresArquitetura: Record<string, number> = {};
    const tempMemoriasTipos: Record<string, number> = {};
    const tempMemoriasStatus: Record<string, number> = {};
    const tempMemoriasVelocidades: Record<string, number> = {};
    const tempMemoriasCapacidades: Record<string, number> = {};
    const tempMonitoresStatus: Record<string, number> = {};
    const tempMonitoresFabricantes: Record<string, number> = {};
    const tempMonitoresContagem: Record<string, number> = {};
    const tempMonitores: Record<string, number> = {};
    const tempPlacasMaeModelos: Record<string, number> = {};
    const tempPlacasMaeFabricantes: Record<string, number> = {};
    const tempPlacasMaeStatus: Record<string, number> = {};
    const tempUac: Record<string, number> = {};
    const tempFirewall: Record<string, number> = {};
    const tempImpressoras: Record<string, number> = {};
    const tempImpressorasDrivers: Record<string, number> = {};
    const tempImpressorasStatus: Record<string, number> = {};

    dados.forEach((registro: any) => {
      const data = registro.data as any;

      // Usuários
      if (registro.hostname) {
        tempUsuarios[registro.hostname] = data?.coleta?.usuario_executando ?? "";
      }

      // Processadores
      const processador = data?.processador?.nome;
      if (processador) {
        tempProcessadores[processador] = (tempProcessadores[processador] ?? 0) + 1;
      }

      // Sistema
      const sistema = data?.sistema;

      if (sistema?.modelo_computador) {
        tempComputadoresModelos[sistema.modelo_computador] =
          (tempComputadoresModelos[sistema.modelo_computador] ?? 0) + 1;
      }

      if (sistema?.fabricante_computador) {
        tempComputadoresFabricantes[sistema.fabricante_computador] =
          (tempComputadoresFabricantes[sistema.fabricante_computador] ?? 0) + 1;
      }

      if (sistema?.nome) {
        tempComputadoresSO[sistema.nome] = (tempComputadoresSO[sistema.nome] ?? 0) + 1;
      }

      if (sistema?.ativacao !== undefined && sistema?.ativacao !== null) {
        const key = String(sistema.ativacao);
        tempComputadoresAtivacao[key] = (tempComputadoresAtivacao[key] ?? 0) + 1;
      }

      if (sistema?.arquitetura) {
        tempComputadoresArquitetura[sistema.arquitetura] =
          (tempComputadoresArquitetura[sistema.arquitetura] ?? 0) + 1;
      }

      // Memória
      const memoria = data?.memoria;

      if (memoria?.tipo) {
        tempMemoriasTipos[memoria.tipo] = (tempMemoriasTipos[memoria.tipo] ?? 0) + 1;
      }

      if (memoria?.status) {
        tempMemoriasStatus[memoria.status] = (tempMemoriasStatus[memoria.status] ?? 0) + 1;
      }

      memoria?.modulos?.forEach((modulo: any) => {
        const velocidade = String(modulo.velocidade_mhz);
        const capacidade = String(modulo.capacidade_gb);

        const velKey = `${velocidade} mhz`;
        tempMemoriasVelocidades[velKey] = (tempMemoriasVelocidades[velKey] ?? 0) + 1;

        const capKey = `${capacidade} GB`;
        tempMemoriasCapacidades[capKey] = (tempMemoriasCapacidades[capKey] ?? 0) + 1;
      });

      // Monitores
      const monitoresDados = data?.monitores;

      if (monitoresDados?.status) {
        tempMonitoresStatus[monitoresDados.status] =
          (tempMonitoresStatus[monitoresDados.status] ?? 0) + 1;
      }

      if (monitoresDados?.fabricante) {
        tempMonitoresFabricantes[monitoresDados.fabricante] =
          (tempMonitoresFabricantes[monitoresDados.fabricante] ?? 0) + 1;
      }

      const quantidadeMonitores = `${data?.monitores_edid?.length ?? 0} monitor(es)`;
      tempMonitoresContagem[quantidadeMonitores] =
        (tempMonitoresContagem[quantidadeMonitores] ?? 0) + 1;

      data?.monitores_edid?.forEach((monitor: any) => {
        if (monitor.nome_amigavel) {
          tempMonitores[monitor.nome_amigavel] =
            (tempMonitores[monitor.nome_amigavel] ?? 0) + 1;
        }
      });

      // Placa-mãe
      const placaMae = data?.placas_mae;

      if (placaMae?.modelo) {
        tempPlacasMaeModelos[placaMae.modelo] =
          (tempPlacasMaeModelos[placaMae.modelo] ?? 0) + 1;
      }

      if (placaMae?.fabricante) {
        tempPlacasMaeFabricantes[placaMae.fabricante] =
          (tempPlacasMaeFabricantes[placaMae.fabricante] ?? 0) + 1;
      }

      if (placaMae?.status) {
        tempPlacasMaeStatus[placaMae.status] =
          (tempPlacasMaeStatus[placaMae.status] ?? 0) + 1;
      }

      // Segurança
      const seguranca = data?.seguranca;
      const uacKey = seguranca?.uac ?? "Não reconhecido";
      tempUac[uacKey] = (tempUac[uacKey] ?? 0) + 1;

      const firewallKey = seguranca?.firewall ?? "Não reconhecido";
      tempFirewall[firewallKey] = (tempFirewall[firewallKey] ?? 0) + 1;

      // Impressoras
      data?.impressoras?.forEach((impressora: any) => {
        if (impressora.nome) {
          tempImpressoras[impressora.nome] = (tempImpressoras[impressora.nome] ?? 0) + 1;
        }
        if (impressora.drivers) {
          tempImpressorasDrivers[impressora.drivers] =
            (tempImpressorasDrivers[impressora.drivers] ?? 0) + 1;
        }
        if (impressora.status) {
          tempImpressorasStatus[impressora.status] =
            (tempImpressorasStatus[impressora.status] ?? 0) + 1;
        }
      });
    });

    setUsuarios(tempUsuarios);
    setProcessadores(tempProcessadores);
    setComputadoresModelos(tempComputadoresModelos);
    setComputadoresFabricantes(tempComputadoresFabricantes);
    setComputadoresSO(tempComputadoresSO);
    setComputadoresAtivacao(tempComputadoresAtivacao);
    setComputadoresArquitetura(tempComputadoresArquitetura);
    setMemoriasTipos(tempMemoriasTipos);
    setMemoriasStatus(tempMemoriasStatus);
    setMemoriasVelocidades(tempMemoriasVelocidades);
    setMemoriasCapacidades(tempMemoriasCapacidades);
    setMonitoresStatus(tempMonitoresStatus);
    setMonitoresFabricantes(tempMonitoresFabricantes);
    setMonitoresContagem(tempMonitoresContagem);
    setMonitores(tempMonitores);
    setPlacasMaeModelos(tempPlacasMaeModelos);
    setPlacasMaeFabricantes(tempPlacasMaeFabricantes);
    setPlacasMaeStatus(tempPlacasMaeStatus);
    setUac(tempUac);
    setFirewall(tempFirewall);
    setImpressoras(tempImpressoras);
    setImpressorasDrivers(tempImpressorasDrivers);
    setImpressorasStatus(tempImpressorasStatus);
  }, [inventario.isSuccess, inventario.data]);

  useEffect(() => {
    const channel = supabase
      .channel("chamadas")

      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "chamadas",
        },
        () => {
          queryClient.invalidateQueries({
            queryKey: ["chamadas"],
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("tecnicos")

      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tecnicos",
        },
        () => {
          queryClient.invalidateQueries({
            queryKey: ["tecnicos"],
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);


  return (
    <DadosContext.Provider
      value={{
        chamadas,
        andamentos,
        tecnicos,
        tecnicosChamadas,
        inventario,
        usuarios,
        numeroUsuarios,
        impressoras,
        impressorasDrivers,
        impressorasStatus,
        processadores,
        computadoresModelos,
        computadoresFabricantes,
        computadoresSO,
        computadoresAtivacao,
        computadoresArquitetura,
        memoriasTipos,
        memoriasVelocidades,
        memoriasStatus,
        memoriasCapacidades,
        monitores,
        monitoresStatus,
        monitoresFabricantes,
        monitoresContagem,
        placasMaeFabricantes,
        placasMaeModelos,
        placasMaeStatus,
        uac,
        firewall,
      }}
    >
      {children}
    </DadosContext.Provider>
  );
}


export function useDados() {
  const context = useContext(DadosContext);
  if (!context) throw new Error('useDados deve ser usado dentro do Header');
  return context;
}

export { DadosProvider };