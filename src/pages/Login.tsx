'use client';

import TargetCursor from '@/componentes/animacoes/Cursor';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHeader } from '@/contextos/Header';
import { useAutenticacao } from "@/contextos/Autenticacao";
import LiquidEther from '@/componentes/animacoes/Fumaca';
import { MessageSquarePlus, User2, ArrowLeft } from 'lucide-react';
import FoldText from '@/componentes/personalizados/TextoChamado';

import { useNavigate } from 'react-router-dom';

import { supabase } from '@/lib/supabase';

export default function Login() {
  const { darkMode } = useHeader();
  const authen = useAutenticacao();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [aba, setAba] = useState("painel");
  const [animarMouse, setAnimarMouse] = useState(true);

  const [emailChamada, setEmailChamada] = useState("");
  const [nomeChamada, setNomeChamada] = useState("");
  const [tituloChamada, setTituloChamada] = useState("");
  const [detalhesChamada, setDetalhesChamada] = useState("");
  const [categoriaChamada, setCategoriaChamada] = useState("- Selecione uma categoria -");
  const [helperChamada, setHelperChamada] = useState("");
  const [erroChamada, setErroChamada] = useState<string | null>('');
  const [carregandoChamada, setCarregandoChamada] = useState(false);
  const [menuCategoria, setMenuCategoria] = useState(false);
  const [idUser, setidUser] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [chamadaEnviada, setChamadaEnviada] = useState(false);

  const abrirCategoria = () => setMenuCategoria(anterior => !anterior);

  const bg = darkMode ? '#020202' : '#f7f7f9'
  const card = darkMode ? '#1414178b' : '#ffffff98'
  const border = darkMode ? '#2f2f3e' : '#9090ffbb'
  const text = darkMode ? '#e8e8ea' : '#0f172a'
  const muted = darkMode ? '#6b6b78' : '#6b7280'
  const primary = darkMode ? '#1e3a8a' : '#1904fd'
  const primaryHover = darkMode ? '#1e40af' : '#1904fd'
  const inputBg = darkMode ? '#1c1c21' : '#F9F9F7'
  const accent = darkMode ? '#3b83f638' : '#1904fd28'
  const cursorzinho = 'cursor-target';

  const submitChamada = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (carregandoChamada) return;

    setCarregandoChamada(true);
    setErroChamada('');

    let erros = ('');
    let errosContagem = 0;
    try {
      if (emailChamada.length < 10 || !emailChamada.toLowerCase().includes("gabardo") || !emailChamada.includes("@")) {
        erros += "Por favor, insira um e-mail válido!";
        errosContagem++;
      }
      if (nomeChamada.length < 3) {
        erros += '\nPor favor, insira um nome válido!';
        errosContagem++;
      }
      if (tituloChamada.length < 4) {
        erros += `\nPor favor, insira um título válido!`;
        errosContagem++;
      }
      if (categoriaChamada == "- Selecione uma categoria -") {
        erros += '\nPor favor, selecione o tema!';
        errosContagem++;
      }
      if (detalhesChamada.length < 8) {
        erros += `\nPor favor, dê mais detalhes!`;
        errosContagem++;
      }
      if (!idUser) {
        erros += `\nNão foi possível identificar você!`
        errosContagem++;
      }

      if (erros !== '') throw new Error;

      const { data, error } = await supabase.rpc('criar_chamada', {
        p_titulo: tituloChamada,
        p_descricao: detalhesChamada,
        p_email: emailChamada,
        p_requerente: nomeChamada,
        p_categoria: categoriaChamada,
        p_client_id: idUser || '',
        p_ip: helperChamada || '',
      });

      if (error) {
        setErroChamada(error.message);
        return;
      }

      setTituloChamada('');
      setNomeChamada('');
      setEmailChamada('');
      setDetalhesChamada('');
      setCategoriaChamada('- Selecione uma categoria -');
      setTituloChamada("");
      chamadoFoi();

    } catch (err: any) {
      setErroChamada("ERROS: " + errosContagem + "\n\n" + erros);
    } finally {
      setCarregandoChamada(false);
    }
  }

  const chamadoFoi = () => {
    setAba('painel');
    setChamadaEnviada(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setChamadaEnviada(false);
    }, 3000);
  };

  const logar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const ok = await authen.login(email, senha);

    if (!ok) return;

    navigate('/painel', {
      state: {
        email,
        user: authen.user,
      },
    });
  }

  useEffect(() => {
    if (authen.sessao || authen.user) {
      navigate('/painel', { replace: true });
    }
  }, [authen.sessao, authen.user, navigate]);

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
    <motion.div
      className="relative min-h-screen overflow-x-hidden flex items-center  justify-center"
      animate={{ background: bg }}
    >
      <TargetCursor
        spinDuration={0}
        hideDefaultCursor
        parallaxOn
        hoverDuration={0.2}
        cursorColor="#4000ff"
        cursorColorOnTarget="#4000ff"
        enabled={animarMouse}
      />

      <div className="absolute inset-0 z-0">
        <LiquidEther
          colors={['#c5bafe', '#7b6cfb', '#c1bbff']}
          mouseForce={darkMode ? 16 : 8}
          cursorSize={20}
          isViscous
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.1}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      <AnimatePresence>
        {chamadaEnviada && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 backdrop-blur-xl"
              animate={{
                backgroundColor: darkMode
                  ? 'rgba(0, 0, 0, 0.55)'
                  : 'rgba(53, 44, 95, 0.65)',
              }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{
                duration: 0.35,
                ease: 'easeOut',
              }}
              className="relative w-200"
            >
              <motion.div
                className="rounded-4xl border p-10 shadow-2xl text-center"
                animate={{
                  background: card,
                  borderColor: border,
                }}
              >
                <FoldText
                  text="Chamado enviado!"
                  splitBy="char"
                  hinge="top"
                  trigger="mount"
                  duration={0.7}
                  stagger={0.03}
                  ease="power3.out"
                  perspective={700}
                  creaseShading={0.65}
                  fontSize={44}
                  fontWeight={800}
                  color={(darkMode ? "#8e83ff" : "#1b16b3")}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      <motion.div className="relative w-full z-10">
        <AnimatePresence mode='wait' initial={false}>
          <motion.div
            key={aba}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            onAnimationStart={() => setAnimarMouse(false)}
            onAnimationComplete={() => setAnimarMouse(true)}
            className="w-full"
          >
            <motion.div
              style={{
                pointerEvents: animarMouse ? 'auto' : 'none',
              }}
            >
              {(aba == "login") && (
                <div className="w-full max-w-md mx-auto">
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, x: -130 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full shadow-[0_0_15px_5px_rgba(0,0,0,0.3)] max-w-md z-10"
                    exit={{ opacity: 0, x: 130 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="rounded-sm border pt-5 px-6 pb-15 shadow-xl"
                      animate={{ background: card, borderColor: border }}
                    >
                      <motion.button
                        onClick={() => { authen.limparErro(); setAba("painel"); }}
                        whileHover={{
                          scale: 1.05,
                        }}
                        className={`flex ${cursorzinho} mb-10 px-2  items-center gap-3`}>
                        <ArrowLeft color={text} size={20} strokeWidth={2} />
                        <motion.span animate={{ color: text }}>VOLTAR</motion.span>
                      </motion.button>

                      <motion.div className="flex justify-between items-center gap-3 mb-10">
                        <motion.div className="w-1 h-10" animate={{ background: accent }} />
                        <div>
                          <motion.div className="text-2xl font-semibold leading-tight"
                            animate={{ color: text }}>
                            LOGIN
                          </motion.div>
                        </div>
                        <motion.div className="w-1 h-10" style={{ background: accent }} />

                      </motion.div>

                      <motion.form onSubmit={
                        logar
                      } className="space-y-5">
                        <motion.div>
                          <motion.label className="block text-xs font-mono tracking-widest uppercase mb-2" animate={{ color: muted }}>
                            E-mail
                          </motion.label>
                          <motion.input
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="usuario@empresa.com.br"
                            className={`w-full ${cursorzinho} px-4 py-3 text-sm border outline-none rounded-sm`}
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
                            Senha
                          </motion.label>
                          <motion.div className="relative">
                            <motion.input
                              type={mostrarSenha ? 'text' : 'password'}
                              autoComplete="current-password"
                              value={senha}
                              onChange={e => setSenha(e.target.value)}
                              placeholder="••••••••"
                              className={`${cursorzinho} w-full px-4 py-3 pr-11 text-sm border outline-none rounded-sm`}
                              animate={{ background: inputBg, borderColor: border, color: text }}
                              onFocus={e => (e.target.style.borderColor = accent)}
                              onBlur={e => (e.target.style.borderColor = border)}
                            />
                            <motion.button
                              type="button"
                              onClick={() => setMostrarSenha(p => !p)}
                              className={`${cursorzinho} absolute right-3 top-1/2 -translate-y-1/2`}
                              animate={{ color: muted }}
                            >
                              {mostrarSenha ? (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                  <line x1="1" y1="1" x2="23" y2="23" />
                                </svg>
                              ) : (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                  <circle cx="12" cy="12" r="3" />
                                </svg>
                              )}
                            </motion.button>
                          </motion.div>
                        </motion.div>

                        <AnimatePresence>
                          {authen.erro && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              exit={{ opacity: 0, height: 0 }}
                              className="px-4 py-3 text-xs font-mono rounded-sm"
                              animate={{
                                opacity: 1,
                                height: 'auto',
                                background: '#7f1d1d22',
                                color: '#ef4444',
                                border: '1px solid #ef444440'
                              }}
                            >
                              {authen.erro}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <motion.button
                          type="submit"
                          disabled={authen.carregando}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className={`${cursorzinho} w-full py-3 text-sm font-semibold tracking-wider rounded mt-2`}
                          animate={{
                            background: authen.carregando ? muted : primary,
                            color: '#ffffff',
                            opacity: authen.carregando ? 0.6 : 1,
                          }}
                          onMouseEnter={e => !authen.carregando && ((e.target as HTMLElement).style.background = primaryHover)}
                          onMouseLeave={e => !authen.carregando && ((e.target as HTMLElement).style.background = primary)}
                        >
                          {authen.carregando ? (
                            <motion.span className="flex items-center justify-center gap-2">
                              <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                              </svg>
                              Autenticando...
                            </motion.span>
                          ) : 'Entrar'}
                        </motion.button>
                      </motion.form>
                    </motion.div>
                  </motion.div>
                </div>
              )}







              {(aba == "painel") && (
                <motion.div className="w-full max-w-4xl mx-auto">

                  <motion.div
                    key="painel"
                    initial={{ opacity: 0, x: -130 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full shadow-[0_0_15px_5px_rgba(0,0,0,0.3)] max-w-4xl z-10"
                    exit={{ opacity: 0, x: 130 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="rounded-sm border p-10 shadow-xl"
                      animate={{ background: card, borderColor: border }}
                    >
                      <motion.div className="flex justify-between items-center gap-3 mb-10">
                        <motion.div className="w-1 h-10" style={{ background: accent }} />
                        <motion.div>
                          <motion.div className="text-3xl font-semibold leading-tight"
                            animate={{ color: text }}>
                            ESCOLHA UMA OPÇÃO:
                          </motion.div>
                        </motion.div>
                        <motion.div className="w-1 h-10" style={{ background: accent }} />
                      </motion.div>

                      <motion.div
                        className="space-y-5">
                        <motion.div className="flex justify-around mt-8 py-20 border-t" animate={{ borderColor: border }}>
                          <motion.button
                            onClick={() => { setAba('chamada'); setChamadaEnviada(false); }}
                            className={`
                              flex 
                              flex-col 
                              flex-1 
                              items-center
                              justify-center
                            `}
                            animate={{ color: text }}
                            whileHover={{ scale: 1.2 }}
                            transition={{
                              duration: 0.3,
                              ease: "easeOut"
                            }}
                          >
                            <MessageSquarePlus size={120} strokeWidth={2} />
                            <motion.span className="text-4xl pt-6">Criar chamada</motion.span>
                          </motion.button>
                          <motion.button
                            onClick={() => setAba("login")}
                            animate={{ color: text }}
                            whileHover={{ scale: 1.2 }}
                            transition={{
                              duration: 0.3,
                              ease: "easeOut"
                            }}
                            className="flex flex-col flex-1 items-center justify-center"
                          >
                            <User2 size={120} strokeWidth={2} />
                            <motion.span className="text-4xl pt-6">Login</motion.span>
                          </motion.button>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}






              {(aba == "chamada") && (
                <motion.div className="w-full max-w-xl mx-auto">

                  <motion.div
                    key="chamada"
                    initial={{ opacity: 0, x: -130 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="shadow-[0_0_15px_5px_rgba(0,0,0,0.3)] w-full max-w-xl z-10"
                    exit={{ opacity: 0, x: 130 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="rounded-sm border pt-5 px-6 pb-15 shadow-xl"
                      animate={{
                        background: card,
                        borderColor: border
                      }}
                    >
                      <motion.button
                        onClick={() => { setErroChamada(''); setAba("painel"); }}
                        whileHover={{
                          scale: 1.05,
                        }}
                        className={`flex ${cursorzinho} mb-10 px-2 items-center gap-3`}>
                        <ArrowLeft color={text} size={20} strokeWidth={2} />
                        <motion.span animate={{ color: text }}>VOLTAR</motion.span>
                      </motion.button>

                      <motion.div className="flex justify-between items-center gap-3 mb-10">
                        <motion.div className="w-1 h-10" animate={{ background: accent }} />
                        <motion.div>
                          <motion.div className="text-2xl font-semibold leading-tight"
                            animate={{ color: text }}>
                            NOS ENVIE UM CHAMADO:
                          </motion.div>
                        </motion.div>
                        <motion.div className="w-1 h-10" style={{ background: accent }} />

                      </motion.div>

                      <motion.form onSubmit={(e) => {
                        submitChamada(e)
                      }}
                        className="space-y-5"
                        onAnimationComplete={() => setAnimarMouse(true)}
                        onAnimationStart={() => setAnimarMouse(false)}
                      >
                        <motion.div className='flex flex-row justify-around'>
                          <motion.div className="flex flex-col gap-4">
                            <motion.div>
                              <motion.label className="block text-xs font-mono tracking-widest uppercase mb-2" style={{ color: muted }}>
                                Seu e-mail:
                              </motion.label>
                              <motion.input
                                type="email"
                                autoComplete="email"
                                value={emailChamada}
                                onChange={e => setEmailChamada(e.target.value)}
                                placeholder="usuario@transgabardo.com.br"
                                className={`w-full px-4 py-3 text-sm border outline-none rounded-sm ${cursorzinho}`}
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
                                Título:
                              </motion.label>
                              <motion.div className="relative">
                                <motion.input
                                  value={tituloChamada}
                                  onChange={e => setTituloChamada(e.target.value)}
                                  placeholder="Ex: Problema de conexão"
                                  className={`w-full px-4 py-3 pr-11 text-sm border outline-none rounded-sm ${cursorzinho}`}
                                  animate={{ background: inputBg, borderColor: border, color: text }}
                                  onFocus={e => (e.target.style.borderColor = accent)}
                                  onBlur={e => (e.target.style.borderColor = border)}
                                />
                              </motion.div>
                            </motion.div>
                          </motion.div>
                          <motion.div className="flex flex-col min-w-55 gap-4">
                            <motion.div>
                              <motion.label className="block text-xs font-mono tracking-widest uppercase mb-2" style={{ color: muted }}>
                                Seu nome:
                              </motion.label>
                              <motion.input
                                value={nomeChamada}
                                onChange={e => setNomeChamada(e.target.value)}
                                placeholder="Ex: Pedro Silva"
                                className={`w-full px-4 py-3 text-sm border outline-none rounded-sm ${cursorzinho}`}
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
                                  value={categoriaChamada}
                                  onChange={e => setCategoriaChamada(e.target.value)}
                                  className={`w-65 text-left px-4 py-3 pr-11 text-sm outline-none rounded-t-sm ${cursorzinho}`}
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
                                      color: categoriaChamada == "- Selecione uma categoria -" ? muted : text,
                                    }}
                                  >
                                    {categoriaChamada}
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
                                          onClick={() => setCategoriaChamada('Equipamento/Hardware')}
                                          animate={{
                                            color: text,
                                          }}
                                          whileHover={{
                                            backgroundColor: "#0a38b7",
                                            color: "white",
                                          }}
                                          className={`${cursorzinho} px-4 py-2`}
                                        >
                                          Equipamento/Hardware
                                        </motion.p>

                                        <motion.p
                                          onClick={() => setCategoriaChamada('Software')}
                                          animate={{
                                            color: text,
                                          }}
                                          whileHover={{
                                            backgroundColor: "#0a38b7",
                                            color: "white",
                                          }}
                                          className={`${cursorzinho} px-4 py-2`}
                                        >
                                          Software
                                        </motion.p>


                                        <motion.p
                                          onClick={() => setCategoriaChamada('Rede')}
                                          animate={{
                                            color: text,
                                          }}
                                          whileHover={{
                                            backgroundColor: "#0a38b7",
                                            color: "white",
                                          }}
                                          className={`${cursorzinho} px-4 py-2`}
                                        >
                                          Rede
                                        </motion.p>


                                        <motion.p
                                          onClick={() => setCategoriaChamada('SOWX')}
                                          animate={{
                                            color: text,
                                          }}
                                          whileHover={{
                                            backgroundColor: "#0a38b7",
                                            color: "white",
                                          }}
                                          className={`${cursorzinho} px-4 py-2`}
                                        >
                                          SOWX
                                        </motion.p>


                                        <motion.p
                                          onClick={() => setCategoriaChamada('Conta de usuário')}
                                          animate={{
                                            color: text,
                                          }}
                                          whileHover={{
                                            backgroundColor: "#0a38b7",
                                            color: "white",
                                          }}
                                          className={`${cursorzinho} px-4 py-2`}
                                        >
                                          Conta de usuário
                                        </motion.p>


                                        <motion.p
                                          onClick={() => setCategoriaChamada('Outros')}
                                          animate={{
                                            color: text,
                                          }}
                                          whileHover={{
                                            backgroundColor: "#0a38b7",
                                            color: "white",
                                          }}
                                          className={`${cursorzinho} px-4 py-2`}
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
                        <motion.div className="flex flex-col gap-4">
                          <motion.div>
                            <motion.label className="block pl-2 text-xs font-mono tracking-widest uppercase mb-2" style={{ color: muted }}>
                              Dê mais detalhes sobre o problema:
                            </motion.label>
                            <motion.textarea
                              value={detalhesChamada}
                              onChange={(e) => setDetalhesChamada(e.target.value)}
                              className={`w-full resize-none whitespace-pre-wrap break-words text-start h-30 px-4 py-3 text-sm border outline-none rounded-sm ${cursorzinho}`}
                              animate={{
                                backgroundColor: inputBg,
                                borderColor: border,
                                color: text,
                              }}
                            />
                          </motion.div>
                        </motion.div>
                        <AnimatePresence>
                          {(erroChamada !== '') && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="px-4 py-3 text-xs font-mono rounded-sm whitespace-pre-line"
                              style={{ background: '#7f1d1d22', color: '#ef4444', border: '1px solid #ef444440' }}
                            >
                              {erroChamada}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <motion.button
                          type="submit"
                          disabled={carregandoChamada}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className={`w-full py-3 text-sm font-semibold tracking-wider rounded mt-2 ${cursorzinho}`}
                          animate={{
                            background: carregandoChamada ? muted : primary,
                            color: '#ffffff',
                            opacity: carregandoChamada ? 0.6 : 1,
                          }}
                          onMouseEnter={e => !carregandoChamada && ((e.target as HTMLElement).style.background = primaryHover)}
                          onMouseLeave={e => !carregandoChamada && ((e.target as HTMLElement).style.background = primary)}
                        >
                          {carregandoChamada ? (
                            <motion.span className="flex items-center justify-center gap-2">
                              <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                              </svg>
                              Enviando...
                            </motion.span>
                          ) : 'Entrar'}
                        </motion.button>
                      </motion.form>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div >
  )
}
