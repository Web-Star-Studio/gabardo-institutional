import { motion, AnimatePresence } from 'motion/react';
import { useHeader } from '../contextos/Header';
import { useAutenticacao } from '../contextos/Autenticacao';
import {
  AlignCenter,
  DoorOpen,
  DoorClosed,
  Bell,
  BellRing,
  AlertTriangle,
  BookUser
} from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { useFiltrosChamadas } from '@/contextos/FiltrosChamadas';
import { useDados } from '@/contextos/Dados';

import useTimerChamada from '@/lib/timerChamada';

import MenuEsquerdo from './menu-esquerdo/MenuEsquerdo';

import logo from '../assets/128x128.png';
import logoDark from '../assets/128x128Dark.png';

export default function Header() {
  const {
    menuAbertoEsquerdo,
    darkMode,
    alterarMenuEsquerdo,
    alterarTema,
    fecharMenus,
    menuAbertoNotificacoes,
    menuAbertoAlertas,
    menuAbertoMinhasChamadas,
    alterarMenuNotificacoes,
    alterarMenuAlertas,
    alterarMenuMinhasChamadas,
  } = useHeader();

  const { megaInfoChamadas } = useFiltrosChamadas();
  const { assumirChamada } = useDados();
  const auten = useAutenticacao();

  const meuId = auten.user?.id!;
  const meusDados = megaInfoChamadas.individual[meuId];

  const [numAlertas, setNumAlertas] = useState(0);
  const [numMinhasChamadas, setNumMinhasChamadas] = useState(0);
  const numNotificacoes = megaInfoChamadas?.geral?.numeroParadas ?? 0;

  useEffect(() => {
    if (!megaInfoChamadas.individual[meuId]) return;

    setNumMinhasChamadas(megaInfoChamadas.individual[meuId].chamadasNovas.length);
  }, [megaInfoChamadas]);



  useEffect(() => {
    if (!megaInfoChamadas) return;

    console.log(megaInfoChamadas.geral.numeroParadas);
  }, [megaInfoChamadas]);

  return (
    <>
      <MenuEsquerdo />

      {/* MENU BUTTON */}
      <motion.button
        type="button"
        onClick={alterarMenuEsquerdo}
        animate={{
          opacity: menuAbertoEsquerdo ? 0.85 : 1,
          x: menuAbertoEsquerdo ? 287 : 0,
          backgroundColor: darkMode
            ? "#18181b"
            : "#ffffff",

          color: darkMode
            ? "#f4f4f5"
            : "#18181b",

          borderColor: darkMode
            ? "#3f3f46"
            : "#d4d4d8",

          borderRightWidth: 1,
          borderRightStyle: "solid",
          borderBottomWidth: 1,
          borderBottomStyle: "solid",

          boxShadow: darkMode
            ? "8px 0 30px rgba(0, 0, 0, 0.35)"
            : "8px 0 30px rgba(0, 0, 0, 0.10)",

        }}
        className={`
          fixed left-0 z-[501]
          flex h-13 w-26 items-center justify-center p-0.5 rounded-r-lg
          ${!auten.sessao ? "invisible pointer-events-none" : ""}
        `}
      >
        <AlignCenter size={40}
          className="select-none shadow"
        />
      </motion.button>

      {/* NAVBAR */}
      <motion.header
        animate={{
          backgroundColor: darkMode ? "rgba(24, 24, 27, 0.95)" : "#fff2eb",
          color: darkMode ? "#ffffff" : "#000000",
          borderColor: darkMode ? "#27272a" : "#e4e4e7",
        }}
        className="fixed left-0 top-0 z-50 flex h-14 w-full items-center border-b px-4 shadow-sm backdrop-blur-md"
      >
        {auten.tecnicoLogado && (
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={{
              opacity: 1,
              x: 0,
              backgroundColor: darkMode ? "#27272a" : "#ffffff",
              color: darkMode ? "#f4f4f5" : "#27272a",
              borderColor: darkMode ? "#3f3f46" : "#d4d4d8",
            }}
            transition={{
              opacity: { duration: 0.25 },
              x: { duration: 0.25 },
            }}
            className="
              absolute left-30 top-1/2
              -translate-y-1/2
              whitespace-nowrap
              rounded-full
              border
              px-3 py-1
              text-sm font-medium
              shadow-sm
              select-none
            "
          >
            {auten.tecnicoLogado.nome}
          </motion.span>
        )}

        {/* LOGO */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <img
            src={darkMode ? logoDark : logo}
            className="h-18 w-auto select-none"
            alt="Logo"
          />
        </div>

        <div className="absolute right-8 top-1/2 flex -translate-y-1/2 items-center gap-5">

          <AnimatePresence mode="popLayout">

            {auten.sessao && (
              <motion.button
                key="minhas"
                layout
                initial={{ opacity: 0, scale: 0.7, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.7, x: 20 }}
                transition={{
                  layout: {
                    type: "spring",
                    stiffness: 500,
                    damping: 35,
                  },
                  opacity: {
                    duration: 0.15,
                  },
                  scale: {
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  },
                  x: {
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  },
                }}
                onClick={alterarTema}
                className="group relative flex h-full w-12 items-center"
              >
                <motion.div
                  animate={
                    numMinhasChamadas > 0
                      ? { x: [0, -2, 2, -2, 2, 0] }
                      : { x: 0 }
                  }
                  transition={{
                    duration: 0.3,
                    repeat: numMinhasChamadas > 0 ? Infinity : 0,
                    repeatDelay: 1,
                  }}
                >
                  {numMinhasChamadas > 0 && (
                    <span className="absolute -right-1 -top-2 flex h-5 w-7 items-center justify-center rounded-full bg-red-500 text-base text-white">
                      {numMinhasChamadas < 10 ? numMinhasChamadas : "+9"}
                    </span>
                  )}
                  <BookUser
                    size={40}
                    className="select-none"
                  />
                </motion.div>
              </motion.button>
            )}



            {(auten.sessao) && (
              <motion.button
                key="alerta"
                layout
                initial={{ opacity: 0, scale: 0.7, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.7, x: 20 }}
                transition={{
                  layout: {
                    type: "spring",
                    stiffness: 500,
                    damping: 35,
                  },
                  opacity: {
                    duration: 0.15,
                  },
                  scale: {
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  },
                  x: {
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  },
                }}
                onClick={alterarMenuAlertas}
                className="group relative flex h-full w-12 items-center"
              >
                <motion.div
                  animate={
                    numAlertas > 0
                      ? { x: [0, -2, 2, -2, 2, 0] }
                      : { x: 0 }
                  }
                  transition={{
                    duration: 0.3,
                    repeat: numAlertas > 0 ? Infinity : 0,
                    repeatDelay: 1,
                  }}
                >
                  {numAlertas > 0 && (
                    <span className="absolute -right-1 -top-2 flex h-5 w-7 items-center justify-center rounded-full bg-red-500 text-base text-white">
                      {numAlertas < 10 ? numAlertas : "+9"}
                    </span>
                  )}
                  <AlertTriangle
                    size={40}
                    className="select-none"
                  />
                </motion.div>
              </motion.button>
            )}

            {auten.sessao && (
              <motion.button
                key="notificacoes"
                layout
                initial={{ opacity: 0, scale: 0.7, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.7, x: 20 }}
                transition={{
                  layout: {
                    type: "spring",
                    stiffness: 500,
                    damping: 35,
                  },
                  opacity: {
                    duration: 0.15,
                  },
                  scale: {
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  },
                  x: {
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  },
                }}
                onClick={alterarMenuNotificacoes}
                className="group relative flex h-full w-12 items-center"
              >
                <motion.div
                  animate={
                    numNotificacoes > 0
                      ? { x: [0, -2, 2, -2, 2, 0] }
                      : { x: 0 }
                  }
                  transition={{
                    duration: 0.3,
                    repeat: numNotificacoes > 0 ? Infinity : 0,
                    repeatDelay: 1,
                  }}
                >
                  {numNotificacoes > 0 && (
                    <span className="absolute -right-1 -top-2 flex h-5 w-7 items-center justify-center rounded-full bg-red-500 text-base text-white">
                      {numNotificacoes < 10 ? numNotificacoes : "+9"}
                    </span>
                  )}
                  {numNotificacoes > 0 ? (
                    <BellRing
                      size={40}
                      className="select-none"
                    />
                  ) : (
                    <Bell
                      size={40}
                      className="select-none"
                    />
                  )}
                </motion.div>
              </motion.button>
            )}




            <motion.button
              type="button"
              onClick={alterarTema}
              animate={{
                backgroundColor: darkMode ? "#333333" : "#bcb8b8",
              }}
              transition={{
                backgroundColor: { duration: 0.2 },
              }}
              className="flex h-7 w-12 items-center rounded-lg p-0.5"
            >
              <motion.div
                animate={{
                  x: darkMode ? 20 : 0,
                  backgroundColor: darkMode ? "#bcb8b8" : "#333333",
                }}
                transition={{
                  x: { type: "spring", stiffness: 500, damping: 30 },
                  backgroundColor: { duration: 0.2 },
                }}
                className="h-6 w-6 rounded-md"
              />
            </motion.button>


            {(auten.sessao) && (

              <motion.button
                key="logout"
                layout
                initial={{ opacity: 0, scale: 0.7, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.7, x: 20 }}
                transition={{
                  layout: {
                    type: "spring",
                    stiffness: 500,
                    damping: 35,
                  },
                  opacity: {
                    duration: 0.15,
                  },
                  scale: {
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  },
                  x: {
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  },
                }}
                type="button"
                onClick={auten.logout}
                className="flex gap-2 h-7 ml-10 w-32 items-center p-0.5"
              >

                <span className="text-3xl ">Sair </span>

                <DoorClosed
                  size={40}
                  className="select-none group-hover:hidden"
                />

                <DoorOpen
                  size={40}
                  className="hidden select-none group-hover:block"
                />
              </motion.button>
            )}
          </AnimatePresence>

        </div>
      </motion.header >

      <AnimatePresence mode='wait'>
        {/* OVERLAY */}
        {
          (menuAbertoEsquerdo || menuAbertoNotificacoes || menuAbertoAlertas || menuAbertoMinhasChamadas) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={fecharMenus}
              className={`fixed inset-0 ${menuAbertoEsquerdo ? "z-[299]" : "z-[999]"
                } bg-black/40`} />
          )
        }



        {
          menuAbertoAlertas && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
              onClick={(e) => e.stopPropagation()}
              className={`
              fixed left-1/2 top-1/3 z-[1000]
              w-[min(90vw,900px)]
              -translate-x-1/2 -translate-y-1/2
              overflow-hidden rounded-2xl border shadow-2xl
              ${darkMode
                  ? "border-zinc-700 bg-zinc-900 text-zinc-100"
                  : "border-zinc-200 bg-white text-zinc-900"
                }
              `}
            >
              {/* HEADER */}
              <div
                className={`
                flex items-center justify-between
                border-b px-5 py-4
                ${darkMode
                    ? "border-zinc-700"
                    : "border-zinc-200"
                  }
              `}
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle
                    size={28}
                    className="select-none"
                  />

                  <h2 className="text-lg font-semibold">
                    Alertas
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={fecharMenus}
                  className={`
            rounded-lg px-3 py-1 text-sm
            transition-colors
            ${darkMode
                      ? "hover:bg-zinc-800"
                      : "hover:bg-zinc-100"
                    }
          `}
                >
                  Fechar
                </button>
              </div>

              {/* CONTENT */}
              <div className="max-h-[60vh] overflow-y-auto p-5">
                {numAlertas > 0 ? (
                  <div className="space-y-3">
                    {/* Alertas entrarão aqui */}
                  </div>
                ) : (
                  <div className="flex min-h-32 items-center justify-center">
                    <p
                      className={
                        darkMode
                          ? "text-zinc-400"
                          : "text-zinc-500"
                      }
                    >
                      Nenhum alerta no momento.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )
        }



        {
          menuAbertoNotificacoes && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 10
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 10
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
              onClick={(e) => e.stopPropagation()}
              className={`
              fixed left-1/2 top-1/3 z-[1000]
              w-[min(1100vw,900px)]
              -translate-x-1/2 -translate-y-1/2
              overflow-hidden rounded-2xl border shadow-2xl
              ${darkMode
                  ? "border-zinc-700 bg-zinc-900 text-zinc-100"
                  : "border-zinc-200 bg-white text-zinc-900"
                }
              `}
            >
              {/* HEADER */}
              <div
                className={`
                flex items-center justify-between
                border-b px-5 py-4
                ${darkMode
                    ? "border-zinc-700"
                    : "border-zinc-200"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Bell
                    size={28}
                    className="select-none"
                  />

                  <h2 className="text-lg font-semibold">
                    Notificações
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={fecharMenus}
                  className={`
                  rounded-lg px-3 py-1 text-sm
                  transition-colors
                  ${darkMode
                      ? "hover:bg-zinc-800"
                      : "hover:bg-zinc-100"
                    }
                `}
                >
                  Fechar
                </button>
              </div>

              <div className="max-h-[60vh] overflow-hidden p-5">
                {numNotificacoes > 0 ? (
                  <div className="space-y-3">
                    {megaInfoChamadas?.geral?.listaParadas?.map((parada) => (
                      <div
                        key={parada.id}
                        className={`
                        rounded-xl border p-4
                          ${darkMode
                            ? "border-zinc-700 bg-zinc-800/60"
                            : "border-zinc-200 bg-zinc-50"
                          }
                        `}
                      >
                        <div className="mb-2 flex items-start justify-between gap-3">
                          <h3 className="text-base font-semibold leading-snug">
                            {parada.titulo}
                          </h3>
                          {parada.categoria && (
                            <span
                              className={`
                              shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium
                                ${darkMode
                                  ? "bg-zinc-700 text-zinc-200"
                                  : "bg-zinc-200 text-zinc-700"
                                }
                              `}
                            >
                              {parada.categoria}
                            </span>
                          )}
                        </div>

                        {parada.descricao && (
                          <p
                            className={`
                            mb-3 break-words text-sm leading-relaxed
                            ${darkMode ? "text-zinc-300" : "text-zinc-600"}
                          `}
                          >
                            {parada.descricao}
                          </p>
                        )}

                        <div
                          className={`
                          flex flex-row justify-between gap-1 border-t pt-3 text-sm
                          ${darkMode ? "border-zinc-700" : "border-zinc-200"}
                        `}
                        >
                          <div>
                            {parada.requerente && (
                              <div className="flex gap-2">
                                <span
                                  className={
                                    darkMode ? "text-zinc-500" : "text-zinc-400"
                                  }
                                >
                                  Requerente:
                                </span>
                                <span className="font-medium">{parada.requerente}</span>
                              </div>
                            )}
                            {parada.email_requerente && (
                              <div className="flex gap-2">
                                <span
                                  className={
                                    darkMode ? "text-zinc-500" : "text-zinc-400"
                                  }
                                >
                                  E-mail:
                                </span>
                                <span className="truncate">{parada.email_requerente}</span>
                              </div>
                            )}
                          </div>
                          <div className="h-auto w-auto pr-10">
                            <motion.button
                              onClick={() =>
                                assumirChamada(parada.id, auten.tecnicoLogado!.id)
                              }
                              className="w-50 h-full rounded-lg text-2xl font-semibold"
                              animate={{}}
                              whileHover={{
                                backgroundColor: "#1111bb",
                                color: "#fff"
                              }}
                            >
                              ATENDER
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex min-h-32 items-center justify-center">
                    <p
                      className={
                        darkMode
                          ? "text-zinc-400"
                          : "text-zinc-500"
                      }
                    >
                      Nenhuma notificação no momento.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )
        }
      </AnimatePresence >
    </>
  );
}

