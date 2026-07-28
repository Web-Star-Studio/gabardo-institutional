'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { type FiltrosContextType } from './tipos-contexto';
import { useAutenticacao } from './Autenticacao';
import { useDados } from './Dados';
import type { Tables } from '@/lib/tipos';

const FiltrosContext = createContext<FiltrosContextType | null>(null);

function FiltrosProvider({ children }: { children: React.ReactNode }) {  
  const { sessao, tecnicoLogado } = useAutenticacao();
    const {
        chamadas,
        tecnicos,
        inventario,
    } = useDados();

  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Tables<'inventario_mv'> | null>(null);
  const [tecnicoSelecionado, setTecnicoSelecionado] = useState<Tables<'tecnicos'> | null>(null);
  const [chamadaSelecionada, setChamadaSelecionada] = useState<Tables<'chamadas'> | null>(null);

  const selecionarTecnico = (id: string) => {
    if (!tecnicos.isSuccess) return;

    const tecnico = tecnicos.data.find(tec => tec.id === id);

    if (!tecnico) return;

    setTecnicoSelecionado(tecnico);    
  }

  const selecionarChamada = (id: string) => {
    if (!chamadas.isSuccess) return;

    const chamada = chamadas.data.find(chamada => chamada.id === id);

    if (!chamada) return;

    setChamadaSelecionada(chamada);    
  }

  const selecionarUsuario = (id: string) => {
    if (!inventario.isSuccess) return;

    const usuario = inventario.data.find(usuario => usuario.id === id);

    if (!usuario) return;

    setUsuarioSelecionado(usuario);    
  }

  const tirarTecnico = () => setTecnicoSelecionado(null);
  const tirarChamada = () => setChamadaSelecionada(null);
  const tirarUsuario = () => setUsuarioSelecionado(null);

  const [chamadasEmAndamento, setChamadasEmAndamento] = useState<Tables<'chamadas'>[] | undefined>(undefined);
  const [restringirChamadas, setRestringirChamadas] = useState<Tables<'chamadas'>[] | undefined>(undefined);
  const [minhasChamadas, setMinhasChamadas] = useState<undefined | Tables<'chamadas'>[]>(undefined);

  

  useEffect(() => {
    if (!chamadas.isSuccess) return;

    setChamadasEmAndamento(
        chamadas.data.filter(
            chamada => chamada.status !== null && chamada.status > 2
        )
    )

    setMinhasChamadas(
        chamadasEmAndamento?.filter(
            chamada => (chamada.gerado_por == sessao?.user.id) ||
            (
                chamada.tecnicos.split(',').some(techChamada =>
                    techChamada.toLowerCase().trim() == tecnicoLogado?.nome.toLowerCase().trim()
                )
            )
        )
    );
  },[chamadas.isSuccess, chamadas.data])

  return (
    <FiltrosContext.Provider
      value={{
        usuarioSelecionado,
        tecnicoSelecionado,
        chamadaSelecionada,
        selecionarTecnico,
        selecionarChamada,
        selecionarUsuario,
        tirarTecnico,
        tirarChamada,
        tirarUsuario,
        chamadasEmAndamento,
        filtrarChamadas,
        minhasChamadas,
      }}
    >
      {children}
    </FiltrosContext.Provider>
  );
}

export function useFiltros() {
  const context = useContext(FiltrosContext);
  if (!context) throw new Error('useFiltros deve ser usado dentro do DadosProvider');
  return context;
}

export { FiltrosProvider };