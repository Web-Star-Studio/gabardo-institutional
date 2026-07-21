'use client';

import { createContext, useContext, useEffect, useState } from 'react';


import { supabase } from "../lib/supabase";
import { type User, type Session } from '@supabase/supabase-js'


const AutenticacaoContext = createContext<Tipos.AutenticacaoContextType | null>(null);

function AutenticacaoProvider({ children }: { children: React.ReactNode }) {  
    const [user, setUser] = useState<User | null>(null);
    const [sessao, setSessao] = useState<Session | null>(null);

    const [erro, setErro] = useState("");

    async function login(email: string, senha: string) {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: senha,
      })

      if(error){
        setErro("Erro: " + error);
        return;
      }

      setUser(data.user);
      setSessao(data.session);

    }

  return (
    <AutenticacaoContext.Provider
      value={{
        user
      }}
    >
      {children}
    </AutenticacaoContext.Provider>
  );
}

export function useAutenticacao() {
  const context = useContext(AutenticacaoContext);
  if (!context) throw new Error('useAutenticacao deve ser usado dentro do DadosProvider');
  return context;
}

export { AutenticacaoProvider };