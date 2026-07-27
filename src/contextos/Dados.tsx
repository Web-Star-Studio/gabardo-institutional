'use client';

import { createContext, useContext, useState } from 'react';
import  { pegarDados } from "@/lib/query";

type DadosContextType = ReturnType<typeof pegarDados>

const DadosContext = createContext<DadosContextType | null>(null);

function DadosProvider({ children }: { children: React.ReactNode }) {

  const query = pegarDados();
  const dados = query.data as any;

  const [selecionado, setSelecionado] = useState<typeof query | null>(null);

  // Melhor jeito de passar essa bomba
  // Para EU do futuro, tenta ver um jeito melhor do que 300 linhas de código
  // Parece suruba.

  const [ numeroUsuarios, setNumeroUsuarios ] = useState<number>(0);

  const [ impressoras, setImpressoras] = useState<Record<string, number> | {}>({});
  const [ impressorasDrivers, setImpressorasDrivers ] = useState<Record<string, number> | {}>({});
  const [ impressorasStatus, setImpressorasStatus ] = useState<Record<string, number> | {}>({});

  
  const [ usuarios, setUsuarios ] = useState<Record<string, string> | {}>({});
  
  const [ processadores, setProcessadores] = useState<Record<string, number> | {}>({});
  
  
  const [ computadores, setComputadores] = useState<Record<string, number> | {}>({});
  const [ computadoresModelos, setComputadoresModelos ] = useState<Record<string, number> | {}>({});
  const [ computadoresFabricantes, setComputadoresFabricantes ] = useState<Record<string, number> | {}>({});
  const [ computadoresSO, setComputadoresSO ] = useState<Record<string, number> | {}>({});
  const [ computadoresAtivacao, setComputadoresAtivacao ] = useState<Record<string, number> | {}>({});
  const [ computadoresArquitetura, setComputadoresArquitetura] = useState<Record<string, number> | {}>({});

  const [ memoriasTipos, setMemoriasTipos ] = useState<Record<string, number> | {}>({});
  const [ memoriasVelocidades, setMemoriasVelocidades ] = useState<Record<string, number> | {}>({});
  const [ memoriasStatus, setMemoriasStatus ] = useState<Record<string, number> | {}>({});
  const [ memoriasCapacidades, setMemoriasCapacidades ] = useState<Record<string, number> | {}>({});

  const [ monitores, setMonitores ] = useState<Record<string, number> | {}>({});
  const [ monitoresStatus, setMonitoresStatus ] = useState<Record<string, number> | {}>({});
  const [ monitoresFabricantes, setMonitoresFabricantes ] = useState<Record<string, number> | {}>({});
  const [ monitoresContagem, setMonitoresContagem ] = useState<Record<string, number> | {}>({});

  const [ placasMaeFabricantes, setPlacasMaeFabricantes ] = useState<Record<string, number> | {}>({});
  const [ placasMaeModelos, setPlacasMaeModelos ] = useState<Record<string, number> | {}>({});
  const [ placasMaeStatus, setPlacasMaeStatus ] = useState<Record<string, number> | {}>({});
  
  const [ uac, setUac ] = useState<Record<string, number> | {}>({});
  const [ firewall, setFirewall ] = useState<Record<string, number> | {}>({});

  setNumeroUsuarios(query.data?.length || 0);

    dados?.forEach((registro: any) => {
      const data = registro.data as any;

      // Usuário por hostname
      if (registro.hostname) {
        usuarios[registro.hostname] = data?.coleta?.usuario_executando ?? "";
      }

      // Processador
      const processador = data?.processador?.nome;
      if (processador) {
        processadores[processador] = (processadores[processador] ?? 0) + 1;
      }

      // Computador / sistema
      const sistema = data?.sistema;

      if (sistema?.modelo_computador) {
        modelos[sistema.modelo_computador] = (modelos[sistema.modelo_computador] ?? 0) + 1;
      }

      if (sistema?.fabricante_computador) {
        fabricantes[sistema.fabricante_computador] =
          (fabricantes[sistema.fabricante_computador] ?? 0) + 1;
      }

      if (sistema?.nome) {
        SO[sistema.nome] = (SO[sistema.nome] ?? 0) + 1;
      }

      if (sistema?.ativacao) {
        ativacao[String(sistema.ativacao)] =
          (ativacao[String(sistema.ativacao)] ?? 0) + 1;
      }

      if (sistema?.arquitetura) {
        arquitetura[sistema.arquitetura] =
          (arquitetura[sistema.arquitetura] ?? 0) + 1;
      }

      // Memória principal
      const memoria = data?.memoria;

      if (memoria?.tipo) {
        meTipos[memoria.tipo] = (meTipos[memoria.tipo] ?? 0) + 1;
      }

      if (memoria?.status) {
        meStatus[memoria.status] = (meStatus[memoria.status] ?? 0) + 1;
      }

      memoria?.modulos?.forEach((modulo: any) => {
        const velocidade = String(modulo.velocidade_mhz);
        const capacidade = String(modulo.capacidade_gb);

        meVelocidade[velocidade] = (meVelocidade[velocidade] ?? 0) + 1;
        meCapacidade[capacidade] = (meCapacidade[capacidade] ?? 0) + 1;
      });

      // Monitores
      const monitoresDados = data?.monitores;

      if (monitoresDados?.status) {
        mStatus[monitoresDados.status] = (mStatus[monitoresDados.status] ?? 0) + 1;
      }

      if (monitoresDados?.fabricante) {
        mFabricantes[monitoresDados.fabricante] =
          (mFabricantes[monitoresDados.fabricante] ?? 0) + 1;
      }

      const quantidadeMonitores = String(data?.monitores_edid?.length ?? 0);
      mContagem[quantidadeMonitores] = (mContagem[quantidadeMonitores] ?? 0) + 1;

      data?.monitores_edid?.forEach((monitor: any) => {
        if (monitor.nome_amigavel) {
          monitores[monitor.nome_amigavel] =
            (monitores[monitor.nome_amigavel] ?? 0) + 1;
        }
      });

      // Placa-mãe
      const placaMae = data?.placas_mae;

      if (placaMae?.modelo) {
        pmModelos[placaMae.modelo] = (pmModelos[placaMae.modelo] ?? 0) + 1;
      }

      if (placaMae?.fabricante) {
        pmFabricantes[placaMae.fabricante] =
          (pmFabricantes[placaMae.fabricante] ?? 0) + 1;
      }

      if (placaMae?.status) {
        pmStatus[placaMae.status] = (pmStatus[placaMae.status] ?? 0) + 1;
      }

      // Segurança
      const seguranca = data?.seguranca;

      if (seguranca?.uac !== undefined) {
        const chave = String(seguranca.uac);
        uac[chave] = (uac[chave] ?? 0) + 1;
      }

      if (seguranca?.firewall !== undefined) {
        const chave = String(seguranca.firewall);
        firewall[chave] = (firewall[chave] ?? 0) + 1;
      }

      // Impressoras
      data?.impressoras?.forEach((impressora: any) => {
        if (!impressora.local) return;

        impressoras[impressora.nome] = (impressoras[impressora.nome] ?? 0) + 1;
        iStatus[impressora.status] = (iStatus[impressora.status] ?? 0) + 1;
        iDrivers[impressora.driver] = (iDrivers[impressora.driver] ?? 0) + 1;
      });
    });
    
  }


  // CHAMADAS //
  

  return (
    <DadosContext.Provider
      value={{
        totalUsuarios,
        usuarios,
        processadores,
        modelos,
        fabricantes,
        SO,
        ativacao,
        arquitetura,
        meTipos,
        meVelocidade,
        meStatus,
        meCapacidade,
        monitores,
        mStatus,
        mFabricantes,
        mContagem,
        pmFabricantes,
        pmModelos,
        pmStatus,
        softwares,
        uac,
        firewall,
        impressoras,
        iDrivers,
        iStatus,
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