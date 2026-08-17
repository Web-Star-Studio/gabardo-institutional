'use client';

/*prioridade
-- 1 = Baixa
-- 2 = Média
-- 3 = Alta
-- 4 = Urgente
 */

import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { type FiltrosChamadasContextType } from './tipos-contexto';
import { useAutenticacao } from './Autenticacao';
import { useDados } from './Dados';
import type { DetalhesCompletos, Chamada } from './tipos-contexto';
import type { Tables } from '@/lib/tipos';

const FiltrosChamadasContext = createContext<FiltrosChamadasContextType | null>(null);

function FiltrosChamadasProvider({ children }: { children: React.ReactNode }) {
  const authen = useAutenticacao();
  const {
    chamadas,
    tecnicos,
    inventario,
    andamentos,
    tecnicosChamadas
  } = useDados();


  const chamadasPorId = useMemo<Map<string, Chamada>>(() => {
    return new Map(
      (chamadas.data ?? []).map((chamada) => [
        chamada.id,
        chamada,
      ])
    );
  }, [chamadas.data]);

  const tecnicosPorId = useMemo<Map<string, Tables<"tecnicos">>>(() => {
    return new Map(
      (tecnicos.data ?? []).map((tecnico) => [
        tecnico.id,
        tecnico,
      ])
    );
  }, [tecnicos.data]);

  const megaInfoChamadas = useMemo(() => {
    const repetidas = new Set<string>();

    const dados: DetalhesCompletos = {
      geral: {
        numeroFinalizadasAtrasadas: 0,
        numeroFinalizadas: 0,
        numeroParadas: 0,
        numeroEmAndamento: 0,
        numeroPausadas: 0,
        numeroAtrasadas: 0,

        listaFinalizadasAtrasadas: [],
        listaFinalizadas: [],
        listaParadas: [],
        listaEmAndamento: [],
        listaPausadas: [],
        listaAtrasadas: [],

        chamadasBaixas: [],
        chamadasMedias: [],
        chamadasAltas: [],
        chamadasUrgentes: [],

        chamadasNovas: [],
        chamadasVelhas: [],
      },

      individual: {},
    };

    tecnicos.data?.forEach((tecnico) => {
      dados.individual[tecnico.id] = {
        numeroFinalizadasAtrasadas: 0,
        numeroFinalizadas: 0,
        numeroParadas: 0,
        numeroEmAndamento: 0,
        numeroPausadas: 0,
        numeroAtrasadas: 0,

        listaFinalizadasAtrasadas: [],
        listaFinalizadas: [],
        listaParadas: [],
        listaEmAndamento: [],
        listaPausadas: [],
        listaAtrasadas: [],

        chamadasBaixas: [],
        chamadasMedias: [],
        chamadasAltas: [],
        chamadasUrgentes: [],

        chamadasNovas: [],
        chamadasVelhas: [],
      };
    });

    tecnicosChamadas.data?.forEach((chamada) => {
      const chamadaAtual = chamadasPorId.get(chamada.id_chamada)!;
      /*
      -- 1 = Fechado com atraso
      -- 2 = Fechado
      -- 3 = Não atendido
      -- 4 = Pausado
      -- 5 = Aberto
      -- 6 = Atrasado
      */
      if (chamada.id_tecnico) {
        switch (chamadaAtual.status) {
          case 1:
            dados.individual[chamada.id_tecnico]
              .numeroFinalizadasAtrasadas++;
            dados.individual[chamada.id_tecnico]
              .listaFinalizadasAtrasadas.push(chamadaAtual)
            dados.individual[chamada.id_tecnico]
              .chamadasVelhas.push(chamadaAtual)

            break;

          case 2:
            dados.individual[chamada.id_tecnico]
              .numeroFinalizadas++;
            dados.individual[chamada.id_tecnico]
              .listaFinalizadas.push(chamadaAtual);
            dados.individual[chamada.id_tecnico]
              .chamadasVelhas.push(chamadaAtual);
            break;

          case 4:
            dados.individual[chamada.id_tecnico]
              .numeroPausadas++;
            dados.individual[chamada.id_tecnico]
              .listaPausadas.push(chamadaAtual)
            dados.individual[chamada.id_tecnico]
              .chamadasNovas.push(chamadaAtual);
            break;

          case 5:
            dados.individual[chamada.id_tecnico]
              .numeroEmAndamento++;
            dados.individual[chamada.id_tecnico]
              .listaEmAndamento.push(chamadaAtual)
            dados.individual[chamada.id_tecnico]
              .chamadasNovas.push(chamadaAtual);
            break;

          case 6:
            dados.individual[chamada.id_tecnico]
              .numeroAtrasadas++;
            dados.individual[chamada.id_tecnico]
              .listaAtrasadas.push(chamadaAtual);
            dados.individual[chamada.id_tecnico]
              .chamadasNovas.push(chamadaAtual);
            break;
        }




        switch (chamadaAtual.prioridade) {
          case 1:
            dados.individual[chamada.id_tecnico]
              .chamadasBaixas.push(chamadaAtual)
            break;

          case 2:
            dados.individual[chamada.id_tecnico]
              .chamadasMedias.push(chamadaAtual)
            break;

          case 3:
            dados.individual[chamada.id_tecnico]
              .chamadasAltas.push(chamadaAtual)
            break;

          case 4:
            dados.individual[chamada.id_tecnico]
              .chamadasUrgentes.push(chamadaAtual)
            break;
        }



      }
      if (!repetidas.has(chamadaAtual.id)) {
        switch (chamadaAtual.status) {
          case 1:
            dados.geral
              .numeroFinalizadasAtrasadas++;
            dados.geral
              .listaFinalizadasAtrasadas.push(chamadaAtual);
            dados.geral
              .chamadasVelhas.push(chamadaAtual);
            break;

          case 2:
            dados.geral
              .numeroFinalizadas++;
            dados.geral
              .listaFinalizadas.push(chamadaAtual);
            dados.geral
              .chamadasVelhas.push(chamadaAtual);
            break;

          case 3:
            dados.geral
              .numeroParadas++;
            dados.geral
              .listaParadas.push(chamadaAtual);
            dados.geral
              .chamadasNovas.push(chamadaAtual);
            break;

          case 4:
            dados.geral
              .numeroPausadas++;
            dados.geral
              .listaPausadas.push(chamadaAtual);
            dados.geral
              .chamadasNovas.push(chamadaAtual);
            break;

          case 5:
            dados.geral
              .numeroEmAndamento++;
            dados.geral
              .listaEmAndamento.push(chamadaAtual);
            dados.geral
              .chamadasNovas.push(chamadaAtual);
            break;

          case 6:
            dados.geral
              .numeroAtrasadas++;
            dados.geral
              .listaAtrasadas.push(chamadaAtual);
            dados.geral
              .chamadasNovas.push(chamadaAtual);
            break;
        }



        switch (chamadaAtual.prioridade) {
          case 1:
            dados.geral
              .chamadasBaixas.push(chamadaAtual)
            break;

          case 2:
            dados.geral
              .chamadasMedias.push(chamadaAtual)
            break;

          case 3:
            dados.geral
              .chamadasAltas.push(chamadaAtual)
            break;

          case 4:
            dados.geral
              .chamadasUrgentes.push(chamadaAtual)
            break;
        }

        repetidas.add(chamadaAtual.id);
      }


    });
  }, [tecnicosChamadas.data]);

  return (
    <FiltrosChamadasContext.Provider
      value={{

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