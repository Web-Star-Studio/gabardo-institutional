'use client';

import { createContext, useContext } from 'react';
import {
  pegarTecnicosChamadas,
  pegarTecnicos,
  pegarChamadas,
  pegarAndamentos
} from "@/lib/query";
import { useAutenticacao } from "./Autenticacao";

import type { DadosContextType } from './tipos-contexto';

const DadosContext = createContext<DadosContextType | null>(null);

function DadosProvider({ children }: { children: React.ReactNode }) {

  const { sessao, carregandoAuth } = useAutenticacao();

  const autenticado = !carregandoAuth && !!sessao;

  console.log("AUTH:", {
    carregandoAuth,
    sessao,
    autenticado,
  });

  const chamadas = pegarChamadas(!carregandoAuth && !!sessao);

  console.log("CHAMADAS QUERY:", {
    enabled: autenticado,
    status: chamadas.status,
    data: chamadas.data,
  });

  const tecnicos = pegarTecnicos(!carregandoAuth && !!sessao);
  const andamentos = pegarAndamentos(!carregandoAuth && !!sessao);
  const tecnicosChamadas = pegarTecnicosChamadas(
    !carregandoAuth && !!sessao
  );

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