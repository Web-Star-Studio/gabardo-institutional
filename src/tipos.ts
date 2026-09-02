export type HeaderContextType = {
    menuAbertoEsquerdo: boolean;
    darkMode: boolean;
    alterarMenuEsquerdo: () => void;
    alterarTema: () => void;
    fecharMenus: () => void;
    menuAbertoNotificacoes: boolean;
    menuAbertoAlertas: boolean;
    menuAbertoMinhasChamadas: boolean;
    menuAbertoChamadas : boolean;
    alterarMenuChamadas: () => void;
    alterarMenuNotificacoes: () => void;
    alterarMenuAlertas: () => void;
    alterarMenuMinhasChamadas: () => void;
}