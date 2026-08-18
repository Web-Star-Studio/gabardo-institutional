import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useHeader } from "@/contextos/Header";

export default function DashboardHeader() {
  const { darkMode } = useHeader();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const options = ["Inventário", "Chamadas", "Técnicos"];

  const bg = darkMode ? '#020202' : '#f7f7f9'
  const card = darkMode ? '#1414178b' : '#ffffff98'
  const border = darkMode ? '#2f2f3e' : '#9090ffbb'
  const text = darkMode ? '#e8e8ea' : '#0f172a'
  const muted = darkMode ? '#6b6b78' : '#6b7280'
  const primary = darkMode ? '#1e3a8a' : '#1904fd'
  const primaryHover = darkMode ? '#1e40af' : '#1904fd'
  const inputBg = darkMode ? '#1c1c21' : '#F9F9F7'
  const accent = darkMode ? '#3b83f638' : '#1904fd28'


  return (
    <motion.div
      animate={{
        backgroundColor: bg,
        color: text,
      }}
      className="pt-15 w-full min-h-screen flex flex-col"
    >
      <motion.header
        animate={{
          backgroundColor: inputBg,
          borderColor: darkMode ? "#1f1f1f" : "#e5e5e5",
        }}
        className="w-full border-b sticky top-0 z-10"
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-6 md:px-10 py-6 md:py-8">
          <div className="flex flex-col gap-1">

            <motion.h1
              animate={{
                color: darkMode ? "#ffffff" : "#0a0a0a",
              }}
              className="text-3xl md:text-4xl font-semibold tracking-tight"
            >
              Meu dashboard:
            </motion.h1>
          </div>

          <motion.button
            type="button"
            onClick={() => setIsModalOpen(true)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            animate={{
              backgroundColor: "#0003cf",
              color: "#ffffff",
            }}
            className="px-4 h-11 md:h-12 rounded-md flex items-center justify-center shrink-0"
          >
            <Plus size={20} strokeWidth={2.25} />
            <span> Adicionar novo dashboard</span>
          </motion.button>
        </div>
      </motion.header>
      <motion.main
        animate={{
          backgroundColor: inputBg,
        }}
        className="w-full flex-1 px-6 md:px-10 py-10"
      />

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            animate={{
              backgroundColor: darkMode
                ? "rgba(0,0,0,0.65)"
                : "rgba(10,10,10,0.35)",
            }}
            className="fixed inset-0 z-20 flex items-center justify-center px-4"
          >
            <motion.div
              animate={{
                backgroundColor: darkMode ? "#141414" : "#ffffff",
                color: darkMode ? "#f5f5f5" : "#0a0a0a",
                borderColor: darkMode ? "#262626" : "#e5e5e5",
              }}
              className="w-full max-w-sm rounded-2xl border p-6 md:p-7 flex flex-col gap-5"
            >
              <div className="flex items-center justify-between">
                <motion.h2
                  animate={{
                    color: darkMode ? "#ffffff" : "#0a0a0a",
                  }}
                  className="text-lg font-semibold tracking-tight"
                >
                  Selecionar tipo
                </motion.h2>

                <motion.button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  animate={{
                    color: darkMode ? "#a3a3a3" : "#737373",
                  }}
                  className="w-7 h-7 flex items-center justify-center rounded-full"
                >
                  <X size={16} />
                </motion.button>
              </div>

              <motion.div
                animate={{
                  backgroundColor: darkMode ? "#262626" : "#e5e5e5",
                }}
                className="h-px w-full"
              />

              <div className="flex flex-col gap-2.5">
                {options.map((option) => (
                  <motion.button
                    key={option}
                    type="button"
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    animate={{
                      backgroundColor: darkMode ? "#1f1f1f" : "#f5f5f5",
                      color: darkMode ? "#f5f5f5" : "#0a0a0a",
                    }}
                    className="w-full rounded-xl py-3 px-4 text-left text-sm font-medium"
                  >
                    {option}
                  </motion.button>
                ))}

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}