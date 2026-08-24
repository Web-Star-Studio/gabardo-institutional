import {
  useQuery
} from "@tanstack/react-query";
import { supabase } from './supabase'
import type { Tables } from './tipos';


export function pegarTecnicos(enabled = true) {
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
  return useQuery({
    queryKey: ['chamadas'],
    enabled,
queryFn: async () => {
  console.log("🔥 EXECUTANDO QUERY CHAMADAS");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("👤 USER:", user);

  const { data, error } = await supabase
    .from("chamadas")
    .select("*");

  console.log("📦 DATA:", data);
  console.log("❌ ERROR:", error);

  if (error) throw error;

  return data as Tables<'chamadas'>[];
},
  })
}

export function pegarAndamentos(enabled = true) {
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