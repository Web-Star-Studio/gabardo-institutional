import {
  useQuery
} from "@tanstack/react-query";
import { supabase } from './supabase'
import type { Tables } from './tipos';


export function pegarTecnicos() {
  return useQuery({
    queryKey: ['tecnicos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tecnicos')
        .select('*')
      if (error) throw error
      return data as Tables<'tecnicos'>[]
    },
  })
}

export function pegarChamadas() {
  return useQuery({
    queryKey: ['chamadas'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('chamadas')
        .select('*')
      if (error) throw error
      return data as Tables<'chamadas'>[]
    },
  })
}

export function pegarAndamentos() {
  return useQuery({
    queryKey: ['andamentos'],
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

export function pegarTecnicosChamadas() {
    return useQuery<Tables<"tecnico_chamadas">[]>({
        queryKey: ["tecnico_chamadas"],
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