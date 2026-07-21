import { motion } from 'motion/react';
import { useHeader } from '../contextos/Header';

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
  } = useHeader();

  return (
    <>
      <MenuEsquerdo />

      {/* NAVBAR */}
      <motion.header
        animate={{
          backgroundColor: darkMode ? "rgba(24, 24, 27, 0.95)" : "#fff2eb",
          color: darkMode ? "#ffffff" : "#000000",
          borderColor: darkMode ? "#27272a" : "#e4e4e7",
        }}
        className="fixed left-0 top-0 z-50 flex h-14 w-full items-center border-b px-4 shadow-sm backdrop-blur-md"
      >
          <motion.button
            type="button"
            onClick={alterarMenuEsquerdo}
            className={`flex h-7 w-12 items-center rounded-full border p-0.5 transition-colors duration-300 ${
              darkMode
                ? "justify-end border-zinc-700 bg-zinc-800"
                : "justify-start border-zinc-300 bg-zinc-200"
            }`}
          >
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`h-5 w-5 rounded-full shadow-md transition-colors ${darkMode ? "bg-zinc-100" : "bg-white"}`}
            />
          </motion.button>

        {/* LOGO */}
        <div className="flex flex-1 justify-center">
          <img
            src={darkMode ? logoDark : logo}
            className="h-9 w-auto"
            alt="Logo"
          />
        </div>

        {/* DIREITA - Tema + Menu de informações */}
        <div className="flex items-center gap-2">

          {/* Toggle de tema */}
          <motion.button
            type="button"
            onClick={alterarTema}
            className={`flex h-7 w-12 items-center rounded-full border p-0.5 transition-colors duration-300 ${
              darkMode
                ? "justify-end border-zinc-700 bg-zinc-800"
                : "justify-start border-zinc-300 bg-zinc-200"
            }`}
          >
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`h-5 w-5 rounded-full shadow-md transition-colors ${darkMode ? "bg-zinc-100" : "bg-white"}`}
            />
          </motion.button>
        </div>
      </motion.header>

      {/* OVERLAY */}
      {(menuAbertoEsquerdo) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={fecharMenus}
          className="fixed inset-0 z-[299] bg-black/40"
        />
      )}
    </>
  );
}

