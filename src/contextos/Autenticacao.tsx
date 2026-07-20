'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type * as Tipos from '../tipos';

const AutenticacaoContext = createContext<Tipos.AutenticacaoContextType | null>(null);

function AutenticacaoProvider({ children }: { children: React.ReactNode }) {  
    const [user, setUser] = useState<Tipos.User | null>(null);
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");

    const [erro, setErro] = useState("");

    const login = (usuario: string, senha: string) => {
        
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