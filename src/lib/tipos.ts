export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      andamentos: {
        Row: {
          descricao: string | null
          id: string
          id_chamada: string
          motivo: string
          quando: string
          quem_atualizou: string
        }
        Insert: {
          descricao?: string | null
          id?: string
          id_chamada: string
          motivo: string
          quando?: string
          quem_atualizou: string
        }
        Update: {
          descricao?: string | null
          id?: string
          id_chamada?: string
          motivo?: string
          quando?: string
          quem_atualizou?: string
        }
        Relationships: [
          {
            foreignKeyName: "andamentos_id_chamada_fkey"
            columns: ["id_chamada"]
            isOneToOne: false
            referencedRelation: "chamadas"
            referencedColumns: ["id"]
          },
        ]
      }
      chamadas: {
        Row: {
          categoria: string
          contando_desde: string | null
          continuar_contagem: boolean
          data_atendeu: string | null
          data_criacao: string
          data_finalizacao: string | null
          descricao: string
          em_atendimento: boolean
          email_requerente: string
          fechou: boolean
          id: string
          ip_requerente: string | null
          prazo_final: string | null
          prioridade: number
          requerente: string
          segundos_restantes: number | null
          status: number
          tecnicos: string | null
          titulo: string
        }
        Insert: {
          categoria: string
          contando_desde?: string | null
          continuar_contagem?: boolean
          data_atendeu?: string | null
          data_criacao?: string
          data_finalizacao?: string | null
          descricao: string
          em_atendimento?: boolean
          email_requerente: string
          fechou?: boolean
          id?: string
          ip_requerente?: string | null
          prazo_final?: string | null
          prioridade?: number
          requerente: string
          segundos_restantes?: number | null
          status?: number
          tecnicos?: string | null
          titulo: string
        }
        Update: {
          categoria?: string
          contando_desde?: string | null
          continuar_contagem?: boolean
          data_atendeu?: string | null
          data_criacao?: string
          data_finalizacao?: string | null
          descricao?: string
          em_atendimento?: boolean
          email_requerente?: string
          fechou?: boolean
          id?: string
          ip_requerente?: string | null
          prazo_final?: string | null
          prioridade?: number
          requerente?: string
          segundos_restantes?: number | null
          status?: number
          tecnicos?: string | null
          titulo?: string
        }
        Relationships: []
      }
      inventario: {
        Row: {
          action: string | null
          created_at: string | null
          data: Json
          hostname: string | null
          id: string
          timestamp: string | null
          updated_at: string | null
        }
        Insert: {
          action?: string | null
          created_at?: string | null
          data: Json
          hostname?: string | null
          id: string
          timestamp?: string | null
          updated_at?: string | null
        }
        Update: {
          action?: string | null
          created_at?: string | null
          data?: Json
          hostname?: string | null
          id?: string
          timestamp?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      tecnico_chamadas: {
        Row: {
          created_at: string
          id: string
          id_chamada: string
          id_tecnico: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          id_chamada: string
          id_tecnico?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          id_chamada?: string
          id_tecnico?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_tecnico_chamadas_chamada"
            columns: ["id_chamada"]
            isOneToOne: false
            referencedRelation: "chamadas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tecnico_chamadas_id_tecnico_fkey"
            columns: ["id_tecnico"]
            isOneToOne: false
            referencedRelation: "tecnicos"
            referencedColumns: ["id"]
          },
        ]
      }
      tecnicos: {
        Row: {
          cargo: string | null
          email: string
          id: string
          nome: string
          online: boolean
        }
        Insert: {
          cargo?: string | null
          email: string
          id: string
          nome?: string
          online?: boolean
        }
        Update: {
          cargo?: string | null
          email?: string
          id?: string
          nome?: string
          online?: boolean
        }
        Relationships: []
      }
    }
    Views: {
      inventario_mv: {
        Row: {
          action: string | null
          created_at: string | null
          data: Json | null
          hostname: string | null
          id: string | null
          timestamp: string | null
          updated_at: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      atualizar_status_chamadas: { Args: never; Returns: undefined }
      continuar_timer: { Args: { chamada_id: string }; Returns: undefined }
      pausar_timer: { Args: { chamada_id: string }; Returns: undefined }
      tempo_restante: { Args: { chamada_id: string }; Returns: number }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
