import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { prioridadesChamadas, statusChamadas } from "@/lib/rotulos_chamadas";
import {
  chamadaInicial,
  mensagemErro,
  montarNovaChamada,
} from "../funcoes/formularios";
import type { FormularioChamadaProps } from "../props/formulario-chamada";
import type { FormChamada } from "../tipos/formularios";

export default function FormularioChamada({
  darkMode,
  criando,
  aoCriarChamada,
  aoCriarComSucesso,
}: FormularioChamadaProps) {
  const [formulario, setFormulario] = useState<FormChamada>(chamadaInicial);
  const [erro, setErro] = useState("");

  const atualizarCampo = (campo: keyof FormChamada, valor: string) => {
    setFormulario((atual) => ({ ...atual, [campo]: valor }));
  };

  const enviar = async (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    setErro("");

    if (
      !formulario.titulo.trim() ||
      !formulario.requerentes.trim() ||
      !formulario.tecnicos.trim()
    ) {
      setErro("Titulo, requerente e tecnico sao obrigatorios.");
      return;
    }

    try {
      const chamada = await aoCriarChamada(montarNovaChamada(formulario));
      setFormulario(chamadaInicial);
      aoCriarComSucesso(chamada);
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
    <motion.form
      onSubmit={enviar}
      animate={{
        backgroundColor: darkMode ? "#18181b" : "#ffffff",
        borderColor: darkMode ? "#3f3f46" : "#fed7aa",
        color: darkMode ? "#f4f4f5" : "#18181b",
      }}
      className="rounded-lg border p-4"
    >
      <h2 className="text-lg font-semibold">Nova chamada</h2>

      <div className="mt-4 space-y-3">
        <label className="block text-sm font-medium">
          Titulo
          <motion.input
            value={formulario.titulo}
            onChange={(evento) => atualizarCampo("titulo", evento.target.value)}
            animate={campoAnimate}
            className="mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none"
          />
        </label>

        <label className="block text-sm font-medium">
          Descricao
          <motion.textarea
            value={formulario.descricao}
            onChange={(evento) => atualizarCampo("descricao", evento.target.value)}
            animate={campoAnimate}
            className="mt-1 min-h-24 w-full resize-y rounded-md border px-3 py-2 text-sm outline-none"
          />
        </label>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-1">
          <label className="block text-sm font-medium">
            Requerente
            <motion.input
              value={formulario.requerentes}
              onChange={(evento) => atualizarCampo("requerentes", evento.target.value)}
              animate={campoAnimate}
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none"
            />
          </label>

          <label className="block text-sm font-medium">
            Tecnico
            <motion.input
              value={formulario.tecnicos}
              onChange={(evento) => atualizarCampo("tecnicos", evento.target.value)}
              animate={campoAnimate}
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none"
            />
          </label>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Prioridade
            <motion.select
              value={formulario.prioridade}
              onChange={(evento) => atualizarCampo("prioridade", evento.target.value)}
              animate={campoAnimate}
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none"
            >
              {Object.entries(prioridadesChamadas).map(([valor, rotulo]) => (
                <option key={valor} value={valor}>
                  {rotulo}
                </option>
              ))}
            </motion.select>
          </label>

          <label className="block text-sm font-medium">
            Status
            <motion.select
              value={formulario.status}
              onChange={(evento) => atualizarCampo("status", evento.target.value)}
              animate={campoAnimate}
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none"
            >
              {Object.entries(statusChamadas).map(([valor, rotulo]) => (
                <option key={valor} value={valor}>
                  {rotulo}
                </option>
              ))}
            </motion.select>
          </label>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            SLA em minutos
            <motion.input
              type="number"
              min="0"
              value={formulario.segundosRestantesMinutos}
              onChange={(evento) =>
                atualizarCampo("segundosRestantesMinutos", evento.target.value)
              }
              animate={campoAnimate}
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none"
            />
          </label>

          <label className="block text-sm font-medium">
            Prazo
            <motion.input
              type="datetime-local"
              value={formulario.prazoFinal}
              onChange={(evento) => atualizarCampo("prazoFinal", evento.target.value)}
              animate={campoAnimate}
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none"
            />
          </label>
        </div>
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
        disabled={criando}
        animate={{
          backgroundColor: criando ? "#818cf8" : "#4f46e5",
          color: "#ffffff",
          opacity: criando ? 0.7 : 1,
        }}
        className="mt-4 w-full rounded-md px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed"
      >
        {criando ? "Criando" : "Criar chamada"}
      </motion.button>
    </motion.form>
  );
}
