import type { NovaChamada, NovoAndamento } from "@/lib/tipos_chamadas";
import type { FormAndamento, FormChamada } from "../tipos/formularios";

export const chamadaInicial: FormChamada = {
  titulo: "",
  descricao: "",
  requerentes: "",
  tecnicos: "",
  prioridade: "2",
  status: "1",
  segundosRestantesMinutos: "60",
  prazoFinal: "",
};

export const andamentoInicial: FormAndamento = {
  descricao: "",
  quemAtualizou: "",
  motivo: "1",
};

export function textoOpcional(valor: string) {
  const texto = valor.trim();
  return texto.length > 0 ? texto : null;
}

export function numeroInteiro(valor: string, fallback: number) {
  const numero = Number.parseInt(valor, 10);
  return Number.isFinite(numero) ? numero : fallback;
}

export function mensagemErro(erro: unknown) {
  return erro instanceof Error ? erro.message : "Erro inesperado.";
}

export function montarNovaChamada(formulario: FormChamada): NovaChamada {
  const minutos = numeroInteiro(formulario.segundosRestantesMinutos, 60);

  return {
    titulo: formulario.titulo.trim(),
    descricao: textoOpcional(formulario.descricao),
    requerentes: formulario.requerentes.trim(),
    tecnicos: formulario.tecnicos.trim(),
    prioridade: numeroInteiro(formulario.prioridade, 2),
    status: numeroInteiro(formulario.status, 1),
    segundos_restantes: Math.max(0, minutos) * 60,
    prazo_final: formulario.prazoFinal
      ? new Date(formulario.prazoFinal).toISOString()
      : null,
  };
}

export function montarNovoAndamento(
  idChamada: string,
  formulario: FormAndamento,
): NovoAndamento {
  return {
    id_chamada: idChamada,
    descricao: formulario.descricao.trim(),
    motivo: numeroInteiro(formulario.motivo, 1),
    quem_atualizou: formulario.quemAtualizou.trim() || "Sistema",
  };
}
