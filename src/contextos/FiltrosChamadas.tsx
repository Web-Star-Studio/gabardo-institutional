'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { type FiltrosChamadasContextType } from './tipos-contexto';
import { useAutenticacao } from './Autenticacao';
import { useDados } from './Dados';
import type { Tables } from '@/lib/tipos';

const FiltrosChamadasContext = createContext<FiltrosChamadasContextType | null>(null);

interface ChamadasDetalhadas {
  chamadasConcluidas: Tables<'chamadas'>[];
  chamadasConcluidasAtrasadas: Tables<'chamadas'>[];
  chamadasEmAtendimento: Tables<'chamadas'>[];
  chamadasAtrasadas: Tables<'chamadas'>[];
  chamadasPausadas: Tables<'chamadas'>[];
  numeroConcluidas: number | null;
  numeroEmAtendimento: number | null;
  numeroAtrasadas: number | null;
  numeroConcluidasAtrasadas: number | null;
  numeroPausadas: number | null;
  numeroTotalChamadas: number | null;
  tempoTotalChamadas: number | null;
  tempoMedioAtendimento: number | null;
  ocorrencias: number | null;
  tempoParado: number | null;
}

interface GalosDetalhados {
  chamadasDele: Record<string, ChamadasDetalhadas>;
  chamadasTotais: number;
  chamadasEmAndamento: number;
  chamadasPausadas: number;
  chamadasAtrasadas: number;
  chamadasParadas: number;
  chamadasConcluidas: number;
  chamadasConcluidasAtrasadas: number;
}

export function calcularTempo(chamada: Tables<"chamadas">, andamentos: Tables<"andamentos">[]) {
  const eventos = [...andamentos].sort(
    (a, b) => +new Date(a.quando) - +new Date(b.quando)
  );

  let total = 0;
  let inicio = new Date(chamada.data_criacao).getTime();
  let contando = true;

  for (const a of eventos) {
    const t = new Date(a.quando).getTime();

    if (a.motivo === "Pausado" && contando) {
      total += t - inicio;
      contando = false;
    }

    if (a.motivo === "Retomado" && !contando) {
      inicio = t;
      contando = true;
    }
  }

  if (contando) {
    total +=
      (chamada.data_atendeu
        ? new Date(chamada.data_atendeu).getTime()
        : Date.now()) - inicio;
  }

  return total; // milissegundos
}

function FiltrosChamadasProvider({ children }: { children: React.ReactNode }) {
  const { sessao, tecnicoLogado } = useAutenticacao();
  const {
    chamadas,
    tecnicos,
    inventario,
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

  const [chamadasEmAndamento, setChamadasEmAndamento] = useState<Tables<'chamadas'>[]>([]);
  const [restringirChamadas, setRestringirChamadas] = useState<Tables<'chamadas'>[] | undefined>(undefined);
  const [minhasChamadas, setMinhasChamadas] = useState<undefined | Tables<'chamadas'>[]>(undefined);
  const [chamadasPorStatus, setChamadasPorStatus] = useState<Record<string, number>>({});


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
      (incluirAntigas ? chamadas.data : chamadasEmAndamento).filter(chamada => {
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



  // MINHAS CHAMADAS
  useEffect(() => {
    if (!chamadas.isSuccess) return;

    const resultado = chamadas.data.filter(
      chamada => chamada.status !== null && chamada.status > 2
    )

    setChamadasEmAndamento(
      (resultado ?? [])
    )
    setMinhasChamadas(
      chamadasEmAndamento?.filter(
        chamada => (chamada.gerado_por == sessao?.user.id) ||
          (
            chamada.tecnicos.split(',').some(techChamada =>
              techChamada.toLowerCase().trim() == tecnicoLogado?.nome.toLowerCase().trim()
            )
          )
      )
    );
  }, [chamadas.isSuccess, chamadas.data, sessao])



  // =========================================
  const [megaInfoChamadas, setMegaInfoChamadas] =
    useState<GalosDetalhados>({
      chamadasDele: {},
      chamadasTotais: 0,
      chamadasEmAndamento: 0,
      chamadasPausadas: 0,
      chamadasAtrasadas: 0,
      chamadasParadas: 0,
      chamadasConcluidas: 0,
      chamadasConcluidasAtrasadas: 0
    });

  useEffect(() => {
    if (!chamadas.isSuccess) return;

    const resultado: GalosDetalhados = {
      chamadasDele: {},
      chamadasTotais: 0,
      chamadasEmAndamento: 0,
      chamadasPausadas: 0,
      chamadasAtrasadas: 0,
      chamadasParadas: 0,
      chamadasConcluidas: 0,
      chamadasConcluidasAtrasadas: 0
    };

    chamadas.data.forEach((chamada) => {
      const fechouAtrasou = chamada.status == 1;
      const fechou = chamada.status == 2;
      const nasceu = chamada.status == 3;
      const pausou = chamada.status == 4;
      const andou = chamada.status == 5;
      const atrasou = chamada.status == 6;

      resultado.chamadasTotais++;

      const galos = chamada.tecnicos?.split(",")
        .map((g) => g.trim());

      if (galos) {
        galos.forEach((galo) => {

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
              tempoMedioAtendimento: 0,
              ocorrencias: 0,
              
              tempoParado: 0
            };
          }

          const info = resultado.chamadasDele[galo];
          info.numeroTotalChamadas!++;

          if (fechouAtrasou) {
            info.chamadasConcluidasAtrasadas.push(chamada);
            info.numeroConcluidasAtrasadas!++;
          }

          if (fechou) {
            info.chamadasConcluidas.push(chamada);
            info.numeroConcluidas!++;
          }

          if (andou) {
            info.chamadasEmAtendimento.push(chamada);
            info.numeroEmAtendimento!++;
          }

          if (pausou) {
            info.chamadasPausadas.push(chamada);
            info.numeroPausadas!++;
          }

          if (atrasou) {
            info.chamadasAtrasadas.push(chamada);
            info.numeroAtrasadas!++;
          }
        });



      }
      else {
        resultado.chamadasParadas++;
      }
    });

    Object.values(resultado.chamadasDele).forEach((info) => {
      if (info.numeroTotalChamadas) {
        info.tempoMedioAtendimento =
          info.tempoTotalChamadas! / info.numeroTotalChamadas;
      }
    });

    setMegaInfoChamadas(resultado);
  }, [chamadas.data, chamadas.isSuccess]);


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
        chamadasEmAndamento,
        aplicarFiltros,
        restringirChamadas,
        minhasChamadas,
        removerFiltros,
        incluirAntigas,
        antigasTambem,
        chamadasPorStatus,
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