'use client';

import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { type FiltrosChamadasContextType } from './tipos-contexto';
import { useAutenticacao } from './Autenticacao';
import { useDados } from './Dados';
import type { Tables } from '@/lib/tipos';
import type { GalosDetalhados } from "./tipos-contexto";

const FiltrosChamadasContext = createContext<FiltrosChamadasContextType | null>(null);

function FiltrosChamadasProvider({ children }: { children: React.ReactNode }) {
  const authen = useAutenticacao();
  const {
    chamadas,
    tecnicos,
    inventario,
    andamentos,
    tecnicosChamadas
  } = useDados();

// STATUS - GERAL
// STATUS - TÉCNICO

// PIES
// PARADAS - GERAL
// EM ANDAMENTO - GERAL
// EM ANDAMENTO - TÉCNICO
// ATRASADAS - GERAL
// ATRASADAS - TÉCNICO
// PAUSADAS - GERAL
// PAUSADAS - TÉCNICO
// CONCLUÍDAS - GERAL
// CONCLUÍDAS - TÉCNICO
// CONCLUÍDAS C/ ATRASO - GERAL
// CONCLUÍDAS C/ ATRASO - TÉCNICO

// CARDS
// NÚMERO ATRASADAS
// NÚMERO EM ANDAMENTO
// NÚMERO CONCLUÍDAS
// NÚMERO CONCLUÍDAS C/ ATRASO
// NÚMERO PAUSADAS
// NÚMERO PARADAS

const megaInfoChamadas = useMemo(() => {
  tecnicosChamadas.data?.forEach((chamada) => {
    
  });
}, []);

  return (
    <FiltrosChamadasContext.Provider
      value={{

      }}
    >
      {children}
    </FiltrosChamadasContext.Provider>
  );
}

export function useFiltrosChamadas() {
  const context = useContext(FiltrosChamadasContext);
  if (!context) throw new Error('useFiltrosChamadas deve ser usado dentro do DadosProvider');
  return context;
}

export { FiltrosChamadasProvider };