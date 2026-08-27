import { motion } from 'motion/react';

interface PaginacaoProps {
  pagina: number;
  totalPaginas: number;
  setPagina: (pagina: number | ((p: number) => number)) => void;
  darkMode: boolean;
}

export function Paginacao({ pagina, totalPaginas, setPagina, darkMode }: PaginacaoProps) {
  if (totalPaginas <= 1) return null;

  const paginasVisiveis = () => {
    const paginas: (number | "...")[] = [];

    if (totalPaginas <= 7) {
      for (let i = 1; i <= totalPaginas; i++) paginas.push(i);
      return paginas;
    }

    paginas.push(1);
    if (pagina > 4) paginas.push("...");

    const inicio = Math.max(2, pagina - 1);
    const fim = Math.min(totalPaginas - 1, pagina + 1);

    for (let i = inicio; i <= fim; i++) paginas.push(i);

    if (pagina < totalPaginas - 3) paginas.push("...");
    paginas.push(totalPaginas);

    return paginas;
  };

  return (
    <motion.div
      animate={{ color: darkMode ? "#fafafa" : "#18181b" }}
      className="flex items-center justify-center gap-2 py-5"
    >
      <button
        onClick={() => setPagina((p) => p - 1)}
        disabled={pagina === 1}
        className="rounded-md border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Anterior
      </button>

      {paginasVisiveis().map((item, index) =>
        item === "..." ? (
          <span key={`ellipsis-${index}`} className="px-2">...</span>
        ) : (
          <button
            key={item}
            onClick={() => setPagina(item as number)}
            className={`rounded-md border px-3 py-2 transition-colors ${
              pagina === item
                ? darkMode
                  ? "bg-white text-black"
                  : "bg-black text-white"
                : darkMode
                  ? "hover:bg-zinc-800"
                  : "hover:bg-zinc-100"
            }`}
          >
            {item}
          </button>
        )
      )}

      <button
        onClick={() => setPagina((p) => p + 1)}
        disabled={pagina === totalPaginas}
        className="rounded-md border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Próxima
      </button>
    </motion.div>
  );
}