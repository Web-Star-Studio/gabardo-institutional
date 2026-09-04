'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHeader } from '@/contextos/Header';
import { Search } from 'lucide-react';
import TabelaChamadas from '@/componentes/TabelaChamadas';
import { Plus } from 'lucide-react';
import { useAutenticacao } from '@/contextos/Autenticacao';
import { supabase } from '@/lib/supabase';

export default function Contratos() {
  const { darkMode,
    fecharMenus,
    alterarMenuChamadas,
    menuAbertoChamadas
  } = useHeader();

  const { tecnicoLogado } = useAutenticacao();

  const [pesquisa, setPesquisa] = useState('');

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [prioridade, setPrioridade] = useState('- Selecione a prioridade -');
  const [categoria, setCategoria] = useState('- Selecione uma categoria -');
  const [requerente, setRequerente] = useState(tecnicoLogado?.nome ?? '');
  const [requerenteEmail, setRequerenteEmail] = useState(tecnicoLogado?.email ?? '');
  const [loading, setLoading] = useState(false);
  const [erros, setErros] = useState('');
  const [idUser, setidUser] = useState<string | null>(null);
  const [helperChamada, setHelperChamada] = useState("");
  const [menuPrioridade, setMenuPrioridade] = useState(false);
  const [menuCategoria, setMenuCategoria] = useState(false);

  const abrirCategoria = () => {
    setMenuPrioridade(false);
    setMenuCategoria(anterior => !anterior);
  }
  const abrirPrioridade = () => {
    setMenuCategoria(false);
    setMenuPrioridade(anterior => !anterior);
  }

  const submitChamada = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setErros('');

    let errosT = ('');
    let errosContagem = 0;
    try {
      if (requerenteEmail.length < 10 || !requerenteEmail.includes("@")) {
        errosT += "Por favor, insira um e-mail válido!";
        errosContagem++;
      }
      if (requerente.length < 3) {
        errosT += '\nPor favor, insira um nome válido!';
        errosContagem++;
      }
      if (titulo.length < 4) {
        errosT += `\nPor favor, insira um título válido!`;
        errosContagem++;
      }
      if (categoria == "- Selecione uma categoria -") {
        errosT += '\nPor favor, selecione o tema!';
        errosContagem++;
      }
      if (prioridade == "- Selecione a prioridade -") {
        errosT += '\nPor favor, selecione a prioridade!';
        errosContagem++;
      }
      if (descricao.length < 8) {
        errosT += `\nPor favor, dê mais detalhes!`;
        errosContagem++;
      }
      if (!idUser) {
        errosT += `\nNão foi possível identificar você!`
        errosContagem++;
      }

      if (errosT !== '') throw new Error;

      const { error } = await supabase.rpc('criar_chamada', {
        p_titulo: titulo,
        p_descricao: descricao,
        p_prioridade: prioridade,
        p_email: requerenteEmail,
        p_requerente: requerente,
        p_categoria: categoria,
        p_client_id: idUser || '',
        p_ip: helperChamada || '',
      });

      if (error) {
        setErros(error.message);
        return;
      }

      setTitulo('');
      setRequerente(tecnicoLogado?.nome ?? '');
      setRequerenteEmail(tecnicoLogado?.email ?? '');
      setDescricao('');
      setCategoria('- Selecione uma categoria -');
      setPrioridade('- Selecione a prioridade -');

      setTitulo("");
      fecharMenus();

    } catch (err: any) {
      setErros("ERROS: " + errosContagem + "\n\n" + erros);
    } finally {
      setLoading(false);
    }
  }

  const bg = darkMode ? '#18181B' : '#f7f7f9'
  const border = darkMode ? '#2f2f3e' : '#9090ffbb'
  const text = darkMode ? '#e8e8ea' : '#0f172a'
  const inputBg = darkMode ? '#1c1c21' : '#F9F9F7'
  const accent = darkMode ? '#3b83f638' : '#1904fd28'
  const placeholderColor = darkMode
    ? "#71717a"
    : "#9ca3af";
  const muted = darkMode ? '#6b6b78' : '#6b7280'
  const primary = darkMode ? '#1e3a8a' : '#1904fd'
  const primaryHover = darkMode ? '#1e40af' : '#1904fd'

  useEffect(() => {
    let id = localStorage.getItem('chamada_client_id');

    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem('chamada_client_id', id);
    }

    setidUser(id);
  }, []);

  useEffect(() => {
    async function helperFn() {
      try {
        const response = await fetch(
          "https://api.ipify.org?format=json"
        );
        const data = await response.json();
        setHelperChamada(data.ip);
      } catch (error) {
      }
    }
    helperFn();
  }, []);

  return (
    <>
      <motion.div className="flex-col relative min-h-screen overflow-x-hidden flex px-25 pt-14"
        animate={{
          background: bg,
          color: text,
        }}
      >
        <motion.div
          className="flex items-end justify-between  pt-12 pb-10"
        >
          <motion.div className="w-200">
            <motion.h2
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0, color: text }}
              className="text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
            >
              Todas as chamadas
            </motion.h2>

            <motion.div className="relative w-full mt-5">
              <motion.input
                type="text"
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
                placeholder="Pesquisar por título, descrição, datas..."
                className="w-full py-3 pl-12 pr-4 text-sm border outline-none rounded-sm"
                animate={{
                  background: inputBg,
                  borderColor: border,
                  color: text,
                }}
                onFocus={(e) => (e.target.style.borderColor = accent)}
                onBlur={(e) => (e.target.style.borderColor = border)}
              />

              <motion.div
                className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                animate={{ color: placeholderColor }}
              >
                <Search size={25} />
              </motion.div>
            </motion.div>

          </motion.div>

          <motion.button
            onClick={alterarMenuChamadas}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            <Plus size={17} strokeWidth={2} />
            <span>Adicionar chamada</span>
          </motion.button>
        </motion.div>

        <TabelaChamadas pesquisa={pesquisa} />

      </motion.div>

      <AnimatePresence mode='wait'>
        {(menuAbertoChamadas) && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                fecharMenus();
              }}
              className="fixed inset-0 z-[999] bg-black/40"
            />

            <motion.div
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              animate={{
                opacity: 1,
                backgroundColor: bg,
                color: text
              }}
              className="z-[1000] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] p-6 rounded-lg shadow-xl "
            >
              <motion.h2 className="text-xl font-bold mb-8">
                Criar Chamada
              </motion.h2>

              <motion.form onSubmit={(e) => {
                submitChamada(e)
              }}
                className="space-y-5"
              >
                <motion.div className="grid grid-cols-2 gap-4">
                  <motion.div className="flex flex-col gap-4">

                    <motion.div>
                      <motion.label className="block text-xs font-mono tracking-widest uppercase mb-2" style={{ color: muted }}>
                        Seu nome:
                      </motion.label>
                      <motion.input
                        value={requerente}
                        onChange={e => setRequerente(e.target.value)}
                        placeholder="Ex: Pedro Silva"
                        className={`w-full px-4 py-3 text-sm border outline-none rounded-sm`}
                        animate={{
                          background: inputBg,
                          borderColor: border,
                          color: text,
                        }}
                        onFocus={e => (e.target.style.borderColor = accent)}
                        onBlur={e => (e.target.style.borderColor = border)}
                      />
                    </motion.div>

                    <motion.div>
                      <motion.label className="block text-xs font-mono tracking-widest uppercase mb-2" style={{ color: muted }}>
                        Prioridade:
                      </motion.label>
                      <motion.div className="relative">
                        <motion.button
                          type="button"
                          onClick={() => abrirPrioridade()}
                          value={prioridade}
                          onChange={e => setPrioridade(e.target.value)}
                          className={`w-full text-left px-4 py-3 pr-11 text-sm outline-none rounded-t-sm`}
                          animate={{
                            background: inputBg,
                            color: text,
                            borderTop: `1px solid ${border}`,
                            borderBottom: menuPrioridade ? "1px solid transparent" : `1px solid ${border}`,
                            borderLeft: `1px solid ${border}`,
                            borderRight: `1px solid ${border}`,
                          }}
                          onFocus={e => (e.target.style.borderColor = accent)}
                          onBlur={e => (e.target.style.borderColor = border)}
                        >
                          <motion.p
                            animate={{
                              color: prioridade == "- Selecione a prioridade -" ? muted : text,
                            }}
                          >
                            {prioridade}
                          </motion.p>

                          <AnimatePresence>
                            {menuPrioridade && (
                              <motion.div
                                initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
                                exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
                                className="absolute left-0 top-full w-full rounded-b-sm shadow-lg z-50"
                                animate={{
                                  opacity: 1,
                                  y: 0,
                                  scaleY: 1,
                                  background: inputBg,
                                  borderColor: border,
                                  borderBottom: `1px solid ${border}`,
                                  borderTop: menuPrioridade ? "1px solid transparent" : `1px solid ${border}`,
                                  borderLeft: `1px solid ${border}`,
                                  borderRight: `1px solid ${border}`,
                                }}
                              >
                                <motion.p
                                  onClick={() => setPrioridade('Baixa')}
                                  animate={{
                                    color: text,
                                  }}
                                  whileHover={{
                                    backgroundColor: "#0a38b7",
                                    color: "white",
                                  }}
                                  className={`px-4 py-2`}
                                >
                                  Baixa
                                </motion.p>

                                <motion.p
                                  onClick={() => setPrioridade('Média')}
                                  animate={{
                                    color: text,
                                  }}
                                  whileHover={{
                                    backgroundColor: "#0a38b7",
                                    color: "white",
                                  }}
                                  className={`px-4 py-2`}
                                >
                                  Média
                                </motion.p>


                                <motion.p
                                  onClick={() => setPrioridade('Alta')}
                                  animate={{
                                    color: text,
                                  }}
                                  whileHover={{
                                    backgroundColor: "#0a38b7",
                                    color: "white",
                                  }}
                                  className={`px-4 py-2`}
                                >
                                  Alta
                                </motion.p>


                                <motion.p
                                  onClick={() => setPrioridade('Crítica')}
                                  animate={{
                                    color: text,
                                  }}
                                  whileHover={{
                                    backgroundColor: "#0a38b7",
                                    color: "white",
                                  }}
                                  className={`px-4 py-2`}
                                >
                                  Crítica
                                </motion.p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                  <motion.div className="flex flex-col gap-4">
                    <motion.div>
                      <motion.label className="block text-xs font-mono tracking-widest uppercase mb-2" style={{ color: muted }}>
                        Seu e-mail:
                      </motion.label>
                      <motion.input
                        type="email"
                        autoComplete="email"
                        value={requerenteEmail}
                        onChange={e => setRequerenteEmail(e.target.value)}
                        placeholder="usuario@transgabardo.com.br"
                        className={`w-full px-4 py-3 text-sm border outline-none rounded-sm`}
                        animate={{
                          background: inputBg,
                          borderColor: border,
                          color: text,
                        }}
                        onFocus={e => (e.target.style.borderColor = accent)}
                        onBlur={e => (e.target.style.borderColor = border)}
                      />
                    </motion.div>

                    <motion.div>
                      <motion.label className="block text-xs font-mono tracking-widest uppercase mb-2" style={{ color: muted }}>
                        Tema do problema:
                      </motion.label>
                      <motion.div className="relative">
                        <motion.button
                          type="button"
                          onClick={() => abrirCategoria()}
                          value={categoria}
                          onChange={e => setCategoria(e.target.value)}
                          className={`w-full text-left px-4 py-3 pr-11 text-sm outline-none rounded-t-sm`}
                          animate={{
                            background: inputBg,
                            color: text,
                            borderTop: `1px solid ${border}`,
                            borderBottom: menuCategoria ? "1px solid transparent" : `1px solid ${border}`,
                            borderLeft: `1px solid ${border}`,
                            borderRight: `1px solid ${border}`,
                          }}
                          onFocus={e => (e.target.style.borderColor = accent)}
                          onBlur={e => (e.target.style.borderColor = border)}
                        >
                          <motion.p
                            animate={{
                              color: categoria == "- Selecione uma categoria -" ? muted : text,
                            }}
                          >
                            {categoria}
                          </motion.p>

                          <AnimatePresence>
                            {menuCategoria && (
                              <motion.div
                                initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
                                exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
                                className="absolute left-0 top-full w-full rounded-b-sm shadow-lg z-50"
                                animate={{
                                  opacity: 1,
                                  y: 0,
                                  scaleY: 1,
                                  background: inputBg,
                                  borderColor: border,
                                  borderBottom: `1px solid ${border}`,
                                  borderTop: menuCategoria ? "1px solid transparent" : `1px solid ${border}`,
                                  borderLeft: `1px solid ${border}`,
                                  borderRight: `1px solid ${border}`,
                                }}
                              >
                                <motion.p
                                  onClick={() => setCategoria('Equipamento/Hardware')}
                                  animate={{
                                    color: text,
                                  }}
                                  whileHover={{
                                    backgroundColor: "#0a38b7",
                                    color: "white",
                                  }}
                                  className={`px-4 py-2`}
                                >
                                  Equipamento/Hardware
                                </motion.p>

                                <motion.p
                                  onClick={() => setCategoria('Software')}
                                  animate={{
                                    color: text,
                                  }}
                                  whileHover={{
                                    backgroundColor: "#0a38b7",
                                    color: "white",
                                  }}
                                  className={`px-4 py-2`}
                                >
                                  Software
                                </motion.p>


                                <motion.p
                                  onClick={() => setCategoria('Rede')}
                                  animate={{
                                    color: text,
                                  }}
                                  whileHover={{
                                    backgroundColor: "#0a38b7",
                                    color: "white",
                                  }}
                                  className={`px-4 py-2`}
                                >
                                  Rede
                                </motion.p>


                                <motion.p
                                  onClick={() => setCategoria('SOWX')}
                                  animate={{
                                    color: text,
                                  }}
                                  whileHover={{
                                    backgroundColor: "#0a38b7",
                                    color: "white",
                                  }}
                                  className={`px-4 py-2`}
                                >
                                  SOWX
                                </motion.p>


                                <motion.p
                                  onClick={() => setCategoria('Conta de usuário')}
                                  animate={{
                                    color: text,
                                  }}
                                  whileHover={{
                                    backgroundColor: "#0a38b7",
                                    color: "white",
                                  }}
                                  className={`px-4 py-2`}
                                >
                                  Conta de usuário
                                </motion.p>


                                <motion.p
                                  onClick={() => setCategoria('Outros')}
                                  animate={{
                                    color: text,
                                  }}
                                  whileHover={{
                                    backgroundColor: "#0a38b7",
                                    color: "white",
                                  }}
                                  className={`px-4 py-2`}
                                >
                                  Outros
                                </motion.p>
                              </motion.div>
                            )}
                          </AnimatePresence>

                        </motion.button>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </motion.div>


                <motion.div>
                  <motion.label className="block text-xs font-mono tracking-widest uppercase mb-2" style={{ color: muted }}>
                    Título:
                  </motion.label>
                  <motion.div className="relative">
                    <motion.input
                      value={titulo}
                      onChange={e => setTitulo(e.target.value)}
                      placeholder="Ex: Problema de conexão"
                      className={`w-full px-4 py-3 pr-11 text-sm border outline-none rounded-sm`}
                      animate={{ background: inputBg, borderColor: border, color: text }}
                      onFocus={e => (e.target.style.borderColor = accent)}
                      onBlur={e => (e.target.style.borderColor = border)}
                    />
                  </motion.div>
                </motion.div>


                <motion.div className="flex flex-col gap-4">
                  <motion.div>
                    <motion.label className="block pl-2 text-xs font-mono tracking-widest uppercase mb-2" style={{ color: muted }}>
                      Dê mais detalhes sobre o problema:
                    </motion.label>
                    <motion.textarea
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                      className={`w-full resize-none whitespace-pre-wrap break-words text-start h-30 px-4 py-3 text-sm border outline-none rounded-sm`}
                      animate={{
                        backgroundColor: inputBg,
                        borderColor: border,
                        color: text,
                      }}
                    />
                  </motion.div>
                </motion.div>
                <AnimatePresence>
                  {(erros !== '') && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-4 py-3 text-xs font-mono rounded-sm whitespace-pre-line"
                      style={{ background: '#7f1d1d22', color: '#ef4444', border: '1px solid #ef444440' }}
                    >
                      {erros}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`w-full py-3 text-sm font-semibold tracking-wider rounded mt-2`}
                  animate={{
                    background: loading ? muted : primary,
                    color: '#ffffff',
                    opacity: loading ? 0.6 : 1,
                  }}
                  onMouseEnter={e => !loading && ((e.target as HTMLElement).style.background = primaryHover)}
                  onMouseLeave={e => !loading && ((e.target as HTMLElement).style.background = primary)}
                >
                  {loading ? (
                    <motion.span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                      Enviando...
                    </motion.span>
                  ) : 'Enviar'}
                </motion.button>
              </motion.form>

              <motion.button
                onClick={fecharMenus}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`w-full py-3 text-sm font-semibold tracking-wider rounded mt-2`}
                animate={{
                  background: "#dc0909",
                  color: '#ffffff',
                  opacity: loading ? 0.6 : 1,
                }}
              >
                Cancelar
              </motion.button>
            </motion.div>
          </>


        )}
      </AnimatePresence >
    </>
  );
}
