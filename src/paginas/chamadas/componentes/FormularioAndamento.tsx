import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import {
  andamentoInicial,
  mensagemErro,
  montarNovoAndamento,
} from "../funcoes/formularios";
import type { FormularioAndamentoProps } from "../props/formulario-andamento";
import type { FormAndamento } from "../tipos/formularios";

export default function FormularioAndamento({
  darkMode,
  idChamada,
  salvando,
  aoCriarAndamento,
}: FormularioAndamentoProps) {
  const [formulario, setFormulario] = useState<FormAndamento>(andamentoInicial);
  const [erro, setErro] = useState("");

  const atualizarCampo = (campo: keyof FormAndamento, valor: string) => {
    setFormulario((atual) => ({ ...atual, [campo]: valor }));
  };

  const enviar = async (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    setErro("");

    if (!idChamada) {
      setErro("Selecione uma chamada para comentar.");
      return;
    }

    if (!formulario.descricao.trim()) {
      setErro("O comentario nao pode ficar vazio.");
      return;
    }

    try {
      await aoCriarAndamento(montarNovoAndamento(idChamada, formulario));
      setFormulario((atual) => ({ ...atual, descricao: "" }));
    } catch (erroAtual) {
      setErro(mensagemErro(erroAtual));
    }
  };

  const campoAnimate = {
    backgroundColor: darkMode ? "#09090b" : "#ffffff",
    borderColor: darkMode ? "#3f3f46" : "#fed7aa",
    color: darkMode ? "#f4f4f5" : "#18181b",
  };

  return (
    <form onSubmit={enviar}>
      <h2 className="text-lg font-semibold">Novo comentario</h2>

      <div className="mt-4 space-y-3">
        <label className="block text-sm font-medium">
          Quem atualizou
          <motion.input
            value={formulario.quemAtualizou}
            onChange={(evento) => atualizarCampo("quemAtualizou", evento.target.value)}
            animate={campoAnimate}
            className="mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none"
          />
        </label>

        <label className="block text-sm font-medium">
          Motivo
          <motion.input
            type="number"
            min="1"
            value={formulario.motivo}
            onChange={(evento) => atualizarCampo("motivo", evento.target.value)}
            animate={campoAnimate}
            className="mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none"
          />
        </label>

        <label className="block text-sm font-medium">
          Comentario
          <motion.textarea
            value={formulario.descricao}
            onChange={(evento) => atualizarCampo("descricao", evento.target.value)}
            animate={campoAnimate}
            className="mt-1 min-h-32 w-full resize-y rounded-md border px-3 py-2 text-sm outline-none"
          />
        </label>
      </div>

      {erro && (
        <motion.p
          animate={{
            backgroundColor: darkMode ? "#450a0a" : "#fef2f2",
            borderColor: darkMode ? "#991b1b" : "#fca5a5",
            color: darkMode ? "#fecaca" : "#b91c1c",
          }}
          className="mt-3 rounded-md border px-3 py-2 text-sm"
        >
          {erro}
        </motion.p>
      )}

      <motion.button
        type="submit"
        disabled={!idChamada || salvando}
        animate={{
          backgroundColor: !idChamada || salvando ? "#818cf8" : "#4f46e5",
          color: "#ffffff",
          opacity: !idChamada || salvando ? 0.7 : 1,
        }}
        className="mt-4 w-full rounded-md px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed"
      >
        {salvando ? "Salvando" : "Salvar comentario"}
      </motion.button>
    </form>
  );
}
