'use client';

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LayoutGrid, PhoneCall, Server, Users, LineChart } from "lucide-react";
import { useHeader } from "@/contextos/Header";
import { Abas, type ItemAba } from "@/componentes/ui/Abas";
import { VisaoGeral } from "@/componentes/dashboard/abas/VisaoGeral";
import { Chamadas } from "@/componentes/dashboard/abas/Chamadas";
import { Inventario } from "@/componentes/dashboard/abas/Inventario";
import { Tecnicos } from "@/componentes/dashboard/abas/Tecnicos";
import { Metricas } from "@/componentes/dashboard/abas/Metricas";

const ABAS: ItemAba[] = [
  { id: "geral", rotulo: "Dashboards gerais", icone: <LayoutGrid size={16} /> },
  { id: "chamadas", rotulo: "Chamadas", icone: <PhoneCall size={16} /> },
  { id: "inventario", rotulo: "Inventário", icone: <Server size={16} /> },
  { id: "tecnicos", rotulo: "Técnicos", icone: <Users size={16} /> },
  { id: "metricas", rotulo: "Métricas", icone: <LineChart size={16} /> },
];

export function DashboardPrincipal() {
  const { darkMode } = useHeader();
  const [abaAtiva, setAbaAtiva] = useState("geral");

  return (
    <motion.div
      animate={{
        backgroundColor: darkMode ? "#0B1120" : "#F8FAFC",
      }}
      className="min-h-screen w-full px-4 py-6 sm:px-8 sm:py-8"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="flex flex-col gap-1">
          <motion.h1
            animate={{ color: darkMode ? "#fff" : "#0F172A" }}
            className="text-2xl font-black tracking-tight"
          >
            Central de operações de TI
          </motion.h1>
          <motion.p
            animate={{ color: darkMode ? "#94a3b8" : "#64748B" }}
            className="text-sm"
          >
            Inventário, chamadas e desempenho de técnicos em tempo real.
          </motion.p>
        </header>

        <Abas itens={ABAS} ativa={abaAtiva} aoSelecionar={setAbaAtiva} />

        <AnimatePresence mode="wait">
          <motion.div
            key={abaAtiva}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            {abaAtiva === "geral" && <VisaoGeral />}
            {abaAtiva === "chamadas" && <Chamadas />}
            {abaAtiva === "inventario" && <Inventario />}
            {abaAtiva === "tecnicos" && <Tecnicos />}
            {abaAtiva === "metricas" && <Metricas />}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
