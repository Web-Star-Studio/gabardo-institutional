'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { type User, type Session } from '@supabase/supabase-js';
import { supabase } from "@/lib/supabase";
import { type AutenticacaoContextType } from './tipos-contexto';
import { type Tables } from '@/lib/tipos';

const AutenticacaoContext =
  createContext<AutenticacaoContextType | null>(null);

function AutenticacaoProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User | null>(null);
  const [sessao, setSessao] = useState<Session | null>(null);

  const [tecnicoLogado, setTecnicoLogado] =
    useState<Tables<'tecnicos'> | null>(null);

  const [carregando, setCarregando] = useState(false);

  const [carregandoAuth, setCarregandoAuth] = useState(true);

  const [erro, setErro] = useState("");

  const limparErro = () => {
    setErro("");
  };

  const login = async (email: string, password: string) => {
    setCarregando(true);

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      setErro("Erro: " + error.message);
      setCarregando(false);

      return false;
    }

    setErro("");
    setUser(data.user);
    setSessao(data.session);

    setCarregando(false);

    return true;
  };

  const logout = async () => {
    await supabase.auth.signOut();

    setUser(null);
    setSessao(null);
    setTecnicoLogado(null);
  };

  useEffect(() => {
    if (!sessao?.user.id) {
      setTecnicoLogado(null);
      return;
    }

    const buscarTecnico = async () => {
      const { data } = await supabase
        .from("tecnicos")
        .select("*")
        .eq("id", sessao.user.id)
        .single();

      setTecnicoLogado(data);
    };

    buscarTecnico();
  }, [sessao?.user.id]);

  useEffect(() => {
    const recuperarSessao = async () => {

      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSessao(session);
      setUser(session?.user ?? null);

      setCarregandoAuth(false);
    };

    recuperarSessao();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSessao(session);
        setUser(session?.user ?? null);

        setCarregandoAuth(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AutenticacaoContext.Provider
      value={{
        user,
        sessao,

        carregando,
        carregandoAuth,

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

  if (!context) {
    throw new Error(
      'useAutenticacao deve ser usado dentro do AutenticacaoProvider'
    );
  }

  return context;
}

export { AutenticacaoProvider };