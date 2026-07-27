import type { Tables, TablesInsert, TablesUpdate } from "./tipos";

export type Chamada = Tables<"chamadas">;
export type NovaChamada = TablesInsert<"chamadas">;
export type AtualizacaoChamada = TablesUpdate<"chamadas">;
export type Andamento = Tables<"andamentos">;
export type NovoAndamento = TablesInsert<"andamentos">;

export type AtualizarChamadaPayload = {
  id: Chamada["id"];
  dados: AtualizacaoChamada;
};
