'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ConfiguracoesContext = createContext<ConfiguracoesContextType | null>(null);

function ConfiguracoesProvider({ children }: { children: React.ReactNode }) {

  const [configuracoes, setConfiguracoes] = useState("");

  const idCards = {
    0: "numeroChamadasTotal",
    1: "numeroChamadasAtrasadas",
    2: "numeroChamadasParadas",
    3: "numeroChamadasAndamento",
    4: "numeroChamadasPausadas",
    5: "numeroChamadasFinalizadas",
    6: "numeroChamadasFinalizadasAtrasadas",
    7: "metricasChamadasTotal",
    8: "metricasChamadasAtrasadas",
    9: "metricasChamadasParadas",
    10: "metricasChamadasAndamento",
    11: "metricasChamadasPausadas",
    12: "metricasChamadasFinalizadas",
    13: "metricasChamadasFinalizadasAtrasadas",
  }

  useEffect(() => {
    if (configuracoes !== "") return;

    const configSalva = localStorage.getItem("config-salva");

    if (configSalva) setConfiguracoes(configSalva);
    return;
  }, [])

  return (
    <ConfiguracoesContext.Provider
      value={{
        configString,

      }}
    >
      {children}
    </ConfiguracoesContext.Provider>
  );
}

export function useConfiguracoes() {
  const context = useContext(ConfiguracoesContext);
  if (!context) throw new Error('useConfiguracoes deve ser usado dentro do DadosProvider');
  return context;
}

export { ConfiguracoesProvider };