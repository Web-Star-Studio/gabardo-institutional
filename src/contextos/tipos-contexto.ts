import { type Session, type User } from '@supabase/supabase-js';
import type { Tables } from '@/lib/tipos';
import type { UseQueryResult } from "@tanstack/react-query";

export type Chamada = Tables<"chamadas">;

interface ChamadaMetricas {
  numeroFinalizadasAtrasadas: number;
  numeroFinalizadas: number;
  numeroParadas: number;
  numeroEmAndamento: number;
  numeroPausadas: number;
  numeroAtrasadas: number;

  listaFinalizadasAtrasadas: Chamada[];
  listaFinalizadas: Chamada[];
  listaParadas: Chamada[];
  listaEmAndamento: Chamada[];
  listaPausadas: Chamada[];
  listaAtrasadas: Chamada[];

  chamadasBaixas: Chamada[]
  chamadasMedias: Chamada[]
  chamadasAltas: Chamada[]
  chamadasUrgentes: Chamada[]

  chamadasNovas: Chamada[]
  chamadasVelhas: Chamada[]
}

export interface DetalhesCompletos {
  geral: ChamadaMetricas;
  individual: Record<string, ChamadaMetricas>
}

export type DadosContextType = {
    chamadas: UseQueryResult<Tables<"chamadas">[], Error>;
    andamentos: UseQueryResult<Tables<"andamentos">[], Error>;
    tecnicos: UseQueryResult<Tables<"tecnicos">[], Error>;
    tecnicosChamadas: UseQueryResult<Tables<"tecnico_chamadas">[], Error>;
  }

export type AutenticacaoContextType = {
    user: User | null;
    sessao: Session | null;
    carregando: boolean;
    erro: string;
    login: (email: string, senha: string) => Promise<boolean>;
    logout: () => void;
    tecnicoLogado: Tables<'tecnicos'> | null;
    limparErro: () => void;
}

export type FiltrosChamadasContextType = {
  megaInfoChamadas: DetalhesCompletos;
}