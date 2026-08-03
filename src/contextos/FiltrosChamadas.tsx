'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { type FiltrosChamadasContextType } from './tipos-contexto';
import { useAutenticacao } from './Autenticacao';
import { useDados } from './Dados';
import type { Tables } from '@/lib/tipos';


const FiltrosChamadasContext = createContext<FiltrosChamadasContextType | null>(null);

interface ChamadasDetalhadas {
  chamadasConcluidas: Tables<'chamadas'>;
  chamadasEmAtendimento: Tables<'chamadas'>;
  chamadasAtrasadas: Tables<'chamadas'>;
  numeroConcluidas: null | number;
  numeroEmAtendimento: null | number;
  numeroAtrasadas: null | number;
  numeroTotalChamadas: null | number;
  tempoTotalChamadas: null | number;
  tempoMedioAtendimento: null | number;
  ocorrencias: null | number;
}

interface GalosDetalhados {
  chamadasDele: Record<string, ChamadasDetalhadas>;
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

  const [megaInfoChamadas, setMegaInfoChamadas] =
  useState<GalosDetalhados>({
    chamadasDele: {},
  });

useEffect(() => {
  if (!chamadas.isSuccess) return;

  const resultado: GalosDetalhados = {
    chamadasDele: {},
  };

  chamadas.data.forEach((chamada) => {
    const galos = chamada.tecnicos
      .split(",")
      .map((g) => g.trim());

    galos.forEach((galo) => {
      if (!resultado.chamadasDele[galo]) {
        resultado.chamadasDele[galo] = {
          chamadasConcluidas: [],
          chamadasEmAtendimento: [],
          chamadasAtrasadas: [],
          numeroConcluidas: 0,
          numeroEmAtendimento: 0,
          numeroAtrasadas: 0,
          numeroTotalChamadas: 0,
          tempoTotalChamadas: 0,
          tempoMedioAtendimento: 0,
          ocorrencias: 0,
        };
      }

      const info = resultado.chamadasDele[galo];

      info.numeroTotalChamadas!++;

      switch (chamada.status) {
        case 2:
          info.chamadasConcluidas.push(chamada);
          info.numeroConcluidas!++;
          break;

        case 5:
          info.chamadasEmAtendimento.push(chamada);
          info.numeroEmAtendimento!++;
          break;

        case 6:
          info.chamadasAtrasadas.push(chamada);
          info.numeroAtrasadas!++;
          break;
      }

      // if you have a duration field:
      // info.tempoTotalChamadas! += chamada.tempo;
    });
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