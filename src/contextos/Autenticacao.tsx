'use client';

import { createContext, useContext, useState } from 'react';
import { type User, type Session } from '@supabase/supabase-js'
import { supabase } from "@/lib/supabase";
import { type AutenticacaoContextType } from './tipos-contexto';

const AutenticacaoContext = createContext<AutenticacaoContextType | null>(null);

function AutenticacaoProvider({ children }: { children: React.ReactNode }) {  
    const [user, setUser] = useState<User | null>(null);
    const [sessao, setSessao] = useState<Session | null>(null);

    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");

    const login = async (email: string, senha: string) => {
      setCarregando(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: senha,
      })
      if(error){
        setErro("Erro: " + error);
        setCarregando(false);
        return;
      }
      setCarregando(false);
      setErro("");
      setUser(data.user);
      setSessao(data.session);
    }
    
    const logout = async () => {
      await supabase.auth.signOut();
      setUser(null);
      setSessao(null);
    }

  return (
    <AutenticacaoContext.Provider
      value={{
        user,
        sessao,
        carregando,
        erro,
        login,
        logout
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