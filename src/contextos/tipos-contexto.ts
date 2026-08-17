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
    inventario: UseQueryResult<Tables<"inventario_mv">[], Error>;
    usuarios: Record<string, string>;
    numeroUsuarios: number;
    impressoras: Record<string, number>;
    impressorasDrivers: Record<string, number>;
    impressorasStatus: Record<string, number>;
    processadores: Record<string, number>;
    computadoresModelos: Record<string, number>;
    computadoresFabricantes: Record<string, number>;
    computadoresSO: Record<string, number>;
    computadoresAtivacao: Record<string, number>;
    computadoresArquitetura: Record<string, number>;
    memoriasTipos: Record<string, number>;
    memoriasVelocidades: Record<string, number>;
    memoriasStatus: Record<string, number>;
    memoriasCapacidades: Record<string, number>;
    monitores: Record<string, number>;
    monitoresStatus: Record<string, number>;
    monitoresFabricantes: Record<string, number>;
    monitoresContagem: Record<string, number>;
    placasMaeFabricantes: Record<string, number>;
    placasMaeModelos: Record<string, number>;
    placasMaeStatus: Record<string, number>;
    uac: Record<string, number>;
    firewall: Record<string, number>;
}

export type AutenticacaoContextType = {
    user: User | null;
    sessao: Session | null;
    carregando: boolean;
    erro: string;
    login: (email: string, senha: string) => void;
    logout: () => void;
    tecnicoLogado: Tables<'tecnicos'> | null;
    limparErro: () => void;
}

export type FiltrosChamadasContextType = {

}