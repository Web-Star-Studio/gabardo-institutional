'use client';

import { createContext, useContext } from 'react';
import  { pegarDados } from "@/lib/query";

type DadosContextType = ReturnType<typeof pegarDados>

const DadosContext = createContext<DadosContextType | null>(null);

function DadosProvider({ children }: { children: React.ReactNode }) {

  const query = pegarDados();


  // ATIVOS //
  const infoProcessadores = () => {
    const contagemUsuarios = new Set<string>();
  }

  const infoMonitores = () => {
    const contagemUsuarios = new Set<string>();
  }

  const infoSoftwares = () => {
    const contagemUsuarios = new Set<string>();
  }

  const infoDispositivosRede = () => {
    const contagemUsuarios = new Set<string>();
  }

  const infoDispositivos = () => {
    const contagemUsuarios = new Set<string>();
  }




  // CHAMADAS //
  const infoImpressoras = () => {
    const contagemUsuarios = new Set<string>();
  }


  

  return (
    <DadosContext.Provider
      value={query}
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