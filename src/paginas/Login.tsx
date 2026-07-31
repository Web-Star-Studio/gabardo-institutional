'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHeader } from '@/contextos/Header';
import { useAutenticacao } from "@/contextos/Autenticacao";
import LiquidEther from '@/componentes/animacoes/Fumaca';
import { MessageSquarePlus, User2, ArrowLeft } from 'lucide-react';

export default function Login() {
  const { darkMode } = useHeader();
  const authen = useAutenticacao();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [aba, setAba] = useState("chamada");

  const bg = darkMode ? '#020202' : '#f5f5f7'
  const card = darkMode ? '#1414178b' : '#ffffff98'
  const border = darkMode ? '#242428' : '#e2e2e6'
  const text = darkMode ? '#e8e8ea' : '#0f172a'
  const muted = darkMode ? '#6b6b78' : '#6b7280'
  const primary = darkMode ? '#1e3a8a' : '#1904fd'
  const primaryHover = darkMode ? '#1e40af' : '#1904fd'
  const inputBg = darkMode ? '#1c1c21' : '#f9fafb'
  const accent = darkMode ? '#3b83f638' : '#1904fd28'

  return (
    <motion.div
      className="relative min-h-screen flex items-center  justify-center"
      animate={{ background: bg }}
    >
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
      <AnimatePresence mode='wait'>
        {(aba == "login") && (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: -130 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-md z-10"
            exit={{ opacity: 0, x: 130 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="rounded-sm border pt-5 px-6 pb-15 shadow-xl"
              animate={{ background: card, borderColor: border }}
            >
              <motion.button
                onClick={() => setAba("painel")}
                whileHover={{
                  scale: 1.05,
                }}
                className="flex items-center gap-3">
                <ArrowLeft className="mb-10 " color={text} size={20} strokeWidth={2} />
                <motion.span animate={{ color: text }} className="mb-10">VOLTAR</motion.span>
              </motion.button>

              <motion.div className="flex justify-between items-center gap-3 mb-10">
                <motion.div className="w-1 h-10" style={{ background: accent }} />
                <div>
                  <motion.div className="text-2xl font-semibold leading-tight"
                    animate={{ color: text }}>
                    LOGIN
                  </motion.div>
                </div>
                <motion.div className="w-1 h-10" style={{ background: accent }} />

              </motion.div>

              <form onSubmit={(e) => {
                e.preventDefault();
                authen.login(email, senha);
              }} className="space-y-5">
                <div>
                  <label className="block text-xs font-mono tracking-widest uppercase mb-2" style={{ color: muted }}>
                    E-mail
                  </label>
                  <motion.input
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="usuario@empresa.com.br"
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
                    Senha
                  </label>
                  <div className="relative">
                    <motion.input
                      type={mostrarSenha ? 'text' : 'password'}
                      autoComplete="current-password"
                      value={senha}
                      onChange={e => setSenha(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 pr-11 text-sm border outline-none rounded-sm"
                      animate={{ background: inputBg, borderColor: border, color: text }}
                      onFocus={e => (e.target.style.borderColor = accent)}
                      onBlur={e => (e.target.style.borderColor = border)}
                    />
                    <button
                      type="button"
                      onClick={() => setMostrarSenha(p => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      style={{ color: muted }}
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
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {authen.erro && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-4 py-3 text-xs font-mono rounded-sm"
                      style={{ background: '#7f1d1d22', color: '#ef4444', border: '1px solid #ef444440' }}
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
                  className="w-full py-3 text-sm font-semibold tracking-wider rounded mt-2"
                  animate={{
                    background: authen.carregando ? muted : primary,
                    color: '#ffffff',
                    opacity: authen.carregando ? 0.6 : 1,
                  }}
                  onMouseEnter={e => !authen.carregando && ((e.target as HTMLElement).style.background = primaryHover)}
                  onMouseLeave={e => !authen.carregando && ((e.target as HTMLElement).style.background = primary)}
                >
                  {authen.carregando ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                      Autenticando...
                    </span>
                  ) : 'Entrar'}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}






        {(aba == "painel") && (
          <motion.div
            key="painel"
            initial={{ opacity: 0, x: -130 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-4xl z-10"
            exit={{ opacity: 0, x: 130 }}

          >
            <motion.div
              className="rounded-sm border p-10 shadow-xl"
              animate={{ background: card, borderColor: border }}
            >
              <motion.div className="flex justify-between items-center gap-3 mb-10">
                <motion.div className="w-1 h-10" style={{ background: accent }} />
                <div>
                  <motion.div className="text-3xl font-semibold leading-tight"
                    animate={{ color: text }}>
                    ESCOLHA UMA OPÇÃO:
                  </motion.div>
                </div>
                <motion.div className="w-1 h-10" style={{ background: accent }} />
              </motion.div>

              <motion.div
                className="space-y-5">
                <motion.div className="flex justify-around mt-8 py-20 border-t" animate={{ borderColor: border }}>
                  <motion.button
                    onClick={() => setAba('chamada')}
                    className="
              flex 
              flex-col 
              flex-1 
              items-center
              justify-center
              "
                    animate={{ color: text }}
                    whileHover={{ scale: 1.2 }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut"
                    }}
                  >
                    <MessageSquarePlus size={120} strokeWidth={2} />
                    <span className="text-4xl pt-6">Criar chamada</span>
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
                    <span className="text-4xl pt-6">Login</span>
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}






        {(aba == "chamada") && (
          <motion.div
            key="chamada"
            initial={{ opacity: 0, x: -130 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-xl z-10"
            exit={{ opacity: 0, x: 130 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="rounded-sm border pt-5 px-6 pb-15 shadow-xl"
              animate={{ background: card, borderColor: border }}
            >
              <motion.button
                onClick={() => setAba("painel")}
                whileHover={{
                  scale: 1.05,
                }}
                className="flex items-center gap-3">
                <ArrowLeft className="mb-10 " color={text} size={20} strokeWidth={2} />
                <motion.span animate={{ color: text }} className="mb-10">VOLTAR</motion.span>
              </motion.button>

              <motion.div className="flex justify-between items-center gap-3 mb-10">
                <motion.div className="w-1 h-10" style={{ background: accent }} />
                <div>
                  <motion.div className="text-2xl font-semibold leading-tight"
                    animate={{ color: text }}>
                    NOS ENVIE UM CHAMADO:
                  </motion.div>
                </div>
                <motion.div className="w-1 h-10" style={{ background: accent }} />

              </motion.div>

              <form onSubmit={(e) => {
                e.preventDefault();
                authen.login(email, senha);
              }} className="space-y-5">
                <div className='flex flex-row justify-around'>
                  <div className="flex flex-col">
                    <div>
                      <label className="block text-xs font-mono tracking-widest uppercase mb-2" style={{ color: muted }}>
                        E-mail
                      </label>
                      <motion.input
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="usuario@empresa.com.br"
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
                        Senha
                      </label>
                      <div className="relative">
                        <motion.input
                          type={mostrarSenha ? 'text' : 'password'}
                          autoComplete="current-password"
                          value={senha}
                          onChange={e => setSenha(e.target.value)}
                          placeholder="••••••••"
                          className="w-full px-4 py-3 pr-11 text-sm border outline-none rounded-sm"
                          animate={{ background: inputBg, borderColor: border, color: text }}
                          onFocus={e => (e.target.style.borderColor = accent)}
                          onBlur={e => (e.target.style.borderColor = border)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-mono tracking-widest uppercase mb-2" style={{ color: muted }}>
                        E-mail
                      </label>
                      <motion.input
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="usuario@empresa.com.br"
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
                        Senha
                      </label>
                      <div className="relative">
                        <motion.input
                          type={mostrarSenha ? 'text' : 'password'}
                          autoComplete="current-password"
                          value={senha}
                          onChange={e => setSenha(e.target.value)}
                          placeholder="••••••••"
                          className="w-full px-4 py-3 pr-11 text-sm border outline-none rounded-sm"
                          animate={{ background: inputBg, borderColor: border, color: text }}
                          onFocus={e => (e.target.style.borderColor = accent)}
                          onBlur={e => (e.target.style.borderColor = border)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div>
                      <label className="block text-xs font-mono tracking-widest uppercase mb-2" style={{ color: muted }}>
                        E-mail
                      </label>
                      <motion.input
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="usuario@empresa.com.br"
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
                        Senha
                      </label>
                      <div className="relative">
                        <motion.input
                          type={mostrarSenha ? 'text' : 'password'}
                          autoComplete="current-password"
                          value={senha}
                          onChange={e => setSenha(e.target.value)}
                          placeholder="••••••••"
                          className="w-full px-4 py-3 pr-11 text-sm border outline-none rounded-sm"
                          animate={{ background: inputBg, borderColor: border, color: text }}
                          onFocus={e => (e.target.style.borderColor = accent)}
                          onBlur={e => (e.target.style.borderColor = border)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-mono tracking-widest uppercase mb-2" style={{ color: muted }}>
                        E-mail
                      </label>
                      <motion.input
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="usuario@empresa.com.br"
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
                        Senha
                      </label>
                      <div className="relative">
                        <motion.input
                          type={mostrarSenha ? 'text' : 'password'}
                          autoComplete="current-password"
                          value={senha}
                          onChange={e => setSenha(e.target.value)}
                          placeholder="••••••••"
                          className="w-full px-4 py-3 pr-11 text-sm border outline-none rounded-sm"
                          animate={{ background: inputBg, borderColor: border, color: text }}
                          onFocus={e => (e.target.style.borderColor = accent)}
                          onBlur={e => (e.target.style.borderColor = border)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <AnimatePresence>
                  {authen.erro && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-4 py-3 text-xs font-mono rounded-sm"
                      style={{ background: '#7f1d1d22', color: '#ef4444', border: '1px solid #ef444440' }}
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
                  className="w-full py-3 text-sm font-semibold tracking-wider rounded mt-2"
                  animate={{
                    background: authen.carregando ? muted : primary,
                    color: '#ffffff',
                    opacity: authen.carregando ? 0.6 : 1,
                  }}
                  onMouseEnter={e => !authen.carregando && ((e.target as HTMLElement).style.background = primaryHover)}
                  onMouseLeave={e => !authen.carregando && ((e.target as HTMLElement).style.background = primary)}
                >
                  {authen.carregando ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                      Autenticando...
                    </span>
                  ) : 'Entrar'}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}


      </AnimatePresence>

    </motion.div>
  )
}
