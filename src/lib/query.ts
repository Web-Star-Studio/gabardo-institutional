import {
  useQuery
} from "@tanstack/react-query";
import { supabase } from './supabase'
import type { Tables } from './tipos';


export function pegarInventario() {
  return useQuery({
    queryKey: ['inventario'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('inventario_mv')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return data as Tables<'inventario_mv'>[]
    },
  })
}

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