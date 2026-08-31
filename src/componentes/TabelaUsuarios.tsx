import { pegarMaquinas } from "@/lib/query";
import { useHeader } from "@/contextos/Header";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

type Coluna = {
    id: string;
    header: string;
    width: number;
    align?: "left" | "center" | "right";
};

type LinhaUsuarioProps = {
    linha: any;
    colunas: readonly Coluna[];
    darkMode: boolean;
    formatarData: (data: string | null) => string;
};

function LinhaUsuario({
    linha,
    colunas,
    darkMode,
    formatarData,
}: LinhaUsuarioProps) {

    return (
        <motion.tr
            initial={{
                opacity: 0,
                y: 8,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
        >
            {colunas.map((coluna) => {
                const valor = linha[coluna.id];

                const ehData = coluna.id === "ultimo_visto";

                return (
                    <motion.td
                        key={coluna.id}
                        style={{
                            width: coluna.width,
                            maxWidth: coluna.width,
                            textAlign: coluna.align,
                        }}
                        animate={{
                            borderColor: darkMode
                                ? "#ffffff31"
                                : "#00000055",
                        }}
                        className="
                            border
                            px-5
                            py-4
                            text-sm
                            whitespace-nowrap
                            overflow-hidden
                            text-ellipsis
                        "
                    >
                        {ehData
                            ? formatarData(valor)
                            : String(valor ?? "-")}
                    </motion.td>
                );
            })}
        </motion.tr>
    );
}

export default function TabelaUsuarios() {

    const maquinas = pegarMaquinas();
    const { darkMode } = useHeader();

    const [pagina, setPagina] = useState(1);

    const itensPorPagina = 25;

    /*
     * Sempre que a quantidade de máquinas mudar,
     * garantimos que a página atual continue válida.
     */
    useEffect(() => {
        const total = maquinas.data?.length ?? 0;
        const paginas = Math.max(1, Math.ceil(total / itensPorPagina));

        setPagina((paginaAtual) =>
            Math.min(paginaAtual, paginas)
        );
    }, [maquinas.data]);

    const totalItens = maquinas.data?.length ?? 0;

    const totalPaginas = Math.max(
        1,
        Math.ceil(totalItens / itensPorPagina)
    );

    const inicio = (pagina - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;

    const maquinasPagina =
        maquinas.data?.slice(inicio, fim) ?? [];

    /*
     * Gera:
     *
     * 1 2 3 4 5 6 7
     *
     * ou
     *
     * 1 ... 4 5 6 ... 20
     */
    const paginasVisiveis = () => {
        const paginas: (number | "...")[] = [];

        if (totalPaginas <= 7) {
            for (let i = 1; i <= totalPaginas; i++) {
                paginas.push(i);
            }

            return paginas;
        }

        paginas.push(1);

        if (pagina > 4) {
            paginas.push("...");
        }

        const inicioPaginas = Math.max(
            2,
            pagina - 1
        );

        const fimPaginas = Math.min(
            totalPaginas - 1,
            pagina + 1
        );

        for (
            let i = inicioPaginas;
            i <= fimPaginas;
            i++
        ) {
            paginas.push(i);
        }

        if (pagina < totalPaginas - 3) {
            paginas.push("...");
        }

        paginas.push(totalPaginas);

        return paginas;
    };

    const formatarData = (data: string | null) => {
        if (!data) return "-";

        return new Intl.DateTimeFormat("pt-BR", {
            dateStyle: "short",
            timeStyle: "short",
            timeZone: "America/Sao_Paulo",
        }).format(new Date(data));
    };

    const colunas: Coluna[] = [
        {
            id: "nome_computador",
            header: "Computador",
            width: 220,
            align: "left",
        },
        {
            id: "usuario_atual",
            header: "Usuário",
            width: 220,
            align: "left",
        },
        {
            id: "dominio",
            header: "Domínio",
            width: 180,
            align: "center",
        },
        {
            id: "fabricante",
            header: "Fabricante",
            width: 180,
            align: "center",
        },
        {
            id: "modelo",
            header: "Modelo",
            width: 220,
            align: "center",
        },
        {
            id: "sistema_operacional",
            header: "Sistema operacional",
            width: 220,
            align: "center",
        },
        {
            id: "versao_so",
            header: "Versão",
            width: 130,
            align: "center",
        },
        {
            id: "arquitetura",
            header: "Arquitetura",
            width: 130,
            align: "center",
        },
        {
            id: "ip_interno",
            header: "IP interno",
            width: 160,
            align: "center",
        },
        {
            id: "ip_publico",
            header: "IP público",
            width: 160,
            align: "center",
        },
        {
            id: "ultimo_visto",
            header: "Último visto",
            width: 180,
            align: "center",
        },
    ] as const;

    if (maquinas.isPending) {
        return (
            <div className="py-10 text-center">
                Carregando usuários...
            </div>
        );
    }

    if (maquinas.isError) {
        return (
            <div className="py-10 text-center">
                Erro ao carregar usuários.
            </div>
        );
    }

    return (
        <>
            <motion.div
                animate={{
                    color: darkMode
                        ? "#fafafa"
                        : "#18181b",
                }}
                className="w-full overflow-x-auto shadow-sm"
            >
                <motion.table
                    className="w-full min-w-max border-collapse"
                >
                    <thead>
                        <motion.tr
                            initial={{
                                opacity: 0,
                                y: 8,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                        >
                            {colunas.map((coluna) => (
                                <motion.th
                                    key={coluna.id}
                                    style={{
                                        width: coluna.width,
                                        textAlign: coluna.align,
                                    }}
                                    initial={{
                                        opacity: 0,
                                        y: 8,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        borderColor: darkMode
                                            ? "#ffffff31"
                                            : "#00000055",
                                    }}
                                    whileHover={{
                                        backgroundColor: darkMode
                                            ? "#18181a"
                                            : "#f4f4f5",
                                    }}
                                    className="
                                        border
                                        sticky top-0
                                        z-10
                                        px-5 py-4
                                        text-xs
                                        font-semibold
                                        uppercase
                                        tracking-wider
                                        backdrop-blur-sm
                                    "
                                >
                                    {coluna.header}
                                </motion.th>
                            ))}
                        </motion.tr>
                    </thead>

                    <tbody>
                        {maquinasPagina.map((linha) => (
                            <LinhaUsuario
                                key={linha.id}
                                linha={linha}
                                colunas={colunas}
                                darkMode={darkMode}
                                formatarData={formatarData}
                            />
                        ))}
                    </tbody>
                </motion.table>
            </motion.div>

            {/* PAGINAÇÃO */}
            <motion.div
                animate={{
                    color: darkMode
                        ? "#fafafa"
                        : "#18181b",
                }}
                className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    py-5
                "
            >
                <button
                    onClick={() =>
                        setPagina((p) => Math.max(1, p - 1))
                    }
                    disabled={pagina === 1}
                    className="
                        rounded-md
                        border
                        px-4 py-2
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                    "
                >
                    Anterior
                </button>

                {paginasVisiveis().map((item, index) =>
                    item === "..." ? (
                        <span
                            key={`ellipsis-${index}`}
                            className="px-2"
                        >
                            ...
                        </span>
                    ) : (
                        <button
                            key={item}
                            onClick={() => setPagina(item)}
                            className={`
                                rounded-md
                                border
                                px-3 py-2

                                ${pagina === item
                                    ? darkMode
                                        ? "bg-white text-black"
                                        : "bg-black text-white"
                                    : ""
                                }
                            `}
                        >
                            {item}
                        </button>
                    )
                )}

                <button
                    onClick={() =>
                        setPagina((p) =>
                            Math.min(totalPaginas, p + 1)
                        )
                    }
                    disabled={pagina === totalPaginas}
                    className="
                        rounded-md
                        border
                        px-4 py-2
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                    "
                >
                    Próxima
                </button>
            </motion.div>
        </>
    );
}