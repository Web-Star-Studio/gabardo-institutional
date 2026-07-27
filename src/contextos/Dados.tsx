'use client';

import { createContext, useContext, useState } from 'react';
import  { pegarDados } from "@/lib/query";

type DadosContextType = ReturnType<typeof pegarDados>

const DadosContext = createContext<DadosContextType | null>(null);

function DadosProvider({ children }: { children: React.ReactNode }) {

  const query = pegarDados();
  const [selecionado, setSelecionado] = useState<typeof query | null>(null);

  const [ numeroUsuarios, setNumeroUsuarios ] = useState<number>(0);

  const dados = query.data as any;

  const infoPCs = () => {

    // CONTAGEM DOS USUÁRIOS //
    const totalUsuarios = query.data?.length || 0;
    setNumeroUsuarios(totalUsuarios);


    // TODOS OS USUÁRIOS //
    const usuarios: Record<string, string> = {};


    // PROCESSADORES //
    const processadores: Record<string, number> = {};


    // COMPUTADORES //
    const modelos: Record<string, number> = {};
    const fabricantes: Record<string, number> = {};
    const SO: Record<string, number> = {};
    const ativacao: Record<string, number> = {};
    const arquitetura: Record<string, number> = {};


    // MEMÓRIAS //
    const meTipos: Record<string, number> = {};
    const meVelocidade: Record<string, number> = {};
    const meStatus: Record<string, number> = {};
    const meCapacidade : Record<string, number> = {};


    // MONITORES //
    const monitores: Record<string, number> = {};
    const mStatus: Record<string, number> = {};
    const mFabricantes: Record<string, number> = {};
    const mContagem: Record<string, number> = {};


    // PLACAS-MÃE //
    const pmFabricantes: Record<string, number> = {};
    const pmModelos: Record<string, number> = {};
    const pmStatus: Record<string, number> = {};


    // SOFTWARES //
    //const softwares: Record<string, number> = {};


    // SEGURANÇA //
    const uac: Record<string, number> = {};
    const firewall: Record<string, number> = {};


    // IMPRESSORAS //
    const impressoras: Record<string, number> = {};
    const iDrivers: Record<string, number> = {};
    const iStatus: Record<string, number> = {};


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