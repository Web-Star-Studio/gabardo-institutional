'use client';

import TargetCursor from '@/componentes/animacoes/Cursor';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHeader } from '@/contextos/Header';
import { useAutenticacao } from "@/contextos/Autenticacao";
import LiquidEther from '@/componentes/animacoes/Fumaca';
import { MessageSquarePlus, User2, ArrowLeft } from 'lucide-react';
import FoldText from '@/componentes/personalizados/TextoChamado';
import TabelaChamadas from '@/componentes/TabelaChamadas';
import { Plus } from 'lucide-react';

import { supabase } from '@/lib/supabase';

export default function Principal() {
  const { darkMode } = useHeader();
  const authen = useAutenticacao();

  const [pesquisa, setPesquisa] = useState('');

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

  return (
    <motion.div className="flex-col relative min-h-screen overflow-x-hidden flex px-25 pt-14"
      animate={{
        background: bg,
        color: text,
      }}
    >
      <motion.div
        className="flex items-end justify-between border-b border-zinc-200 pt-12 pb-10 dark:border-zinc-800"
      >
        <motion.div className="w-200">
          <motion.h2
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0, color: text }}
            className="text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
          >
            Todas as chamadas
          </motion.h2>
          <motion.input
            type={'text'}
            value={pesquisa}
            onChange={e => setPesquisa(e.target.value)}
            placeholder="Pesquisar por título, descrição, datas..."
            className={`w-full px-4 py-3 mt-5 pr-11 text-sm border outline-none rounded-sm`}
            animate={{ background: inputBg, borderColor: border, color: text }}
            onFocus={e => (e.target.style.borderColor = accent)}
            onBlur={e => (e.target.style.borderColor = border)}
          />
        </motion.div>

        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          <Plus size={17} strokeWidth={2} />
          <span>Adicionar chamada</span>
        </motion.button>
      </motion.div>

      <TabelaChamadas />

    </motion.div>

  )
}
