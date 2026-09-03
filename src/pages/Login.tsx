'use client';

import TargetCursor from '@/componentes/animacoes/Cursor';
import {
  memo,
  useEffect,
  useRef,
  useState
} from 'react';

import {
  motion,
  AnimatePresence,
  useMotionValue,
  animate
} from 'motion/react';

import { useHeader } from '@/contextos/Header';
import { useAutenticacao } from '@/contextos/Autenticacao';
import LiquidEther from '@/componentes/animacoes/Fumaca';

import {
  MessageSquarePlus,
  Shield,
  User2,
  ArrowLeft
} from 'lucide-react';

import FoldText from '@/componentes/personalizados/TextoChamado';

import { useNavigate } from 'react-router-dom';

import { supabase } from '@/lib/supabase';

/* ============================================================
   TIPOS
   ============================================================ */

type Aba = 'painel' | 'login' | 'chamada';

interface Tema {
  bg: string;
  card: string;
  border: string;
  text: string;
  muted: string;
  primary: string;
  primaryHover: string;
  inputBg: string;
  accent: string;
}

/* ============================================================
   COMPONENTE PRINCIPAL
   ============================================================ */

export default function Login() {
  const { darkMode } = useHeader();
  const authen = useAutenticacao();
  const navigate = useNavigate();

  /*
   * ============================================================
   * DADOS QUE NÃO PRECISAM DE RENDER
   * ============================================================
   */

  const idUserRef = useRef<string | null>(null);
  const helperChamadaRef = useRef('');

  /*
   * ============================================================
   * ABA
   *
   * NÃO usamos mais useState para trocar visualmente a aba.
   *
   * A aba fica em uma ref.
   *
   * A animação visual é controlada exclusivamente por
   * MotionValues, portanto trocar de aba não provoca render
   * do componente principal.
   * ============================================================
   */

  /*
   * ============================================================
   * CHAMADO ENVIADO
   *
   * Mantido como state porque o modal realmente precisa
   * aparecer/desaparecer.
   * ============================================================
   */

  const [chamadaEnviada, setChamadaEnviada] =
    useState(false);

  const timerRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  /*
   * ============================================================
   * TEMA
   * ============================================================
   */

  const tema: Tema = {
    bg: darkMode ? '#020202' : '#f7f7f9',
    card: darkMode ? '#1414178b' : '#ffffff98',
    border: darkMode ? '#2f2f3e' : '#9090ffbb',
    text: darkMode ? '#e8e8ea' : '#0f172a',
    muted: darkMode ? '#6b6b78' : '#6b7280',
    primary: darkMode ? '#1e3a8a' : '#1904fd',
    primaryHover: darkMode ? '#1e40af' : '#1904fd',
    inputBg: darkMode ? '#1c1c21' : '#F9F9F7',
    accent: darkMode ? '#3b83f638' : '#1904fd28',
  };

  /*
   * ============================================================
   * SESSÃO
   * ============================================================
   */

  useEffect(() => {
    if (authen.sessao || authen.user) {
      navigate('/painel', {
        replace: true
      });
    }
  }, [
    authen.sessao,
    authen.user,
    navigate
  ]);

  /*
   * ============================================================
   * CLIENT ID
   * ============================================================
   */

  useEffect(() => {
    let id = localStorage.getItem(
      'chamada_client_id'
    );

    if (!id) {
      id = crypto.randomUUID();

      localStorage.setItem(
        'chamada_client_id',
        id
      );
    }

    idUserRef.current = id;
  }, []);

  /*
   * ============================================================
   * IP
   * ============================================================
   */

  useEffect(() => {
    async function helperFn() {
      try {
        const response = await fetch(
          'https://api.ipify.org?format=json'
        );

        const data = await response.json();

        helperChamadaRef.current = data.ip;
      } catch {
        // Ignora erro de IP
      }
    }

    helperFn();
  }, []);

  /*
   * ============================================================
   * CHAMADO ENVIADO
   * ============================================================
   */

  const chamadoFoi = () => {
    /*
     * IMPORTANTE:
     *
     * Não usamos setAba.
     *
     * A troca para painel é feita pelo sistema de MotionValues
     * dentro de NavegacaoAbas.
     */

    trocarAbaRef.current?.('painel');

    setChamadaEnviada(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setChamadaEnviada(false);
    }, 3000);
  };

  /*
   * ============================================================
   * PDF
   * ============================================================
   */

  const abrirPDF = () => {
    window.open('/PSI.pdf', '_blank');
  };

  /*
   * ============================================================
   * REFERÊNCIA DA FUNÇÃO DE TROCA
   *
   * NavegacaoAbas registra aqui sua função imperativa.
   *
   * Isso permite que chamadoFoi() altere a aba sem state.
   * ============================================================
   */

  const trocarAbaRef =
    useRef<(aba: Aba) => void>(() => { });

  /*
   * ============================================================
   * RENDER PRINCIPAL
   * ============================================================
   */

  return (
    <motion.div
      className="relative pt-[300px] max-h-screen overflow-y-hidden flex items-center justify-center"
      animate={{
        background: tema.bg
      }}
    >

      {/* ========================================================
          CURSOR
          ======================================================== */}

      <TargetCursor
        spinDuration={0}
        hideDefaultCursor
        parallaxOn
        hoverDuration={0.2}
        cursorColor="#4000ff"
        cursorColorOnTarget="#4000ff"
        enabled
      />

      {/* ========================================================
          FUNDO
          ======================================================== */}

      <div className="absolute inset-0 z-0">
        <LiquidEther
          colors={[
            '#c5bafe',
            '#7b6cfb',
            '#c1bbff'
          ]}
          mouseForce={
            darkMode
              ? 16
              : 8
          }
          cursorSize={20}
          isViscous
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.1}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      {/* ========================================================
          MODAL CHAMADO ENVIADO
          ======================================================== */}

      <AnimatePresence>
        {chamadaEnviada && (
          <ModalChamadoEnviado
            darkMode={darkMode}
            tema={tema}
          />
        )}
      </AnimatePresence>

      {/* ========================================================
          ABAS
          ======================================================== */}

      <NavegacaoAbas
        tema={tema}
        authen={authen}
        navigate={navigate}
        idUserRef={idUserRef}
        helperChamadaRef={helperChamadaRef}
        chamadoFoi={chamadoFoi}
        abrirPDF={abrirPDF}
        trocarAbaRef={trocarAbaRef}
      />

    </motion.div>
  );
}

/* ============================================================
   MODAL CHAMADO ENVIADO
   ============================================================ */

interface ModalProps {
  darkMode: boolean;
  tema: Tema;
}

const ModalChamadoEnviado = memo(
  function ModalChamadoEnviado({
    darkMode,
    tema
  }: ModalProps) {

    return (
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-6"
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        exit={{
          opacity: 0
        }}
      >

        <motion.div
          className="absolute inset-0 backdrop-blur-xl"
          animate={{
            backgroundColor:
              darkMode
                ? 'rgba(0, 0, 0, 0.55)'
                : 'rgba(53, 44, 95, 0.65)'
          }}
        />

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.85,
            y: 30
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: -100
          }}
          exit={{
            opacity: 0,
            scale: 0.9,
            y: 20
          }}
          transition={{
            duration: 0.35,
            ease: 'easeOut'
          }}
          className="relative w-full mx-auto"
        >

          <motion.div
            className="rounded-4xl border p-10 shadow-2xl text-center"
            animate={{
              background: tema.card,
              borderColor: tema.border
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
              color={
                darkMode
                  ? '#bebcdb'
                  : '#161626'
              }
            />

          </motion.div>

        </motion.div>

      </motion.div>
    );
  }
);

/* ============================================================
   NAVEGAÇÃO
   ============================================================ */

interface NavegacaoAbasProps {
  tema: Tema;
  authen: ReturnType<typeof useAutenticacao>;
  navigate: ReturnType<typeof useNavigate>;
  idUserRef: React.MutableRefObject<string | null>;
  helperChamadaRef: React.MutableRefObject<string>;
  chamadoFoi: () => void;
  abrirPDF: () => void;

  trocarAbaRef: React.MutableRefObject<
    (aba: Aba) => void
  >;
}

const NavegacaoAbas = memo(
  function NavegacaoAbas({
    tema,
    authen,
    navigate,
    idUserRef,
    helperChamadaRef,
    chamadoFoi,
    abrirPDF,
    trocarAbaRef
  }: NavegacaoAbasProps) {

    /*
     * ============================================================
     * MOTION VALUES
     *
     * Cada aba fica montada.
     *
     * Portanto:
     *
     * - Login não desmonta;
     * - Painel não desmonta;
     * - Chamada não desmonta;
     * - refs permanecem;
     * - estados locais permanecem;
     * - nenhuma troca de aba exige render do React.
     * ============================================================
     */

    const painelOpacity =
      useMotionValue(1);

    const painelX =
      useMotionValue(0);

    const painelPointer =
      useMotionValue<'auto' | 'none'>('auto');

    const loginOpacity =
      useMotionValue(0);

    const loginX =
      useMotionValue(-20);

    const loginPointer =
      useMotionValue<'auto' | 'none'>('none');

    const chamadaOpacity =
      useMotionValue(0);

    const chamadaX =
      useMotionValue(-20);

    const chamadaPointer =
      useMotionValue<'auto' | 'none'>('none');

    /*
     * ============================================================
     * ABA ATUAL
     * ============================================================
     */

    const abaAtualRef =
      useRef<Aba>('painel');

    /*
     * ============================================================
     * CONTROLE IMPERATIVO DAS ABAS
     * ============================================================
     */

    const trocarAba = (novaAba: Aba) => {

      const abaAnterior =
        abaAtualRef.current;

      if (abaAnterior === novaAba) {
        return;
      }

      abaAtualRef.current =
        novaAba;

      /*
       * ========================================================
       * SAÍDA
       * ========================================================
       */

      if (abaAnterior === 'painel') {

        painelPointer.set('none');

        animate(
          painelOpacity,
          0,
          {
            duration: 0.6,
            ease: 'easeOut'
          }
        );

        animate(
          painelX,
          20,
          {
            duration: 0.6,
            ease: 'easeOut'
          }
        );
      }

      if (abaAnterior === 'login') {

        loginPointer.set('none');

        animate(
          loginOpacity,
          0,
          {
            duration: 0.6,
            ease: 'easeOut'
          }
        );

        animate(
          loginX,
          20,
          {
            duration: 0.6,
            ease: 'easeOut'
          }
        );
      }

      if (abaAnterior === 'chamada') {

        chamadaPointer.set('none');

        animate(
          chamadaOpacity,
          0,
          {
            duration: 0.6,
            ease: 'easeOut'
          }
        );

        animate(
          chamadaX,
          20,
          {
            duration: 0.6,
            ease: 'easeOut'
          }
        );
      }

      /*
       * ========================================================
       * ENTRADA
       *
       * Primeiro colocamos a nova aba em -20.
       * Depois animamos até 0.
       * ========================================================
       */

      if (novaAba === 'painel') {

        painelPointer.set('auto');

        painelX.set(-20);
        painelOpacity.set(0);

        animate(
          painelOpacity,
          1,
          {
            duration: 0.6,
            ease: 'easeOut'
          }
        );

        animate(
          painelX,
          0,
          {
            duration: 0.6,
            ease: 'easeOut'
          }
        );
      }

      if (novaAba === 'login') {

        loginPointer.set('auto');

        loginX.set(-20);
        loginOpacity.set(0);

        animate(
          loginOpacity,
          1,
          {
            duration: 0.6,
            ease: 'easeOut'
          }
        );

        animate(
          loginX,
          0,
          {
            duration: 0.6,
            ease: 'easeOut'
          }
        );
      }

      if (novaAba === 'chamada') {

        chamadaPointer.set('auto');

        chamadaX.set(-20);
        chamadaOpacity.set(0);

        animate(
          chamadaOpacity,
          1,
          {
            duration: 0.6,
            ease: 'easeOut'
          }
        );

        animate(
          chamadaX,
          0,
          {
            duration: 0.6,
            ease: 'easeOut'
          }
        );
      }
    };

    /*
     * Registra a função no componente principal.
     */

    useEffect(() => {
      trocarAbaRef.current =
        trocarAba;

      return () => {
        trocarAbaRef.current =
          () => { };
      };
    }, []);

    return (
      <motion.div
        className="relative max-h-screen h-screen  max-h-screen overflow-y-hidden w-full z-10"
      >

        {/* ======================================================
            PAINEL
            ====================================================== */}

        <motion.div
          className="absolute inset-0 w-full"
          style={{
            opacity: painelOpacity,
            x: painelX,
            pointerEvents: painelPointer
          }}
        >

          <Painel
            tema={tema}
            trocarAba={trocarAba}
            abrirPDF={abrirPDF}
          />

        </motion.div>

        {/* ======================================================
            LOGIN
            ====================================================== */}

        <motion.div
          className="absolute inset-0 w-full"
          style={{
            opacity: loginOpacity,
            x: loginX,
            pointerEvents: loginPointer
          }}
        >

          <LoginForm
            tema={tema}
            authen={authen}
            navigate={navigate}
            trocarAba={trocarAba}
          />

        </motion.div>

        {/* ======================================================
            CHAMADA
            ====================================================== */}

        <motion.div
          className="absolute inset-0 w-full"
          style={{
            opacity: chamadaOpacity,
            x: chamadaX,
            pointerEvents: chamadaPointer
          }}
        >

          <ChamadaForm
            tema={tema}
            trocarAba={trocarAba}
            idUserRef={idUserRef}
            helperChamadaRef={helperChamadaRef}
            chamadoFoi={chamadoFoi}
          />

        </motion.div>

      </motion.div>
    );
  }
);

/* ============================================================
   LOGIN
   ============================================================ */

interface LoginFormProps {
  tema: Tema;
  authen: ReturnType<typeof useAutenticacao>;
  navigate: ReturnType<typeof useNavigate>;
  trocarAba: (aba: Aba) => void;
}

const LoginForm = memo(
  function LoginForm({
    tema,
    authen,
    navigate,
    trocarAba
  }: LoginFormProps) {

    /*
     * ESTES REFS PERTENCEM SOMENTE AO LOGIN.
     *
     * Digitar não causa render.
     */

    const emailRef =
      useRef('');

    const senhaRef =
      useRef('');

    const [
      mostrarSenha,
      setMostrarSenha
    ] = useState(false);

    /*
     * ============================================================
     * LOGIN
     * ============================================================
     */

    const logar = async (
      e: React.FormEvent<HTMLFormElement>
    ) => {

      e.preventDefault();

      const email =
        emailRef.current;

      const senha =
        senhaRef.current;

      const ok =
        await authen.login(
          email,
          senha
        );

      if (!ok) {
        return;
      }

      navigate('/painel', {
        state: {
          email,
          user: authen.user
        }
      });
    };

    return (
      <div className="w-full max-w-md mx-auto">

        <motion.div
          initial={{
            opacity: 1,
            x: -130
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          className="w-full shadow-[0_0_15px_5px_rgba(0,0,0,0.3)] max-w-md z-10"
        >

          <motion.div
            className="rounded-sm border pt-5 px-6 pb-15 shadow-xl"
            animate={{
              background: tema.card,
              borderColor: tema.border
            }}
          >

            {/* VOLTAR */}

            <motion.button
              onClick={() => {
                authen.limparErro();
                trocarAba('painel');
              }}
              whileHover={{
                scale: 1.05
              }}
              className="flex cursor-target mb-10 px-2 items-center gap-3"
            >

              <ArrowLeft
                color={tema.text}
                size={20}
                strokeWidth={2}
              />

              <motion.span
                animate={{
                  color: tema.text
                }}
              >
                VOLTAR
              </motion.span>

            </motion.button>

            {/* TÍTULO */}

            <motion.div className="flex justify-between items-center gap-3 mb-10">

              <motion.div
                className="w-1 h-10"
                animate={{
                  background: tema.accent
                }}
              />

              <div>

                <motion.div
                  className="text-2xl font-semibold leading-tight"
                  animate={{
                    color: tema.text
                  }}
                >
                  LOGIN
                </motion.div>

              </div>

              <motion.div
                className="w-1 h-10"
                style={{
                  background: tema.accent
                }}
              />

            </motion.div>

            {/* FORM */}

            <motion.form
              onSubmit={logar}
              className="space-y-5"
            >

              {/* EMAIL */}

              <motion.div>

                <motion.label
                  className="block text-xs font-mono tracking-widest uppercase mb-2"
                  animate={{
                    color: tema.muted
                  }}
                >
                  E-mail
                </motion.label>

                <motion.input
                  type="email"
                  autoComplete="email"
                  defaultValue=""
                  onChange={e => {
                    emailRef.current =
                      e.target.value;
                  }}
                  placeholder="usuario@empresa.com.br"
                  className="w-full cursor-target px-4 py-3 text-sm border outline-none rounded-sm"
                  animate={{
                    background: tema.inputBg,
                    borderColor: tema.border,
                    color: tema.text
                  }}
                  onFocus={e => {
                    e.currentTarget.style.borderColor =
                      tema.accent;
                  }}
                  onBlur={e => {
                    e.currentTarget.style.borderColor =
                      tema.border;
                  }}
                />

              </motion.div>

              {/* SENHA */}

              <motion.div>

                <motion.label
                  className="block text-xs font-mono tracking-widest uppercase mb-2"
                  style={{
                    color: tema.muted
                  }}
                >
                  Senha
                </motion.label>

                <motion.div className="relative">

                  <motion.input
                    type={
                      mostrarSenha
                        ? 'text'
                        : 'password'
                    }
                    autoComplete="current-password"
                    defaultValue=""
                    onChange={e => {
                      senhaRef.current =
                        e.target.value;
                    }}
                    placeholder="••••••••"
                    className="cursor-target w-full px-4 py-3 pr-11 text-sm border outline-none rounded-sm"
                    animate={{
                      background: tema.inputBg,
                      borderColor: tema.border,
                      color: tema.text
                    }}
                    onFocus={e => {
                      e.currentTarget.style.borderColor =
                        tema.accent;
                    }}
                    onBlur={e => {
                      e.currentTarget.style.borderColor =
                        tema.border;
                    }}
                  />

                  <motion.button
                    type="button"
                    onClick={() =>
                      setMostrarSenha(
                        p => !p
                      )
                    }
                    className="cursor-target absolute right-3 top-1/2 -translate-y-1/2"
                    animate={{
                      color: tema.muted
                    }}
                  >

                    {mostrarSenha ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                        <line
                          x1="1"
                          y1="1"
                          x2="23"
                          y2="23"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle
                          cx="12"
                          cy="12"
                          r="3"
                        />
                      </svg>
                    )}

                  </motion.button>

                </motion.div>

              </motion.div>

              {/* ERRO LOGIN */}

              <AnimatePresence>

                {authen.erro && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      height: 0
                    }}
                    animate={{
                      opacity: 1,
                      height: 'auto',
                      background: '#7f1d1d22',
                      color: '#ef4444',
                      border: '1px solid #ef444440'
                    }}
                    exit={{
                      opacity: 0,
                      height: 0
                    }}
                    className="px-4 py-3 text-xs font-mono rounded-sm"
                  >
                    {authen.erro}
                  </motion.div>
                )}

              </AnimatePresence>

              {/* ENTRAR */}

              <motion.button
                type="submit"
                disabled={authen.carregando}
                whileHover={{
                  scale: 1.01
                }}
                whileTap={{
                  scale: 0.99
                }}
                className="cursor-target w-full py-3 text-sm font-semibold tracking-wider rounded mt-2"
                animate={{
                  background:
                    authen.carregando
                      ? tema.muted
                      : '#030a71',
                  color: '#ffffff',
                  opacity:
                    authen.carregando
                      ? 0.6
                      : 1
                }}
              >

                {authen.carregando ? (
                  <motion.span className="flex items-center justify-center gap-2">

                    <svg
                      className="animate-spin"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>

                    Autenticando...

                  </motion.span>
                ) : (
                  'Entrar'
                )}

              </motion.button>

            </motion.form>

          </motion.div>

        </motion.div>

      </div>
    );
  }
);

/* ============================================================
   PAINEL
   ============================================================ */

interface PainelProps {
  tema: Tema;
  trocarAba: (aba: Aba) => void;
  abrirPDF: () => void;
}

const Painel = memo(
  function Painel({
    tema,
    trocarAba,
    abrirPDF
  }: PainelProps) {

    return (
      <motion.div className="w-full max-w-4xl mx-auto">

        <motion.div
          className="w-full shadow-[0_0_15px_5px_rgba(0,0,0,0.3)] max-w-4xl z-10"
        >

          <motion.div
            className="rounded-sm border p-10 shadow-xl"
            animate={{
              background: tema.card,
              borderColor: tema.border
            }}
          >

            {/* TÍTULO */}

            <motion.div className="flex justify-between items-center gap-3 mb-10">

              <motion.div
                className="w-1 h-10"
                style={{
                  background: tema.accent
                }}
              />

              <motion.div>

                <motion.div
                  className="text-3xl font-semibold leading-tight"
                  animate={{
                    color: tema.text
                  }}
                >
                  ESCOLHA UMA OPÇÃO:
                </motion.div>

              </motion.div>

              <motion.div
                className="w-1 h-10"
                style={{
                  background: tema.accent
                }}
              />

            </motion.div>

            {/* OPÇÕES */}

            <motion.div
              className="flex justify-around mt-8 py-20 border-t"
              animate={{
                borderColor: tema.border
              }}
            >

              {/* CHAMADO */}

              <motion.button
                onClick={() => {
                  trocarAba('chamada');
                }}
                className="flex flex-col flex-1 items-center justify-center cursor-target"
                animate={{
                  color: tema.text
                }}
                whileHover={{
                  scale: 1.1
                }}
                transition={{
                  duration: 0.3,
                  ease: 'easeOut'
                }}
              >

                <MessageSquarePlus
                  size={120}
                  strokeWidth={2}
                />

                <motion.span className="text-3xl pt-6">
                  Criar chamada
                </motion.span>

              </motion.button>

              {/* PSI */}

              <motion.button
                onClick={abrirPDF}
                className="flex flex-col flex-1 items-center justify-center cursor-target"
                animate={{
                  color: tema.text
                }}
                whileHover={{
                  scale: 1.1
                }}
                transition={{
                  duration: 0.3,
                  ease: 'easeOut'
                }}
              >

                <Shield
                  size={120}
                  strokeWidth={2}
                />

                <motion.span className="text-2xl pt-6">
                  Política de Segurança da Informação
                </motion.span>

              </motion.button>

              {/* LOGIN */}

              <motion.button
                onClick={() =>
                  trocarAba('login')
                }
                animate={{
                  color: tema.text
                }}
                whileHover={{
                  scale: 1.1
                }}
                transition={{
                  duration: 0.3,
                  ease: 'easeOut'
                }}
                className="flex flex-col flex-1 items-center justify-center cursor-target"
              >

                <User2
                  size={120}
                  strokeWidth={2}
                />

                <motion.span className="text-3xl pt-6">
                  Login
                </motion.span>

              </motion.button>

            </motion.div>

          </motion.div>

        </motion.div>

      </motion.div>
    );
  }
);

/* ============================================================
   CHAMADA
   ============================================================ */

interface ChamadaFormProps {
  tema: Tema;
  trocarAba: (aba: Aba) => void;
  idUserRef: React.MutableRefObject<string | null>;
  helperChamadaRef: React.MutableRefObject<string>;
  chamadoFoi: () => void;
}

const ChamadaForm = memo(
  function ChamadaForm({
    tema,
    trocarAba,
    idUserRef,
    helperChamadaRef,
    chamadoFoi
  }: ChamadaFormProps) {

    /*
     * ============================================================
     * REFS
     *
     * Nenhum desses valores causa render quando digitado.
     * ============================================================
     */

    const emailChamadaRef =
      useRef('');

    const nomeChamadaRef =
      useRef('');

    const tituloChamadaRef =
      useRef('');

    const detalhesChamadaRef =
      useRef('');

    const categoriaChamadaRef =
      useRef(
        '- Selecione uma categoria -'
      );

    const prioridadeChamadaRef =
      useRef(
        '- Selecione a prioridade -'
      );

    /*
     * ============================================================
     * ESTADOS LOCAIS
     *
     * Esses states renderizam SOMENTE ChamadaForm.
     * ============================================================
     */

    const [
      erroChamada,
      setErroChamada
    ] = useState('');

    const [
      carregandoChamada,
      setCarregandoChamada
    ] = useState(false);

    const [
      menuCategoria,
      setMenuCategoria
    ] = useState(false);

    const [
      menuPrioridade,
      setMenuPrioridade
    ] = useState(false);

    /*
     * Refs visuais.
     */

    const categoriaTextoRef =
      useRef<HTMLParagraphElement | null>(null);

    const prioridadeTextoRef =
      useRef<HTMLParagraphElement | null>(null);

    /*
     * ============================================================
     * MENUS
     * ============================================================
     */

    const abrirCategoria = () => {

      setMenuPrioridade(false);

      setMenuCategoria(
        anterior => !anterior
      );
    };

    const abrirPrioridade = () => {

      setMenuCategoria(false);

      setMenuPrioridade(
        anterior => !anterior
      );
    };

    /*
     * ============================================================
     * ALTERAR CATEGORIA
     * ============================================================
     */

    const alterarCategoria = (
      valor: string
    ) => {

      categoriaChamadaRef.current =
        valor;

      if (categoriaTextoRef.current) {

        categoriaTextoRef.current.textContent =
          valor;

        categoriaTextoRef.current.style.color =
          tema.text;
      }

      /*
       * FECHA O MENU.
       */

      setMenuCategoria(false);
    };

    /*
     * ============================================================
     * ALTERAR PRIORIDADE
     * ============================================================
     */

    const alterarPrioridade = (
      valor: string
    ) => {

      prioridadeChamadaRef.current =
        valor;

      if (prioridadeTextoRef.current) {

        prioridadeTextoRef.current.textContent =
          valor;

        prioridadeTextoRef.current.style.color =
          tema.text;
      }

      /*
       * FECHA O MENU.
       */

      setMenuPrioridade(false);
    };

    /*
     * ============================================================
     * LIMPAR CAMPOS
     * ============================================================
     */

    const limparCamposChamada = () => {

      nomeChamadaRef.current = '';
      emailChamadaRef.current = '';
      tituloChamadaRef.current = '';
      detalhesChamadaRef.current = '';

      categoriaChamadaRef.current =
        '- Selecione uma categoria -';

      prioridadeChamadaRef.current =
        '- Selecione a prioridade -';

      if (categoriaTextoRef.current) {

        categoriaTextoRef.current.textContent =
          '- Selecione uma categoria -';

        categoriaTextoRef.current.style.color =
          tema.muted;
      }

      if (prioridadeTextoRef.current) {

        prioridadeTextoRef.current.textContent =
          '- Selecione a prioridade -';

        prioridadeTextoRef.current.style.color =
          tema.muted;
      }

      /*
       * Como os inputs são uncontrolled,
       * limpamos diretamente o DOM.
       */

      const campos =
        document.querySelectorAll(
          '[data-chamada-input]'
        );

      campos.forEach(campo => {

        if (
          campo instanceof HTMLInputElement ||
          campo instanceof HTMLTextAreaElement
        ) {
          campo.value = '';
        }

      });

      /*
       * Garantimos que os menus estejam fechados
       * após o envio.
       */

      setMenuCategoria(false);
      setMenuPrioridade(false);
    };

    /*
     * ============================================================
     * ENVIO
     * ============================================================
     */

    const submitChamada = async (
      e: React.FormEvent<HTMLFormElement>
    ) => {

      e.preventDefault();

      if (carregandoChamada) {
        return;
      }

      setCarregandoChamada(true);
      setErroChamada('');

      let erros = '';
      let errosContagem = 0;

      /*
       * Lemos tudo dos refs.
       */

      const emailChamada =
        emailChamadaRef.current;

      const nomeChamada =
        nomeChamadaRef.current;

      const tituloChamada =
        tituloChamadaRef.current;

      const detalhesChamada =
        detalhesChamadaRef.current;

      const categoriaChamada =
        categoriaChamadaRef.current;

      const prioridadeChamada =
        prioridadeChamadaRef.current;

      const helperChamada =
        helperChamadaRef.current;

      const idUser =
        idUserRef.current;

      try {

        if (
          emailChamada.length < 10 ||
          !emailChamada
            .toLowerCase()
            .includes('gabardo') ||
          !emailChamada.includes('@')
        ) {

          erros +=
            'Por favor, insira um e-mail válido!';

          errosContagem++;

        }

        if (
          nomeChamada.length < 3
        ) {

          erros +=
            '\nPor favor, insira um nome válido!';

          errosContagem++;

        }

        if (
          tituloChamada.length < 4
        ) {

          erros +=
            '\nPor favor, insira um título válido!';

          errosContagem++;

        }

        if (
          categoriaChamada ===
          '- Selecione uma categoria -'
        ) {

          erros +=
            '\nPor favor, selecione o tema!';

          errosContagem++;

        }

        if (
          prioridadeChamada ===
          '- Selecione a prioridade -'
        ) {

          erros +=
            '\nPor favor, selecione a prioridade!';

          errosContagem++;

        }

        if (
          detalhesChamada.length < 8
        ) {

          erros +=
            '\nPor favor, dê mais detalhes!';

          errosContagem++;

        }

        if (!idUser) {

          erros +=
            '\nNão foi possível identificar você!';

          errosContagem++;

        }

        if (erros !== '') {
          throw new Error();
        }

        const { error } =
          await supabase.rpc(
            'criar_chamada',
            {
              p_titulo:
                tituloChamada,

              p_descricao:
                detalhesChamada,

              p_prioridade:
                prioridadeChamada,

              p_email:
                emailChamada,

              p_requerente:
                nomeChamada,

              p_categoria:
                categoriaChamada,

              p_client_id:
                idUser || '',

              p_ip:
                helperChamada || ''
            }
          );

        if (error) {

          setErroChamada(
            error.message
          );

          return;
        }

        limparCamposChamada();

        chamadoFoi();

      } catch {

        setErroChamada(
          'ERROS: ' +
          errosContagem +
          '\n\n' +
          erros
        );

      } finally {

        setCarregandoChamada(false);

      }

    };

    return (
      <motion.div className="w-full max-w-xl mx-auto">

        <motion.div
          className="shadow-[0_0_15px_5px_rgba(0,0,0,0.3)] w-full max-w-xl z-10"
        >

          <motion.div
            className="rounded-sm border pt-5 px-4 pb-15 shadow-xl"
            animate={{
              background: tema.card,
              borderColor: tema.border
            }}
          >

            {/* VOLTAR */}

            <motion.button
              onClick={() => {

                setErroChamada('');

                /*
                 * Fecha os menus antes de sair.
                 */

                setMenuCategoria(false);
                setMenuPrioridade(false);

                trocarAba('painel');
              }}
              whileHover={{
                scale: 1.05
              }}
              className="flex cursor-target mb-10 px-2 items-center gap-3"
            >

              <ArrowLeft
                color={tema.text}
                size={20}
                strokeWidth={2}
              />

              <motion.span
                animate={{
                  color: tema.text
                }}
              >
                VOLTAR
              </motion.span>

            </motion.button>

            {/* TÍTULO */}

            <motion.div className="flex justify-between items-center gap-3 mb-10">

              <motion.div
                className="w-1 h-10"
                animate={{
                  background: tema.accent
                }}
              />

              <motion.div>

                <motion.div
                  className="text-2xl font-semibold leading-tight"
                  animate={{
                    color: tema.text
                  }}
                >
                  ENVIE UM CHAMADO:
                </motion.div>

              </motion.div>

              <motion.div
                className="w-1 h-10"
                style={{
                  background: tema.accent
                }}
              />

            </motion.div>

            {/* FORM */}

            <motion.form
              onSubmit={submitChamada}
              className="space-y-5"
            >

              {/* ==================================================
                  PRIMEIRA LINHA
                  ================================================== */}

              <motion.div className="flex flex-row justify-between gap-6">

                {/* COLUNA ESQUERDA */}

                <motion.div className="flex flex-col gap-4">

                  {/* NOME */}

                  <motion.div>

                    <motion.label
                      className="block text-xs font-mono tracking-widest uppercase mb-2"
                      style={{
                        color: tema.muted
                      }}
                    >
                      Seu nome:
                    </motion.label>

                    <motion.input
                      defaultValue=""
                      onChange={e => {
                        nomeChamadaRef.current =
                          e.target.value;
                      }}
                      placeholder="Ex: Pedro Silva"
                      data-chamada-input
                      className="w-full px-4 py-3 text-sm border outline-none rounded-sm cursor-target"
                      animate={{
                        background: tema.inputBg,
                        borderColor: tema.border,
                        color: tema.text
                      }}
                      onFocus={e => {
                        e.currentTarget.style.borderColor =
                          tema.accent;
                      }}
                      onBlur={e => {
                        e.currentTarget.style.borderColor =
                          tema.border;
                      }}
                    />

                  </motion.div>

                  {/* PRIORIDADE */}

                  <motion.div>

                    <motion.label
                      className="block text-xs font-mono tracking-widest uppercase mb-2"
                      style={{
                        color: tema.muted
                      }}
                    >
                      Prioridade:
                    </motion.label>

                    <motion.div className="relative">

                      <motion.button
                        type="button"
                        onClick={abrirPrioridade}
                        className="w-65 text-left px-4 py-3 pr-11 text-sm outline-none rounded-t-sm cursor-target"
                        animate={{
                          background: tema.inputBg,
                          color: tema.text,

                          borderTop:
                            `1px solid ${tema.border}`,

                          borderBottom:
                            menuPrioridade
                              ? '1px solid transparent'
                              : `1px solid ${tema.border}`,

                          borderLeft:
                            `1px solid ${tema.border}`,

                          borderRight:
                            `1px solid ${tema.border}`
                        }}
                      >

                        <motion.p
                          ref={prioridadeTextoRef}
                          style={{
                            color:
                              prioridadeChamadaRef.current ===
                                '- Selecione a prioridade -'
                                ? tema.muted
                                : tema.text
                          }}
                        >
                          - Selecione a prioridade -
                        </motion.p>

                        <AnimatePresence>

                          {menuPrioridade && (
                            <MenuPrioridade
                              tema={tema}
                              alterarPrioridade={
                                alterarPrioridade
                              }
                            />
                          )}

                        </AnimatePresence>

                      </motion.button>

                    </motion.div>

                  </motion.div>

                </motion.div>

                {/* COLUNA DIREITA */}

                <motion.div className="flex flex-col min-w-55 gap-4">

                  {/* EMAIL */}

                  <motion.div>

                    <motion.label
                      className="block text-xs font-mono tracking-widest uppercase mb-2"
                      style={{
                        color: tema.muted
                      }}
                    >
                      Seu e-mail:
                    </motion.label>

                    <motion.input
                      type="email"
                      autoComplete="email"
                      defaultValue=""
                      onChange={e => {
                        emailChamadaRef.current =
                          e.target.value;
                      }}
                      placeholder="usuario@transgabardo.com.br"
                      data-chamada-input
                      className="w-full px-4 py-3 text-sm border outline-none rounded-sm cursor-target"
                      animate={{
                        background: tema.inputBg,
                        borderColor: tema.border,
                        color: tema.text
                      }}
                      onFocus={e => {
                        e.currentTarget.style.borderColor =
                          tema.accent;
                      }}
                      onBlur={e => {
                        e.currentTarget.style.borderColor =
                          tema.border;
                      }}
                    />

                  </motion.div>

                  {/* CATEGORIA */}

                  <motion.div>

                    <motion.label
                      className="block text-xs font-mono tracking-widest uppercase mb-2"
                      style={{
                        color: tema.muted
                      }}
                    >
                      Tema do problema:
                    </motion.label>

                    <motion.div className="relative">

                      <motion.button
                        type="button"
                        onClick={abrirCategoria}
                        className="w-65 text-left px-4 py-3 pr-11 text-sm outline-none rounded-t-sm cursor-target"
                        animate={{
                          background: tema.inputBg,
                          color: tema.text,

                          borderTop:
                            `1px solid ${tema.border}`,

                          borderBottom:
                            menuCategoria
                              ? '1px solid transparent'
                              : `1px solid ${tema.border}`,

                          borderLeft:
                            `1px solid ${tema.border}`,

                          borderRight:
                            `1px solid ${tema.border}`
                        }}
                      >

                        <motion.p
                          ref={categoriaTextoRef}
                          style={{
                            color:
                              categoriaChamadaRef.current ===
                                '- Selecione uma categoria -'
                                ? tema.muted
                                : tema.text
                          }}
                        >
                          - Selecione uma categoria -
                        </motion.p>

                        <AnimatePresence>

                          {menuCategoria && (
                            <MenuCategoria
                              tema={tema}
                              alterarCategoria={
                                alterarCategoria
                              }
                            />
                          )}

                        </AnimatePresence>

                      </motion.button>

                    </motion.div>

                  </motion.div>

                </motion.div>

              </motion.div>

              {/* TÍTULO */}

              <motion.div>

                <motion.label
                  className="block text-xs font-mono tracking-widest uppercase mb-2"
                  style={{
                    color: tema.muted
                  }}
                >
                  Título:
                </motion.label>

                <motion.input
                  defaultValue=""
                  onChange={e => {
                    tituloChamadaRef.current =
                      e.target.value;
                  }}
                  placeholder="Ex: Problema de conexão"
                  data-chamada-input
                  className="w-full px-4 py-3 text-sm border outline-none rounded-sm cursor-target"
                  animate={{
                    background: tema.inputBg,
                    borderColor: tema.border,
                    color: tema.text
                  }}
                  onFocus={e => {
                    e.currentTarget.style.borderColor =
                      tema.accent;
                  }}
                  onBlur={e => {
                    e.currentTarget.style.borderColor =
                      tema.border;
                  }}
                />

              </motion.div>

              {/* DETALHES */}

              <motion.div>

                <motion.label
                  className="block pl-2 text-xs font-mono tracking-widest uppercase mb-2"
                  style={{
                    color: tema.muted
                  }}
                >
                  Dê mais detalhes sobre o problema:
                </motion.label>

                <motion.textarea
                  defaultValue=""
                  onChange={e => {
                    detalhesChamadaRef.current =
                      e.target.value;
                  }}
                  data-chamada-input
                  className="w-full resize-none whitespace-pre-wrap break-words text-start h-30 px-4 py-3 text-sm border outline-none rounded-sm cursor-target"
                  animate={{
                    backgroundColor: tema.inputBg,
                    borderColor: tema.border,
                    color: tema.text
                  }}
                />

              </motion.div>

              {/* ERRO */}

              <AnimatePresence>

                {erroChamada !== '' && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      height: 0
                    }}
                    animate={{
                      opacity: 1,
                      height: 'auto'
                    }}
                    exit={{
                      opacity: 0,
                      height: 0
                    }}
                    className="px-4 py-3 text-xs font-mono rounded-sm whitespace-pre-line"
                    style={{
                      background: '#7f1d1d22',
                      color: '#ef4444',
                      border:
                        '1px solid #ef444440'
                    }}
                  >
                    {erroChamada}
                  </motion.div>
                )}

              </AnimatePresence>

              {/* ENVIAR */}

              <motion.button
                type="submit"
                disabled={carregandoChamada}
                whileHover={{
                  scale: 1.01
                }}
                whileTap={{
                  scale: 0.99
                }}
                className="w-full py-3 text-sm font-semibold tracking-wider rounded mt-2 cursor-target"
                animate={{
                  background:
                    carregandoChamada
                      ? tema.muted
                      : '#030a71',

                  color: '#ffffff',

                  opacity:
                    carregandoChamada
                      ? 0.6
                      : 1
                }}
              >

                {carregandoChamada ? (
                  <motion.span className="flex items-center justify-center gap-2">

                    <svg
                      className="animate-spin"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>

                    Enviando...

                  </motion.span>
                ) : (
                  'Enviar'
                )}

              </motion.button>

            </motion.form>

          </motion.div>

        </motion.div>

      </motion.div>
    );
  }
);

/* ============================================================
   MENU PRIORIDADE
   ============================================================ */

interface MenuProps {
  tema: Tema;
  alterarPrioridade?: (valor: string) => void;
  alterarCategoria?: (valor: string) => void;
}

const MenuPrioridade = memo(
  function MenuPrioridade({
    tema,
    alterarPrioridade
  }: MenuProps) {

    const opcoes = [
      'Baixa',
      'Média',
      'Alta',
      'Crítica'
    ];

    return (
      <motion.div
        initial={{
          opacity: 0,
          y: -10,
          scaleY: 0.95
        }}
        animate={{
          opacity: 1,
          y: 0,
          scaleY: 1,
          background: tema.inputBg,
          borderColor: tema.border
        }}
        exit={{
          opacity: 0,
          y: -10,
          scaleY: 0.95
        }}
        className="absolute left-0 top-full w-full rounded-b-sm shadow-lg z-50"
        style={{
          borderBottom:
            `1px solid ${tema.border}`,

          borderTop:
            '1px solid transparent',

          borderLeft:
            `1px solid ${tema.border}`,

          borderRight:
            `1px solid ${tema.border}`
        }}
      >

        {opcoes.map(opcao => (

          <motion.p
            key={opcao}

            /*
             * ====================================================
             * IMPORTANTE
             *
             * O menu está dentro do button.
             *
             * Sem stopPropagation:
             *
             * 1. alteraPrioridade()
             * 2. setMenuPrioridade(false)
             * 3. clique sobe para o button
             * 4. abrirPrioridade()
             * 5. menu abre novamente
             *
             * Agora o clique não chega ao button pai.
             * ====================================================
             */

            onPointerDown={e => {
              e.stopPropagation();
            }}

            onClick={e => {

              e.stopPropagation();

              alterarPrioridade?.(
                opcao
              );

            }}

            animate={{
              color: tema.text
            }}

            whileHover={{
              backgroundColor: '#0a38b7',
              color: 'white'
            }}

            className="cursor-target px-4 py-2"
          >
            {opcao}
          </motion.p>

        ))}

      </motion.div>
    );
  }
);

/* ============================================================
   MENU CATEGORIA
   ============================================================ */

const MenuCategoria = memo(
  function MenuCategoria({
    tema,
    alterarCategoria
  }: MenuProps) {

    const opcoes = [
      'Equipamento/Hardware',
      'Software',
      'Rede',
      'SOWX',
      'Conta de usuário',
      'Outros'
    ];

    return (
      <motion.div
        initial={{
          opacity: 0,
          y: -10,
          scaleY: 0.95
        }}
        animate={{
          opacity: 1,
          y: 0,
          scaleY: 1,
          background: tema.inputBg,
          borderColor: tema.border
        }}
        exit={{
          opacity: 0,
          y: -10,
          scaleY: 0.95
        }}
        className="absolute left-0 top-full w-full rounded-b-sm shadow-lg z-50"
        style={{
          borderBottom:
            `1px solid ${tema.border}`,

          borderTop:
            '1px solid transparent',

          borderLeft:
            `1px solid ${tema.border}`,

          borderRight:
            `1px solid ${tema.border}`
        }}
      >

        {opcoes.map(opcao => (

          <motion.p
            key={opcao}

            /*
             * Impede o clique de chegar ao button pai.
             */

            onPointerDown={e => {
              e.stopPropagation();
            }}

            onClick={e => {

              e.stopPropagation();

              alterarCategoria?.(
                opcao
              );

            }}

            animate={{
              color: tema.text
            }}

            whileHover={{
              backgroundColor: '#0a38b7',
              color: 'white'
            }}

            className="cursor-target px-4 py-2"
          >
            {opcao}
          </motion.p>

        ))}

      </motion.div>
    );
  }
);