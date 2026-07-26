import { useQuery } from '@tanstack/react-query'
import { supabase } from './supabase'
import type { Tables } from './tipos';

export function pegarDados() {
  return useQuery({
    queryKey: ['id'],
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