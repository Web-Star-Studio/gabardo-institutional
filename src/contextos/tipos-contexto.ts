import { type Session, type User } from '@supabase/supabase-js';

export type AutenticacaoContextType = {
    user: User | null;
    sessao: Session | null;
    carregando: boolean;
    erro: string;
    login: (email: string, senha: string) => void;
    logout: () => void;
}