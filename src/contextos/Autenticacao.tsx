'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { type User, type Session } from '@supabase/supabase-js'
import { supabase } from "@/lib/supabase";
import { type AutenticacaoContextType } from './tipos-contexto';
import { useDados } from './Dados';
import { type Tables } from '@/lib/tipos';

const AutenticacaoContext = createContext<AutenticacaoContextType | null>(null);

function AutenticacaoProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [sessao, setSessao] = useState<Session | null>(null);
  const [tecnicoLogado, setTecnicoLogado] = useState<Tables<'tecnicos'> | null>(null);
  const { tecnicos } = useDados();

  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const limparErro = () => {
    setErro("");
  }

  const login = async (email: string, senha: string) => {
    setCarregando(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: senha,
    })
    if (error) {
      setErro("Erro: " + error);
      setCarregando(false);
      return false;
    }
    setCarregando(false);
    setErro("");
    setUser(data.user);
    setSessao(data.session);

    const tecAtual =
      tecnicos.data?.find(
        tech => tech.id === data.user.id
      ) ?? null;

    setTecnicoLogado(tecAtual);

    return true;
  }

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSessao(null);
    setTecnicoLogado(null);
  }

  useEffect(() => {
    if (!sessao) return;

    setTecnicoLogado(
      (tecnicos.data?.find(tech => tech.id == sessao.user.id) ?? null)
    );
  }, [sessao]);

  return (
    <AutenticacaoContext.Provider
      value={{
        user,
        sessao,
        carregando,
        erro,
        login,
        logout,
        tecnicoLogado,
        limparErro
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