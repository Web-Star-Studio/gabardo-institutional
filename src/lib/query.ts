import {
  useQuery, useMutation, useQueryClient
} from "@tanstack/react-query";
import { supabase } from './supabase'
import type { Tables } from './tipos';
import { useRealtimeTable } from "./realTime";

export const pegarAlertas = async () => {
  const { data, error } = await supabase
    .from('maquinas_programas_flags')
    .select(`
      maquina_id,
      programa_id,
      permitiu,
      maquinas (
        nome_computador,
        usuario_atual
      ),
      programas (
        nome
      )
    `);

  if (error) {
    throw new Error(`Erro ao buscar alertas: ${error.message}`);
  }

  return data.map((item: any) => ({
    maquina_id: item.maquina_id,
    nome_computador: item.maquinas?.nome_computador || 'Desconhecido',
    usuario_atual: item.maquinas?.usuario_atual || 'Desconhecido',
    programa_id: item.programa_id,
    nome_programa: item.programas?.nome || 'Desconhecido',
    permitiu: item.permitiu
  }));
};

export const usePegarAlertas = () => {
  return useQuery({
    queryKey: ['alertas_inventario'],
    queryFn: pegarAlertas
  });
};

export const permitirSoftware = async ({ maquinaId, programaId }: { maquinaId: string, programaId: number }) => {
  const { error } = await supabase
    .from('maquinas_programas_flags')
    .update({ permitiu: true }) 
    .eq('maquina_id', maquinaId)
    .eq('programa_id', programaId);

  if (error) {
    throw new Error(`Erro ao permitir software: ${error.message}`);
  }
  
  return true;
};

export const usePermitirSoftware = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: permitirSoftware,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alertas_inventario'] });
    },
  });
};

export function pegarTecnicos(enabled = true) {
  useRealtimeTable("tecnicos", "tecnicos");

  return useQuery({
    queryKey: ['tecnicos'],
    enabled,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tecnicos')
        .select('*')
      if (error) throw error
      return data as Tables<'tecnicos'>[]
    },
  })
}

export function pegarChamadas(enabled = true) {
  useRealtimeTable("chamadas", "chamadas");

  return useQuery({
    queryKey: ['chamadas'],
    enabled,
queryFn: async () => {

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("chamadas")
    .select("*, tecnico_chamadas(id_tecnico)");

  if (error) throw error;

  return data as Tables<'chamadas'>[];
},
  })
}

export function pegarAndamentos(enabled = true) {
  useRealtimeTable("andamentos", "andamentos");

  return useQuery({
    queryKey: ['andamentos'],
    enabled,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('andamentos')
        .select('*')
        .order('quando', { ascending: true });

      if (error) throw error;
      return data as Tables<'andamentos'>[];
    },
  });
}

export function pegarTecnicosChamadas(enabled = true) {
  useRealtimeTable(
    "tecnico_chamadas",
    "tecnico_chamadas"
  );

    return useQuery<Tables<"tecnico_chamadas">[]>({
        queryKey: ["tecnico_chamadas"],
        enabled,
        queryFn: async () => {
            const { data, error } = await supabase
                .from("tecnico_chamadas")
                .select(`
                    *,
                    tecnicos (*)
                `);

            if (error) throw error;
            return data satisfies Tables<"tecnico_chamadas">[];        }
    });
}