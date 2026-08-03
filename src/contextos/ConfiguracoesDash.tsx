'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { type User, type Session } from '@supabase/supabase-js'
import { supabase } from "@/lib/supabase";
import { type AutenticacaoContextType } from './tipos-contexto';
import { useDados } from './Dados';
import { type Tables } from '@/lib/tipos';
import { useAutenticacao } from '@/contextos/Autenticacao';

const ConfiguracoesContext = createContext<ConfiguracoesContextType | null>(null);

function ConfiguracoesProvider({ children }: { children: React.ReactNode }) {  
    const authen = useAutenticacao();
    
    const [configString, setConfigString] = useState("");
    const [configStringSalva, setConfigStringSalva] = useState("");
    const [carregandoConfigs, setCarregandoConfigs] = useState(false);
    const [erro, setErro] = useState<string | null>(null);

    const limparErro = () => {
      setErro(null);
    }

    const alterarConfiguracoes = (config: string) => {
        setConfigString(config);
    }

    useEffect(() => {

    }, [configStringSalva])

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

export function useAutenticacao() {
  const context = useContext(ConfiguracoesContext);
  if (!context) throw new Error('useAutenticacao deve ser usado dentro do DadosProvider');
  return context;
}

export { ConfiguracoesProvider };