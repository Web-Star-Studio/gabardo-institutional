import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { useHeader } from '../../contextos/Header';

import itemsMenu, { type ItemMenu } from "./items-menu";

export default function MenuEsquerdo() {
  const { fecharMenus, darkMode, menuAbertoEsquerdo } = useHeader();


  // Manipulando ítem no menu
  const [categoriaAberta, setCategoriaAberta] =
    useState<string | null>(null);
  const [categoriaHover, setCategoriaHover] =
    useState<string | null>(null);
  const [submenuHover, setSubmenuHover] =
    useState<string | null>(null);


  const alternarCategoria = (categoria: string) => {
    setCategoriaAberta((categoriaAtual) =>
      categoriaAtual === categoria ? null : categoria,
    );
  };

  return (
    <AnimatePresence initial={false}>
      {menuAbertoEsquerdo && (
        <motion.aside
          key="menu-esquerdo"
          initial={{
            x: -320,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,

            backgroundColor: darkMode
              ? "#18181b"
              : "#ffffff",

            color: darkMode
              ? "#f4f4f5"
              : "#18181b",

            borderRightColor: darkMode
              ? "#3f3f46"
              : "#d4d4d8",

            borderRightWidth: 1,
            borderRightStyle: "solid",

            boxShadow: darkMode
              ? "8px 0 30px rgba(0, 0, 0, 0.35)"
              : "8px 0 30px rgba(0, 0, 0, 0.10)",
          }}
          exit={{
            x: -320,
            opacity: 0,
          }}
          className="fixed left-0 top-0 z-500 flex h-screen w-72 flex-col overflow-hidden px-4 py-5"
        >
          <motion.div
            animate={{
              borderBottomColor: darkMode
                ? "#3f3f46"
                : "#e4e4e7",

              borderBottomWidth: 1,
              borderBottomStyle: "solid",
            }}
            className="mb-5 px-2 pb-4"
          >
            <motion.h2
              animate={{
                color: darkMode
                  ? "#a5b4fc"
                  : "#4f46e5",
              }}
              className="text-2xl font-bold tracking-widest"
            >
              MENU
            </motion.h2>

            <motion.p
              animate={{
                color: darkMode
                  ? "#a1a1aa"
                  : "#71717a",
              }}
              className="mt-1 text-xs font-medium uppercase tracking-wider"
            >
              Escolha uma opção:
            </motion.p>
          </motion.div>

          <div className="flex-1 overflow-y-auto pr-1">
            <AnimatePresence mode="wait" initial={false}>
              {true ? (
                <motion.div
                  key="menu-usuario"
                  initial={{
                    opacity: 0,
                    x: -16,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -16,
                  }}
                  className="flex flex-col gap-2"
                >
                  {itemsMenu.map((item: ItemMenu) => {
                    const estaAberto =
                      categoriaAberta === item.titulo;

                    const estaEmHover =
                      categoriaHover === item.titulo;

                    return (
                      <motion.div
                        key={item.titulo}
                        animate={{
                          backgroundColor: darkMode
                            ? "#18181b"
                            : "#ffffff",
                        }}
                        className="overflow-hidden rounded-xl"
                      >
                        <motion.button
                          type="button"
                          aria-expanded={estaAberto}
                          onClick={() =>
                            alternarCategoria(item.titulo)
                          }
                          onMouseEnter={() =>
                            setCategoriaHover(item.titulo)
                          }
                          onMouseLeave={() =>
                            setCategoriaHover(null)
                          }
                          animate={{
                            scale: estaEmHover ? 1.015 : 1,

                            backgroundColor: estaAberto
                              ? darkMode
                                ? "#312e81"
                                : "#e0e7ff"
                              : estaEmHover
                                ? darkMode
                                  ? "#3f3f46"
                                  : "#e4e4e7"
                                : darkMode
                                  ? "#27272a"
                                  : "#f4f4f5",

                            color: estaAberto
                              ? darkMode
                                ? "#e0e7ff"
                                : "#3730a3"
                              : darkMode
                                ? "#f4f4f5"
                                : "#27272a",

                            borderColor: estaAberto
                              ? darkMode
                                ? "#6366f1"
                                : "#818cf8"
                              : darkMode
                                ? "#3f3f46"
                                : "#d4d4d8",

                            borderWidth: 1,
                            borderStyle: "solid",

                            boxShadow: estaAberto
                              ? darkMode
                                ? "0 8px 20px rgba(49, 46, 129, 0.35)"
                                : "0 8px 20px rgba(79, 70, 229, 0.15)"
                              : "0 0 0 rgba(0, 0, 0, 0)",
                          }}
                          className="flex w-full cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold"
                        >
                          <span>{item.titulo}</span>

                          <motion.span
                            animate={{
                              rotate: estaAberto ? 90 : 0,

                              color: estaAberto
                                ? darkMode
                                  ? "#c7d2fe"
                                  : "#4338ca"
                                : darkMode
                                  ? "#a1a1aa"
                                  : "#71717a",
                            }}
                            className="text-xl font-medium"
                          >
                            ›
                          </motion.span>
                        </motion.button>

                        <motion.div
                          initial={false}
                          animate={{
                            height: estaAberto
                              ? "auto"
                              : 0,

                            opacity: estaAberto
                              ? 1
                              : 0,

                            backgroundColor: darkMode
                              ? "#18181b"
                              : "#ffffff",
                          }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-1 px-2 pb-2 pt-2">
                            {item.submenus.map((submenu) => {
                              const identificador =
                                `${item.titulo}-${submenu}`;

                              const estaEmHover =
                                submenuHover === identificador;

                              return (
                                <motion.button
                                  key={submenu}
                                  type="button"
                                  onMouseEnter={() =>
                                    setSubmenuHover(
                                      identificador,
                                    )
                                  }
                                  onMouseLeave={() =>
                                    setSubmenuHover(null)
                                  }
                                  animate={{
                                    x: estaEmHover ? 5 : 0,

                                    backgroundColor: estaEmHover
                                      ? darkMode
                                        ? "#27272a"
                                        : "#f4f4f5"
                                      : darkMode
                                        ? "#18181b"
                                        : "#ffffff",

                                    color: estaEmHover
                                      ? darkMode
                                        ? "#c7d2fe"
                                        : "#4338ca"
                                      : darkMode
                                        ? "#a1a1aa"
                                        : "#52525b",

                                    borderLeftColor: estaEmHover
                                      ? darkMode
                                        ? "#818cf8"
                                        : "#4f46e5"
                                      : darkMode
                                        ? "#3f3f46"
                                        : "#d4d4d8",

                                    borderLeftWidth: 2,
                                    borderLeftStyle: "solid",
                                  }}
                                  className="cursor-pointer rounded-lg px-4 py-2 text-left text-sm font-medium"
                                >
                                  {submenu}
                                </motion.button>
                              );
                            })}
                          </div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div
                  key="menu-sem-usuario"
                  initial={{
                    opacity: 0,
                    x: 16,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: 16,
                  }}
                >
                  <motion.button
                    type="button"
                    onMouseEnter={() =>
                      setCategoriaHover("Criar chamada")
                    }
                    onMouseLeave={() =>
                      setCategoriaHover(null)
                    }
                    animate={{
                      scale:
                        categoriaHover === "Criar chamada"
                          ? 1.02
                          : 1,

                      backgroundColor:
                        categoriaHover === "Criar chamada"
                          ? darkMode
                            ? "#4338ca"
                            : "#4338ca"
                          : darkMode
                            ? "#3730a3"
                            : "#4f46e5",

                      color: "#ffffff",

                      borderColor: darkMode
                        ? "#818cf8"
                        : "#4338ca",

                      borderWidth: 1,
                      borderStyle: "solid",

                      boxShadow:
                        categoriaHover === "Criar chamada"
                          ? "0 12px 25px rgba(79, 70, 229, 0.35)"
                          : "0 6px 15px rgba(79, 70, 229, 0.20)",
                    }}
                    className="w-full cursor-pointer rounded-xl px-4 py-3 text-sm font-semibold"
                  >
                    Criar chamada
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            animate={{
              borderTopColor: darkMode
                ? "#3f3f46"
                : "#e4e4e7",

              borderTopWidth: 1,
              borderTopStyle: "solid",

              color: darkMode
                ? "#71717a"
                : "#a1a1aa",
            }}
            className="mt-4 px-2 pt-4 text-center text-xs"
          >
            Menu administrativo
          </motion.div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}