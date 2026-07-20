'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type * as Tipos from '../tipos';

const HeaderContext = createContext<Tipos.HeaderContextType | null>(null);

function HeaderProvider({ children }: { children: React.ReactNode }) {
  const [menuAbertoEsquerdo, abrirMenuEsquerdo] = useState(false);
  const [darkMode, ativarDarkMode] = useState(() => localStorage.getItem('tema') === 'dark');

  const fecharMenus = () => {
    abrirMenuEsquerdo(false);
  };
  
  useEffect(() => {
    if (darkMode) {
      localStorage.setItem('tema', 'dark');
    } else {
      localStorage.setItem('tema', 'claro');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') fecharMenus();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const alterarMenuEsquerdo = () => {
    abrirMenuEsquerdo((prev) => !prev);
  };

  const alterarTema = () => ativarDarkMode((prev) => !prev);

  return (
    <HeaderContext.Provider
      value={{
        menuAbertoEsquerdo,
        darkMode,
        alterarMenuEsquerdo,
        alterarTema,
        fecharMenus,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  const context = useContext(HeaderContext);
  if (!context) throw new Error('useHeader deve ser usado dentro do Header');
  return context;
}

export { HeaderProvider };