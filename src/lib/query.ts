import {
  useQuery
} from "@tanstack/react-query";
import { supabase } from './supabase'
import type { Tables } from './tipos';
import { useRealtimeTable } from "./realTime";


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