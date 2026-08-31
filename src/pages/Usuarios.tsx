'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useHeader } from '@/contextos/Header';
import { Search } from 'lucide-react';
import TabelaUsuarios from '@/componentes/TabelaUsuarios';

export default function Usuarios() {
    const { darkMode } = useHeader();

    const [pesquisa, setPesquisa] = useState('');


    const bg = darkMode ? '#18181B' : '#f7f7f9'
    const border = darkMode ? '#2f2f3e' : '#9090ffbb'
    const text = darkMode ? '#e8e8ea' : '#0f172a'
    const inputBg = darkMode ? '#1c1c21' : '#F9F9F7'
    const accent = darkMode ? '#3b83f638' : '#1904fd28'
    const placeholderColor = darkMode
        ? "#71717a"
        : "#9ca3af";

    return (
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
                        Todas os usuários
                    </motion.h2>

                    <motion.div className="relative w-full mt-5">
                        <motion.input
                            type="text"
                            value={pesquisa}
                            onChange={(e) => setPesquisa(e.target.value)}
                            placeholder="Pesquisar por nome, domínio, IP..."
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
            </motion.div>

            <TabelaUsuarios />

        </motion.div>

    )
}
