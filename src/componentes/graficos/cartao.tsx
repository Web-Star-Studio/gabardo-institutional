import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect } from "react";
import { useHeader } from "@/contextos/Header";

export function Cartao({ titulo, valor }: {titulo: string, valor: number}) {
  const { darkMode } = useHeader();
  const valorMotion = useMotionValue(0);

  useEffect(() => {
    const controls = animate(valorMotion, valor, {
      duration: 3,
      ease: [0.16, 1, 0.3, 1],
    });

    return () => controls.stop();
  }, [valor]);

  const numero = useTransform(() =>
    Math.round(valorMotion.get()).toLocaleString("pt-BR")
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        color: darkMode ? "#fff" : "#0004da",
        backgroundColor: darkMode ? "#0004da": "#fff" ,
        border: darkMode ? "2px solid transparent" : "2px solid #0004da22",
    }}
      className="rounded-xl p-6 shadow-4xl"
    >
      <p>{titulo}</p>
      <motion.h2 className="text-4xl font-bold">{numero}</motion.h2>
    </motion.div>
  );
}