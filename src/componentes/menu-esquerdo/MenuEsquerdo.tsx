import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import FlowingMenu from './MenuAnimado';

import { useHeader } from '../../contextos/Header';

import itemsMenu, { type ItemMenu } from "./items-menu";

export default function MenuEsquerdo() {
  const { fecharMenus, darkMode, menuAbertoEsquerdo } = useHeader();

  const demoItems = [
    { link: '#', text: 'Chamadas', image: 'help.png' },
    { link: '#', text: 'Câmeras', image: 'cctv.png' },

  ];

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
            opacity: 0.85,

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
              <div style={{ height: 'auto', position: 'relative' }}>
                <FlowingMenu items={demoItems}
                  speed={11}
                  textColor="#f2f2f5"
                  bgColor="#120F17"
                  marqueeBgColor="#f3f2f4"
                  marqueeTextColor="#070707"
                  borderColor="#ffffff"
                />
              </div>

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