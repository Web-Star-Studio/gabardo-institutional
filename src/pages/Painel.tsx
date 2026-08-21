'use client';

import TargetCursor from '@/componentes/animacoes/Cursor';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHeader } from '@/contextos/Header';
import { useAutenticacao } from "@/contextos/Autenticacao";
import LiquidEther from '@/componentes/animacoes/Fumaca';
import { MessageSquarePlus, User2, ArrowLeft } from 'lucide-react';
import FoldText from '@/componentes/personalizados/TextoChamado';

import { supabase } from '@/lib/supabase';

export default function Principal() {
  const { darkMode } = useHeader();
  const authen = useAutenticacao();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [aba, setAba] = useState("painel");
  const [animarMouse, setAnimarMouse] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

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







  return (
    <motion.div
      className="relative min-h-screen overflow-x-hidden flex px-50 pt-14"
      animate={{ background: bg }}
    >
      <h1>Teste</h1>
    </motion.div >
  )
}
