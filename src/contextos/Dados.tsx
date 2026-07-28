'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import  { pegarInventario, pegarTecnicos, pegarChamadas } from "@/lib/query";
import { supabase } from '@/lib/supabase';
import { useQueryClient } from "@tanstack/react-query";
import type { DadosContextType } from './tipos-contexto';

const DadosContext = createContext<DadosContextType | null>(null);

function DadosProvider({ children }: { children: React.ReactNode }) {

  const queryClient = useQueryClient();

  const chamadas = pegarChamadas();
  const tecnicos = pegarTecnicos();
  const inventario = pegarInventario();
  const dados = inventario.data as any;


  const [ usuarios, setUsuarios ] = useState<Record<string, string>>({});
  const [ numeroUsuarios, setNumeroUsuarios ] = useState<number>(0);

  const [ impressoras, setImpressoras] = useState<Record<string, number>>({});
  const [ impressorasDrivers, setImpressorasDrivers ] = useState<Record<string, number>>({});
  const [ impressorasStatus, setImpressorasStatus ] = useState<Record<string, number>>({});
  
  const [ processadores, setProcessadores] = useState<Record<string, number>>({});
  
  const [ computadoresModelos, setComputadoresModelos ] = useState<Record<string, number>>({});
  const [ computadoresFabricantes, setComputadoresFabricantes ] = useState<Record<string, number>>({});
  const [ computadoresSO, setComputadoresSO ] = useState<Record<string, number>>({});
  const [ computadoresAtivacao, setComputadoresAtivacao ] = useState<Record<string, number>>({});
  const [ computadoresArquitetura, setComputadoresArquitetura] = useState<Record<string, number>>({});

  const [ memoriasTipos, setMemoriasTipos ] = useState<Record<string, number>>({});
  const [ memoriasVelocidades, setMemoriasVelocidades ] = useState<Record<string, number>>({});
  const [ memoriasStatus, setMemoriasStatus ] = useState<Record<string, number>>({});
  const [ memoriasCapacidades, setMemoriasCapacidades ] = useState<Record<string, number>>({});

  const [ monitores, setMonitores ] = useState<Record<string, number>>({});
  const [ monitoresStatus, setMonitoresStatus ] = useState<Record<string, number>>({});
  const [ monitoresFabricantes, setMonitoresFabricantes ] = useState<Record<string, number>>({});
  const [ monitoresContagem, setMonitoresContagem ] = useState<Record<string, number>>({});

  const [ placasMaeFabricantes, setPlacasMaeFabricantes ] = useState<Record<string, number>>({});
  const [ placasMaeModelos, setPlacasMaeModelos ] = useState<Record<string, number>>({});
  const [ placasMaeStatus, setPlacasMaeStatus ] = useState<Record<string, number>>({});
  
  const [ uac, setUac ] = useState<Record<string, number>>({});
  const [ firewall, setFirewall ] = useState<Record<string, number>>({});


  useEffect(() => {
    if (!inventario.isSuccess) return;

    setNumeroUsuarios(dados.length || 0);

    dados?.forEach((registro: any) => {
      const data = registro.data as any;

      if (registro.hostname) {
        setUsuarios((anterior) => ({
          ...anterior,
          [registro.hostname]: data?.coleta?.usuario_executando ?? "",        }));
      }

      const processador = data?.processador?.nome;
      if (processador) {
        setProcessadores((anterior) => ({
          ...anterior,
          [processador]: (anterior[processador] ?? 0) + 1,
        }));
      }

      const sistema = data?.sistema;

      if (sistema?.modelo_computador) {
        setComputadoresModelos((anterior) => ({
          ...anterior,
          [sistema.modelo_computador]: (anterior[sistema.modelo_computador] ?? 0) + 1,
        }));
      }

      if (sistema?.fabricante_computador) {
        setComputadoresFabricantes((anterior) => ({
          ...anterior,
          [sistema.fabricante_computador]: (anterior[sistema.fabricante_computador] ?? 0) + 1,
        }));
      }

      if (sistema?.nome) {
        setComputadoresSO((anterior) => ({
          ...anterior,
          [sistema.nome]: (anterior[sistema.nome] ?? 0) + 1,
        }));
      }

      if (sistema?.ativacao) {
        setComputadoresAtivacao((anterior) => ({
          ...anterior,
          [String(sistema.ativacao)]: (anterior[String(sistema.ativacao)] ?? 0) + 1,
        }));
      }

      if (sistema?.arquitetura) {
        setComputadoresArquitetura((anterior) => ({
          ...anterior,
          [sistema.arquitetura]: (anterior[sistema.arquitetura] ?? 0) + 1,
        }));
      }

      // Memória principal
      const memoria = data?.memoria;

      if (memoria?.tipo) {
        setMemoriasTipos((anterior) => ({
          ...anterior,
          [memoria.tipo]: (anterior[memoria.tipo] ?? 0) + 1,
        }));
      }

      if (memoria?.status) {
        setMemoriasStatus((anterior) => ({
          ...anterior,
          [memoria.status]: (anterior[memoria.status] ?? 0) + 1,
        }));
      }

      memoria?.modulos?.forEach((modulo: any) => {
        const velocidade = String(modulo.velocidade_mhz);
        const capacidade = String(modulo.capacidade_gb);

        setMemoriasVelocidades((anterior) => ({
          ...anterior,
          [String(velocidade) + " mhz"]: (anterior[String(velocidade) + " mhz"] ?? 0) + 1,
        }));
          
        setMemoriasCapacidades((anterior) => ({
          ...anterior,
          [String(capacidade) + " GB"]: (anterior[String(velocidade) + " GB"] ?? 0) + 1,
        }));
      });

      // Monitores
      const monitoresDados = data?.monitores;

      if (monitoresDados?.status) {
        setMonitoresStatus((anterior) => ({
          ...anterior,
          [monitoresDados.status]: (anterior[monitoresDados.status] ?? 0) + 1,
        }));
      }

      if (monitoresDados?.fabricante) {
        setMonitoresFabricantes((anterior) => ({
          ...anterior,
          [monitoresDados.fabricante]: (anterior[monitoresDados.fabricante] ?? 0) + 1,
        }));
      }

      const quantidadeMonitores = String(data?.monitores_edid?.length ?? 0) + " monitor(es)";

      setMonitoresContagem((anterior) => ({
        ...anterior,
        [quantidadeMonitores]: (anterior[quantidadeMonitores] ?? 0) + 1,
      }));

      data?.monitores_edid?.forEach((monitor: any) => {
        if (monitor.nome_amigavel) {
          setMonitores((anterior) => ({
            ...anterior,
            [monitor.nome_amigavel]: (anterior[monitor.nome_amigavel] ?? 0) + 1,
          }));
        }
      });

      // Placa-mãe
      const placaMae = data?.placas_mae;

      if (placaMae?.modelo) {
        setPlacasMaeModelos((anterior) => ({
          ...anterior,
          [placaMae.modelo]: (anterior[placaMae.modelo] ?? 0) + 1,
        }));
      }

      if (placaMae?.fabricante) {
        setPlacasMaeFabricantes((anterior) => ({
          ...anterior,
          [placaMae.fabricante]: (anterior[placaMae.fabricante] ?? 0) + 1,
        }));
      }

      if (placaMae?.status) {
        setPlacasMaeStatus((anterior) => ({
          ...anterior,
          [placaMae.status]: (anterior[placaMae.status] ?? 0 ) + 1,
        }));
      }

      // Segurança
      const seguranca = data?.seguranca;

      setUac((anterior) => ({
        ...anterior,
        [(seguranca.uac ?? "Não reconhecido")]:
        (anterior[(seguranca.uac ?? "Não reconhecido")] ?? 0) + 1,
      }));

      setFirewall((anterior) => ({
        ...anterior,
        [(seguranca.firewall ?? "Não reconhecido")]:
        (anterior[(seguranca.firewall ?? "Não reconhecido")] ?? 0) + 1,
      }));

      // Impressoras
      data?.impressoras?.forEach((impressora: any) => {

        setImpressoras((anterior) => ({
          ...anterior,
          [impressora.nome]: (anterior[impressora.nome] ?? 0) + 1,
        }));

        setImpressorasDrivers((anterior) => ({
          ...anterior,
          [impressora.drivers]: (anterior[impressora.drivers] ?? 0) + 1,
        }));

        setImpressorasStatus((anterior) => ({
          ...anterior,
          [impressora.status]: (anterior[impressora.status] ?? 0) + 1,
        }));
      });
    });
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

  return (
    <DadosContext.Provider
    value={{
      chamadas,
      tecnicos,
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