'use client';

import { createContext, useContext, useMemo } from 'react';

import {
  pegarMaquinasCPUs,
  pegarMaquinasGPUs,
  pegarMaquinasHDs,
  pegarMaquinasRAMs,
  pegarMaquinasMonitores,
  pegarMaquinasProgramas,
  pegarMaquinasDadosBrutos,
} from '@/lib/query';

import { useDados } from '@/contextos/Dados';

import type { InventarioContextType } from './tipos-contexto';

const InventarioContext = createContext<InventarioContextType | null>(null);

function InventarioProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { maquinas, programas, alertasUsuarios } = useDados();

  const cpus = pegarMaquinasCPUs();
  const gpus = pegarMaquinasGPUs();
  const hds = pegarMaquinasHDs();
  const rams = pegarMaquinasRAMs();
  const monitores = pegarMaquinasMonitores();

  const maquinasProgramas = pegarMaquinasProgramas();

  const dadosBrutos = pegarMaquinasDadosBrutos();

  const  alertas = alertasUsuarios;


  const value = useMemo<InventarioContextType>(
    () => ({
      maquinas,
      programas,

      cpus,
      gpus,
      hds,
      rams,
      monitores,

      maquinasProgramas,

      dadosBrutos,

      alertas,
    }),
    [
      maquinas,
      programas,

      cpus,
      gpus,
      hds,
      rams,
      monitores,

      maquinasProgramas,

      dadosBrutos,

      alertas,
    ]
  );

  return (
    <InventarioContext.Provider value={value}>
      {children}
    </InventarioContext.Provider>
  );
}

export function useInventario() {
  const context = useContext(InventarioContext);

  if (!context) {
    throw new Error(
      'useInventario deve ser usado dentro de um InventarioProvider'
    );
  }

  return context;
}

export { InventarioProvider };