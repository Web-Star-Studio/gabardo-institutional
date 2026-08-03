import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { useHeader } from '@/contextos/Header';

export default function FormChamadas() {

    const { darkMode } = useHeader();
    const [emailChamada, setEmailChamada] = useState("");
    const [nomeChamada, setNomeChamada] = useState("");
    const [tituloChamada, setTituloChamada] = useState("");
    const [detalhesChamada, setDetalhesChamada] = useState("");
    const [categoriaChamada, setCategoriaChamada] = useState("- Selecione uma categoria -");
    const [helperChamada, setHelperChamada] = useState("");
    const [erro, setErro] = useState<string | null>(null);
    const [carregando, setCarregando] = useState(false);
    const [menuCategoria, setMenuCategoria] = useState(false);


    const bg = darkMode ? '#020202' : '#FFFDD0'
    const card = darkMode ? '#1414178b' : '#ffffff98'
    const border = darkMode ? '#2f2f3e' : '#9090ffbb'
    const text = darkMode ? '#e8e8ea' : '#0f172a'
    const muted = darkMode ? '#6b6b78' : '#6b7280'
    const primary = darkMode ? '#1e3a8a' : '#1904fd'
    const primaryHover = darkMode ? '#1e40af' : '#1904fd'
    const inputBg = darkMode ? '#1c1c21' : '#e8e6c1'
    const accent = darkMode ? '#3b83f638' : '#1904fd28'


    const abrirCategoria = () => setMenuCategoria(anterior => !anterior);

    useEffect(() => {
        fetch('https://api.ipify.org?format=json')
            .then(r => r.json())
            .then(d => setHelperChamada(d.ip))
            .catch(e => {
                setHelperChamada('');
            });
    }, []);

    return (
        <AnimatePresence mode="wait">
            <form onSubmit={(e) => {
                e.preventDefault();
            }}
                className="space-y-5">
                <div className='flex flex-row justify-around'>
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="block text-xs font-mono tracking-widest uppercase mb-2" style={{ color: muted }}>
                                Seu e-mail:
                            </label>
                            <motion.input
                                type="email"
                                autoComplete="email"
                                value={emailChamada}
                                onChange={e => setEmailChamada(e.target.value)}
                                placeholder="usuario@transgabardo.com.br"
                                className="w-full px-4 py-3 text-sm border outline-none rounded-sm"
                                animate={{
                                    background: inputBg,
                                    borderColor: border,
                                    color: text,
                                }}
                                onFocus={e => (e.target.style.borderColor = accent)}
                                onBlur={e => (e.target.style.borderColor = border)}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-mono tracking-widest uppercase mb-2" style={{ color: muted }}>
                                Título:
                            </label>
                            <div className="relative">
                                <motion.input
                                    placeholder="Ex: Problema de conexão"
                                    className="w-full px-4 py-3 pr-11 text-sm border outline-none rounded-sm"
                                    animate={{ background: inputBg, borderColor: border, color: text }}
                                    onFocus={e => (e.target.style.borderColor = accent)}
                                    onBlur={e => (e.target.style.borderColor = border)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col min-w-55 gap-4">
                        <div>
                            <label className="block text-xs font-mono tracking-widest uppercase mb-2" style={{ color: muted }}>
                                Seu nome:
                            </label>
                            <motion.input
                                placeholder="Ex: Pedro Silva"
                                className="w-full px-4 py-3 text-sm border outline-none rounded-sm"
                                animate={{
                                    background: inputBg,
                                    borderColor: border,
                                    color: text,
                                }}
                                onFocus={e => (e.target.style.borderColor = accent)}
                                onBlur={e => (e.target.style.borderColor = border)}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-mono tracking-widest uppercase mb-2" style={{ color: muted }}>
                                Tema do problema:
                            </label>
                            <div className="relative">
                                <motion.button
                                    onClick={() => abrirCategoria()}
                                    value={categoriaChamada}
                                    className="w-65 text-left px-4 py-3 pr-11 text-sm outline-none rounded-t-sm"
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
                                                transition={{ duration: 0.2 }}
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
                                                    className="px-4 py-2 cursor-pointer"
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
                                                    className="px-4 py-2 cursor-pointer"
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
                                                    className="px-4 py-2 cursor-pointer"
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
                                                    className="px-4 py-2 cursor-pointer"
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
                                                    className="px-4 py-2 cursor-pointer"
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
                                                    className="px-4 py-2 cursor-pointer"
                                                >
                                                    Outros
                                                </motion.p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div>
                        <label className="block pl-2 text-xs font-mono tracking-widest uppercase mb-2" style={{ color: muted }}>
                            Dê mais detalhes sobre o problema:
                        </label>
                        <motion.textarea
                            className="w-full resize-none whitespace-pre-wrap break-words text-start h-30 px-4 py-3 text-sm border outline-none rounded-sm"
                            animate={{
                                backgroundColor: inputBg,
                                borderColor: border,
                                color: text,
                            }}
                            onFocus={e => (e.target.style.borderColor = accent)}
                            onBlur={e => (e.target.style.borderColor = border)}
                        />
                    </div>
                </div>
                <AnimatePresence>
                    {erro && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="px-4 py-3 text-xs font-mono rounded-sm"
                            style={{ background: '#7f1d1d22', color: '#ef4444', border: '1px solid #ef444440' }}
                        >
                            {erro}
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    type="submit"
                    disabled={carregando}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full py-3 text-sm font-semibold tracking-wider rounded mt-2"
                    animate={{
                        background: carregando ? muted : primary,
                        color: '#ffffff',
                        opacity: carregando ? 0.6 : 1,
                    }}
                    onMouseEnter={e => !carregando && ((e.target as HTMLElement).style.background = primaryHover)}
                    onMouseLeave={e => !carregando && ((e.target as HTMLElement).style.background = primary)}
                >
                    {carregando ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                            </svg>
                            Enviando...
                        </span>
                    ) : 'Entrar'}
                </motion.button>
            </form>
        </AnimatePresence>
    )
}