'use client';

import { createContext, useContext } from 'react';
import {
  pegarProgramas,
  pegarMaquinas
} from "@/lib/query";

import type { InventarioContextType } from './tipos-contexto';

const InventarioContext = createContext<InventarioContextType | null>(null);

function InventarioProvider({ children }: { children: React.ReactNode }) {

    const maquinas = pegarMaquinas();
    const programas = pegarProgramas();

  return (
    <DadosContext.Provider
      value={{
        chamadas,
        andamentos,
        tecnicos,
        tecnicosChamadas,
        assumirChamada
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