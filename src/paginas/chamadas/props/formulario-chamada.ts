import type { Chamada, NovaChamada } from "@/lib/tipos_chamadas";

export type FormularioChamadaProps = {
  darkMode: boolean;
  criando: boolean;
  aoCriarChamada: (chamada: NovaChamada) => Promise<Chamada>;
  aoCriarComSucesso: (chamada: Chamada) => void;
};
