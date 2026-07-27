import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { supabase } from './supabase'
import { useEffect } from "react";
import type { Chamadas } from './tipos';


const chamadasQueryKey = ["chamadas"] as const;

async function fetchChamadas(): Promise<Chamadas[]> {
  const { data, error } = await supabase
    .from("chamadas")
    .select("*")
    .order("prioridade", { ascending: false });

  if (error) {
    throw error;
  }

  return data as Chamadas[];
}

export function useChamadas() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: chamadasQueryKey,
    queryFn: fetchChamadas,
  });

  useEffect(() => {
    const channel = supabase
      .channel("chamadas-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "chamadas",
        },
        () => {
          void queryClient.invalidateQueries({
            queryKey: chamadasQueryKey,
          });
        },
      )
      .subscribe((status, error) => {
        if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
          console.error("Erro Supabase Realtime:", status, error);
        }
      });

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return query;
}

export function useCriarChamada() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (titulo: string) => {
      const tituloLimpo = titulo.trim();

      if (!tituloLimpo) {
        throw new Error("Título não pode ser vazio.");
      }

      const { data, error } = await supabase
        .from("chamadas")
        .insert({
          titulo: tituloLimpo,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data as Chamadas;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: chamadasQueryKey,
      });
    },
  });
}

export function useAtivarChamadas() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      continuar_contagem,
    }: {
      id: string;
      continuar_contagem: boolean;
    }) => {
      const { data, error } = await supabase
        .from("chamadas")
        .update({ continuar_contagem })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data as Chamadas;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: chamadasQueryKey,
      });
    },
  });
}

export function useDeleteItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("chamadas")
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: chamadasQueryKey,
      });
    },
  })};
