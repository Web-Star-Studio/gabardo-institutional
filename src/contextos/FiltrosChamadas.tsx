'use client';

import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { type FiltrosChamadasContextType } from './tipos-contexto';
import { useAutenticacao } from './Autenticacao';
import { useDados } from './Dados';
import type { Tables } from '@/lib/tipos';
import type { GalosDetalhados } from "./tipos-contexto";

const FiltrosChamadasContext = createContext<FiltrosChamadasContextType | null>(null);

export function calcularTempo(
  chamada: Tables<"chamadas">,
  andamentos: Tables<"andamentos">[]
): { tempoAndamento: number; tempoPausa: number } {

  const eventos = [...andamentos].sort(
    (a, b) =>
      new Date(a.quando).getTime() - new Date(b.quando).getTime()
  );

  let tempoAndamento = 0;
  let tempoPausa = 0;

  let inicioAndamento: number | null = null;
  let inicioPausa: number | null = null;
  let contando = false;

  for (const a of eventos) {
    const tempo = new Date(a.quando).getTime();

    switch (a.motivo) {
      case 'atendida':

        inicioAndamento = tempo;
        contando = true;
        break;

      case 'pausada':
        if (contando && inicioAndamento !== null) {
          tempoAndamento += tempo - inicioAndamento;
          contando = false;
          inicioAndamento = null;
          inicioPausa = tempo;
        }
        break;

      case 'retomada':
        if (inicioPausa !== null) {
          tempoPausa += tempo - inicioPausa;
          inicioPausa = null;
        }
        inicioAndamento = tempo;
        contando = true;
        break;

      case 'finalizada':
        if (contando && inicioAndamento !== null) {
          tempoAndamento += tempo - inicioAndamento;
          contando = false;
          inicioAndamento = null;
        }
        if (inicioPausa !== null) {
          tempoPausa += tempo - inicioPausa;
          inicioPausa = null;
        }
        break;

      default:
        break;
    }
  }

  const agora = chamada.data_finalizacao
    ? new Date(chamada.data_finalizacao).getTime()
    : Date.now();

  if (contando && inicioAndamento !== null) {
    tempoAndamento += agora - inicioAndamento;
  }

  if (inicioPausa !== null) {
    tempoPausa += agora - inicioPausa;
  }

  return {
    tempoAndamento,
    tempoPausa,
  };
}

function tempoAteAtender(chamada: Tables<'chamadas'>): number | null {
  if (!chamada.data_atendeu) return null;

  return (
    new Date(chamada.data_atendeu).getTime() -
    new Date(chamada.data_criacao).getTime()
  );
}

function FiltrosChamadasProvider({ children }: { children: React.ReactNode }) {
  const authen = useAutenticacao();
  const {
    chamadas,
    tecnicos,
    inventario,
    andamentos
  } = useDados();

  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Tables<'inventario_mv'> | null>(null);
  const [tecnicoSelecionado, setTecnicoSelecionado] = useState<Tables<'tecnicos'> | null>(null);
  const [chamadaSelecionada, setChamadaSelecionada] = useState<Tables<'chamadas'> | null>(null);


  const selecionarTecnico = (id: string) => {
    if (!tecnicos.isSuccess) return;

    const tecnico = tecnicos.data.find(tec => tec.id === id);

    if (!tecnico) return;

    setTecnicoSelecionado(tecnico);
  }

  const selecionarChamada = (id: string) => {
    if (!chamadas.isSuccess) return;

    const chamada = chamadas.data.find(chamada => chamada.id === id);

    if (!chamada) return;

    setChamadaSelecionada(chamada);
  }

  const selecionarUsuario = (id: string) => {
    if (!inventario.isSuccess) return;

    const usuario = inventario.data.find(usuario => usuario.id === id);

    if (!usuario) return;

    setUsuarioSelecionado(usuario);
  }

  const tirarTecnico = () => setTecnicoSelecionado(null);
  const tirarChamada = () => setChamadaSelecionada(null);
  const tirarUsuario = () => setUsuarioSelecionado(null);

  const [restringirChamadas, setRestringirChamadas] = useState<Tables<'chamadas'>[] | undefined>(undefined);
  const [minhasChamadas, setMinhasChamadas] = useState<undefined | Tables<'chamadas'>[]>(undefined);

  const [filtros, setFiltros] = useState<string[]>([]);
  const [incluirAntigas, setIncluirAntigas] = useState(false);

  const aplicarFiltros = (filtros: string) => {
    setFiltros(filtros.split(" "));
  }

  const removerFiltros = () => {
    setFiltros([]);
  }

  const antigasTambem = () => {
    setIncluirAntigas(valorAnterior => !valorAnterior);
  }

  useEffect(() => {
    if (filtros.length === 0) {
      setRestringirChamadas(undefined);
      return;
    }
    if (!chamadas.isSuccess) return;

    setRestringirChamadas(
      (incluirAntigas ? chamadas.data : megaInfoChamadas.listaChamadasAbertas).filter(chamada => {
        filtros.some(filtro => {
          Object.values(chamada).some(
            propriedade => String(propriedade)
              .toLowerCase()
              .includes(filtro.toLowerCase())
          )
        })
      })
    )
  }, [filtros, chamadas.data]);

  useEffect(() => {
    if (filtros.length === 0) {
      setRestringirChamadas(undefined);
      return;
    }
    if (!chamadas.isSuccess) return;

    setRestringirChamadas(
      (incluirAntigas ? chamadas.data : megaInfoChamadas.listaChamadasAbertas).filter(chamada => {
        filtros.some(filtro => {
          Object.values(chamada).some(
            propriedade => String(propriedade)
              .toLowerCase()
              .includes(filtro.toLowerCase())
          )
        })
      })
    )
  }, [filtros, chamadas.data]);

  // =========================================
  const [megaInfoChamadas, setMegaInfoChamadas] =
    useState<GalosDetalhados>({
      chamadasDele: {},
      chamadasTotais: 0,
      chamadasEmAndamento: 0,
      chamadasPausadas: 0,
      chamadasAtrasadas: 0,
      chamadasParadas: 0,
      listaChamadasParadas: [],
      listaChamadasAbertas: [],
      listaChamadasAtrasadas: [],
      listaChamadasConcluidas: [],
      listaChamadasConcluidasAtrasadas: [],
      listaChamadasPausadas: [],
      chamadasConcluidas: 0,
      chamadasConcluidasAtrasadas: 0,
      tempoTotalAndamento: 0,
      tempoTotalPausa: 0,
      tempoTotalEspera: 0,
    });


  const andamentosPorChamada = useMemo(() => {
    if (!andamentos.data) return {} as Record<string, Tables<'andamentos'>[]>;

    return andamentos.data?.reduce<Record<string, Tables<'andamentos'>[]>>(
      (acc, andamento) => {
        const id = andamento.id_chamada;
        if (!acc[id]) acc[id] = [];
        acc[id].push(andamento);
        return acc;
      },
      {}
    );
  }, [andamentos.data]);

  useEffect(() => {
    if (!chamadas.isSuccess) return;

    const resultado: GalosDetalhados = {
      chamadasDele: {},
      chamadasTotais: 0,
      chamadasEmAndamento: 0,
      chamadasPausadas: 0,
      chamadasAtrasadas: 0,
      chamadasParadas: 0,
      listaChamadasParadas: [],
      listaChamadasAbertas: [],
      listaChamadasAtrasadas: [],
      listaChamadasConcluidas: [],
      listaChamadasPausadas: [],
      listaChamadasConcluidasAtrasadas: [],
      chamadasConcluidas: 0,
      chamadasConcluidasAtrasadas: 0,
      tempoTotalAndamento: 0,
      tempoTotalPausa: 0,
      tempoTotalEspera: 0,
    };

    const chamadasGaloAtual: Tables<'chamadas'>[] = [];

    for (const chamada of chamadas.data) {
      const status = chamada.status;
      const fechouAtrasou = status === 1;
      const fechou = status === 2;
      const nasceu = status === 3;
      const pausou = status === 4;
      const andou = status === 5;
      const atrasou = status === 6;

      // GLOBAL, PEGA TUDO
      resultado.chamadasTotais++;

      if (fechouAtrasou) {
        resultado.chamadasConcluidasAtrasadas++;
        resultado.listaChamadasConcluidasAtrasadas.push(chamada);
      }
      if (fechou) {
        resultado.chamadasConcluidas++;
        resultado.listaChamadasConcluidas.push(chamada);
      }
      if (andou) {
        resultado.chamadasEmAndamento++;
        resultado.listaChamadasAbertas.push(chamada);
      }
      if (pausou) {
        resultado.chamadasPausadas++;
        resultado.chamadasEmAndamento++;
        resultado.listaChamadasPausadas.push(chamada);
      }
      if (atrasou) {
        resultado.chamadasAtrasadas++;
        resultado.listaChamadasAtrasadas.push(chamada);
      }

      // TEMPO - PEGA O TEMPO DA CHAMADA
      const andamentosDesta = andamentosPorChamada[chamada.id] ?? [];
      const { tempoAndamento, tempoPausa } = calcularTempo(chamada, andamentosDesta);
      const tempoEspera = tempoAteAtender(chamada) ?? 0;
      resultado.tempoTotalAndamento += tempoAndamento;
      resultado.tempoTotalPausa += tempoPausa;
      resultado.tempoTotalEspera += tempoEspera;

      // AGORA POR GALO DENTRO DE CADA CHAMADA:
      const galos = chamada.tecnicos
        ?.split(',')
        .map((g) => g.trim().split(" ").slice(0, 2).join(" "))
        .filter(Boolean);

      if (!galos || galos.length === 0) {
        if (nasceu) {
          resultado.chamadasParadas++;
          resultado.listaChamadasParadas.push(chamada);
        }
        continue;
      }
      // Vendo se o galo atual tem chamada:

      const ids = chamada.tecnicos
        ?.split(',')
        .map(g => g.trim().split(" ")[2])
        .filter(Boolean);

      ids?.forEach((id) => {
        if (id == authen.sessao?.user.id) {
          chamadasGaloAtual.push(chamada);
        }
      });

      // CALCULANDO AGORA POR GALO, NÃO MAIS GERAL:
      for (const galo of galos) {
        if (!resultado.chamadasDele[galo]) {
          resultado.chamadasDele[galo] = {
            chamadasConcluidas: [],
            chamadasConcluidasAtrasadas: [],
            chamadasEmAtendimento: [],
            chamadasAtrasadas: [],
            chamadasPausadas: [],
            numeroConcluidas: 0,
            numeroEmAtendimento: 0,
            numeroAtrasadas: 0,
            numeroConcluidasAtrasadas: 0,
            numeroPausadas: 0,
            numeroTotalChamadas: 0,
            tempoTotalChamadas: 0,
            tempoAtendimento: 0,
            tempoParado: 0,
            tempoEspera: 0,
            ocorrencias: 0,
            tempoMedioAtendimento: 0,
          };
        }

        const info = resultado.chamadasDele[galo];
        info.numeroTotalChamadas++;

        if (fechouAtrasou) {
          info.chamadasConcluidasAtrasadas.push(chamada);
          info.numeroConcluidasAtrasadas++;
        }
        if (fechou) {
          info.chamadasConcluidas.push(chamada);
          info.numeroConcluidas++;
        }
        if (andou) {
          info.chamadasEmAtendimento.push(chamada);
          info.numeroEmAtendimento++;
        }
        if (pausou) {
          info.chamadasPausadas.push(chamada);
          info.numeroPausadas++;
        }
        if (atrasou) {
          info.chamadasAtrasadas.push(chamada);
          info.numeroAtrasadas++;
        }

        info.tempoTotalChamadas += tempoAndamento;
        info.tempoParado += tempoPausa;
        info.tempoEspera += tempoEspera;
      }
    }

    // CÁLCULO PARA VER RAPIDEZ DO GALO:
    for (const info of Object.values(resultado.chamadasDele)) {
      if (info.numeroTotalChamadas > 0) {
        info.tempoMedioAtendimento =
          info.tempoTotalChamadas / info.numeroTotalChamadas;
      }
    }

    setMinhasChamadas(chamadasGaloAtual);
    setMegaInfoChamadas(resultado);
  }, [chamadas.data, chamadas.isSuccess, andamentosPorChamada]);

  return (
    <FiltrosChamadasContext.Provider
      value={{
        usuarioSelecionado,
        tecnicoSelecionado,
        chamadaSelecionada,
        selecionarTecnico,
        selecionarChamada,
        selecionarUsuario,
        tirarTecnico,
        tirarChamada,
        tirarUsuario,
        megaInfoChamadas,
        aplicarFiltros,
        restringirChamadas,
        minhasChamadas,
        removerFiltros,
        incluirAntigas,
        antigasTambem,
      }}
    >
      {children}
    </FiltrosChamadasContext.Provider>
  );
}

export function useFiltrosChamadas() {
  const context = useContext(FiltrosChamadasContext);
  if (!context) throw new Error('useFiltrosChamadas deve ser usado dentro do DadosProvider');
  return context;
}

export { FiltrosChamadasProvider };