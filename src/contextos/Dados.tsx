'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type * as Tipos from '../tipos';

const DadosContext = createContext<Tipos.DadosContextType | null>(null);

function DadosProvider({ children }: { children: React.ReactNode }) {  
  const [frotas, setFrotas] = useState<(Tipos.FrotaDetalhada | null)[]>([]);

  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState<Date | null>(null);

  const [selecionado, setSelecionado] = useState<Tipos.FrotaDetalhada | null>(null);

  const [foto, setFoto] = useState('');
  const [temFoto, setTemFoto] = useState(false);

  function selecionarFrota(frotaSelecionada: Tipos.FrotaDetalhada) {
    setSelecionado(frotaSelecionada);
  }

  const carregarTodasFrotas = async (silencioso = false) => {
    if (!silencioso) setCarregando(true);
    setErro(null);

    try {
      const resposta = await fetch('http://192.168.0.208:8085/all');
      const data: Tipos.ApiResponse<Tipos.FrotaDetalhada | null> = await resposta.json();

      if (data.sucesso) {
        setFrotas(data.resultados);
        setUltimaAtualizacao(new Date());
      } else {
        setErro("Falha ao carregar frotas");
      }
    } catch (err) {
      setErro("Erro de conexão com a API");
      console.error(err);
    } finally {
      if (!silencioso) setCarregando(false);
    }
  };

  useEffect(() => {
    let ativo = true;
    let timeoutId: ReturnType<typeof setTimeout>;

    const atualizar = async () => {
      await carregarTodasFrotas(true);

      if (ativo) {
        timeoutId = setTimeout(atualizar, 300_000); // 5 minutos
      }
    };

    // Carga inicial
    const carregarInicial = async () => {
      setCarregando(true);
      await carregarTodasFrotas(true);
      setCarregando(false);
    };

    carregarInicial();

    timeoutId = setTimeout(atualizar, 300_000);

    return () => {
      ativo = false;
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <DadosContext.Provider
      value={{
        carregando,
        erro,
        frotas,
        selecionado,
        selecionarFrota,
        foto,
        temFoto,
        carregarTodasFrotas,
      }}
    >
      {children}
    </DadosContext.Provider>
  );
}

export function useDados() {
  const context = useContext(DadosContext);
  if (!context) throw new Error('useDados deve ser usado dentro do DadosProvider');
  return context;
}

export { DadosProvider };