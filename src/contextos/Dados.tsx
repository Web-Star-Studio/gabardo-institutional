'use client';

import { createContext, useContext } from 'react';
import {
   pegarTecnicosChamadas, 
   pegarTecnicos,
   pegarChamadas, 
   pegarAndamentos
} from "@/lib/query";

import type { DadosContextType } from './tipos-contexto';

const DadosContext = createContext<DadosContextType | null>(null);

function DadosProvider({ children }: { children: React.ReactNode }) {

  const chamadas = pegarChamadas();
  const tecnicos = pegarTecnicos();
  const andamentos = pegarAndamentos();
  const tecnicosChamadas = pegarTecnicosChamadas();


  return (
    <DadosContext.Provider
      value={{
        chamadas,
        andamentos,
        tecnicos,
        tecnicosChamadas
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