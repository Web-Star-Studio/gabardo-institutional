import { motion } from "framer-motion";
import { useAutenticacao } from "../contextos/Autenticacao";
import { useHeader } from "../contextos/Header";

interface MenuEsquerdoProps {
  abrirMenuEsquerdo: boolean;
  onFechar?: () => void;
}

export default function MenuEsquerdo({
  abrirMenuEsquerdo,
  onFechar,
}: MenuEsquerdoProps) {
  const { user } = useAutenticacao();
  const { darkMode } = useHeader();

  const menuLogado = [
    {
      titulo: "Ativos",
      items: ["Listar Ativos", "Novo Ativo", "Categorias"],
    },
    {
      titulo: "Chamadas",
      items: ["Minhas Chamadas", "Nova Chamada", "Histórico"],
    },
    {
      titulo: "Gerência",
      items: ["Usuários", "Relatórios", "Configurações"],
    },
  ];

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 h-full w-72 flex flex-col overflow-hidden border-r"
      animate={{
        x: abrirMenuEsquerdo ? 0 : -288,
        opacity: abrirMenuEsquerdo ? 1 : 0,
        backgroundColor: darkMode ? "#09090b" : "#ffffff",
        borderRightColor: darkMode ? "#27272a" : "#e4e4e7",
      }}
    >
      {/* Cabeçalho */}
      <motion.div
        className="flex items-center justify-between px-5 py-5 border-b"
        animate={{
          borderBottomColor: darkMode ? "#27272a" : "#e4e4e7",
        }}
      >
        <motion.div
          className="text-lg font-semibold tracking-tight"
          animate={{
            color: darkMode ? "#fafafa" : "#18181b",
          }}
        >
          Menu
        </motion.div>

        {onFechar && (
          <motion.div
            onClick={onFechar}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg"
            animate={{
              color: darkMode ? "#a1a1aa" : "#71717a",
            }}
            whileHover={{
              backgroundColor: darkMode ? "#27272a" : "#f4f4f5",
              color: darkMode ? "#fafafa" : "#18181b",
            }}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </motion.div>
        )}
      </motion.div>

      {/* Conteúdo */}
      <motion.div className="flex-1 overflow-y-auto px-3 py-4">
        {user ? (
          menuLogado.map((secao) => (
            <motion.div key={secao.titulo} className="mb-6">
              <motion.div
                className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider"
                animate={{
                  color: darkMode ? "#71717a" : "#a1a1aa",
                }}
              >
                {secao.titulo}
              </motion.div>

              {secao.items.map((item) => (
                <motion.div
                  key={item}
                  className="mb-1 cursor-pointer rounded-xl px-3 py-2.5 text-sm font-medium"
                  animate={{
                    color: darkMode ? "#e4e4e7" : "#3f3f46",
                  }}
                  whileHover={{
                    backgroundColor: darkMode ? "#27272a" : "#f4f4f5",
                    color: darkMode ? "#fafafa" : "#18181b",
                  }}
                >
                  {item}
                </motion.div>
              ))}
            </motion.div>
          ))
        ) : (
          <>
            <motion.div
              className="mb-1 cursor-pointer rounded-xl px-3 py-2.5 text-sm font-medium"
              animate={{
                color: darkMode ? "#e4e4e7" : "#3f3f46",
              }}
              whileHover={{
                backgroundColor: darkMode ? "#27272a" : "#f4f4f5",
                color: darkMode ? "#fafafa" : "#18181b",
              }}
            >
              Criar chamada
            </motion.div>

            <motion.div
              className="mb-1 cursor-pointer rounded-xl px-3 py-2.5 text-sm font-medium"
              animate={{
                color: darkMode ? "#e4e4e7" : "#3f3f46",
              }}
              whileHover={{
                backgroundColor: darkMode ? "#27272a" : "#f4f4f5",
                color: darkMode ? "#fafafa" : "#18181b",
              }}
            >
              Login
            </motion.div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}