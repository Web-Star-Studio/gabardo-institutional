'use client';

import { createContext, useContext, useMemo } from 'react';
import { useDados } from './Dados';
import { useAutenticacao } from './Autenticacao'.
import { useHeader } from './Header'.
import { useState } from 'react';

const FuncoesChamadasContext = createContext<FuncoesChamadasContextType | null>(null);

function FuncoesChamadasProvider({ children }: { children: React.ReactNode }) {
    const {
        chamadas,
        tecnicos,
        tecnicosChamadas
    } = useDados();
    const auten = useAutenticacao();
    const eu = auten.tecnicoLogado;

    const 

    const [abrirMenuConfiguracoes, setAbrirMenuConfiguracoes] = useState(false);
    const [abrirMenuAlertas, setAbrirMenuAlertas] = useState(false);
    const [abrirMenuNotificacoes, setAbrirMenuNotificacoes] = useState(false);
    const [abrirMenuMinhasChamadas, setAbrirMenuMinhasChamadas] = useState(false);
    const [abrirMenuCooperacao, setAbrirMenuCooperacao] = useState(false);
    const [abrirOverlay, setAbrirOverlay] = useState(false);

    const abrirMenu = (qual: string) => {
        if (qual == 'opções') {
            setAbrirMenuConfiguracoes(true);
            return;
        }
        else if (qual == 'alertas') {
            setAbrirMenuAlertas(true);
            return;
        }
        else if (qual == 'notificações') {
            setAbrirMenuNotificacoes(true);
            return;
        }
        else if (qual == 'minhas chamadas') {
            setAbrirMenuMinhasChamadas(true);
            return;
        }
        else if (qual == 'cooperação') {
            setAbrirMenuCooperacao(true);
            return;
        }
        else if (qual == 'overlay') {
            setAbrirOverlay(true);
            return;
        }
    }

    const fecharMenu = (qual: string) => {
        if (qual == 'opções') {
            setAbrirMenuConfiguracoes(false);
            return;
        }
        else if (qual == 'alertas') {
            setAbrirMenuAlertas(false);
            return;
        }
        else if (qual == 'notificações') {
            setAbrirMenuNotificacoes(false);
            return;
        }
        else if (qual == 'minhas chamadas') {
            setAbrirMenuMinhasChamadas(false);
            return;
        }
        else if (qual == 'cooperação') {
            setAbrirMenuCooperacao(false);
            return;
        }
        else if (qual == 'overlay') {
            setAbrirOverlay(false);
            return;
        }
    }



    return (
        <FuncoesChamadasContext.Provider
            value={{

            }}
        >
            {children}
        </FuncoesChamadasContext.Provider>
    );
}

export function useFuncoesChamadas() {
    const context = useContext(FuncoesChamadasContext);
    if (!context) throw new Error('useFuncoesChamadas deve ser usado dentro do DadosProvider');
    return context;
}

export { FuncoesChamadasProvider };