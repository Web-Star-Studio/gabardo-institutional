import { useDados } from "@/contextos/Dados";
import { useHeader } from "@/contextos/Header";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState, useMemo } from "react";
import MiniSearch from "minisearch";
import UsuarioCompleto from "@/componentes/UsuariosCompletos";

type TabelaUsuariosProps = {
    pesquisa: string;
};

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
    aoClicar: () => void;
    formatarData: (data: string | null) => string;
};

function LinhaUsuario({
    linha,
    colunas,
    darkMode,
    aoClicar,
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
            onClick={aoClicar}
            className="cursor-pointer"
        >
            {colunas.map((coluna) => {

                const valor =
                    linha[coluna.id as keyof typeof linha];

                const ehData =
                    coluna.id === "ultimo_visto";

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

export default function TabelaUsuarios({
    pesquisa,
}: TabelaUsuariosProps) {

    const { maquinas } = useDados();

    const { darkMode } = useHeader();

    /*
     * ------------------------------------------------------------
     * MODAL
     * ------------------------------------------------------------
     */

    const [modalInfo, setModalInfo] =
        useState(false);

    /*
     * Aqui guardamos o ID da MÁQUINA.
     *
     * Diferente da TabelaSoftwares, não existe
     * programaSelecionado.
     */
    const [maquinaSelecionada, setMaquinaSelecionada] =
        useState<string | null>(null);

    /*
     * ------------------------------------------------------------
     * PAGINAÇÃO
     * ------------------------------------------------------------
     */

    const [pagina, setPagina] =
        useState(1);

    const itensPorPagina = 25;

    /*
     * ------------------------------------------------------------
     * PESQUISA
     * ------------------------------------------------------------
     */

    const miniSearch = useMemo(() => {

        const search = new MiniSearch({
            fields: [
                "nome_computador",
                "usuario_atual",
                "dominio",
                "fabricante",
                "modelo",
                "sistema_operacional",
                "versao_so",
                "arquitetura",
                "ip_interno",
                "ip_publico",
            ],

            storeFields: [
                "id",
                "nome_computador",
                "dominio",
                "usuario_atual",
                "fabricante",
                "modelo",
                "familia_sistema",
                "placa_mae_fabricante",
                "placa_mae_produto",
                "placa_mae_serial",
                "sistema_operacional",
                "versao_so",
                "arquitetura",
                "ultimo_visto",
                "criado_em",
                "ip_publico",
                "ip_interno",
            ],
        });

        if (maquinas.data) {
            search.addAll(maquinas.data);
        }

        return search;

    }, [maquinas.data]);

    const maquinasFiltradas = useMemo(() => {

        const termo =
            pesquisa.trim();

        if (!termo) {
            return maquinas.data ?? [];
        }

        return miniSearch.search(termo, {
            prefix: true,
            fuzzy: 0.1,
        });

    }, [
        pesquisa,
        miniSearch,
        maquinas.data,
    ]);

    /*
     * ------------------------------------------------------------
     * PAGINAÇÃO
     * ------------------------------------------------------------
     */

    const totalItens =
        maquinasFiltradas.length;

    const totalPaginas =
        Math.max(
            1,
            Math.ceil(
                totalItens / itensPorPagina
            )
        );

    const inicio =
        (pagina - 1) *
        itensPorPagina;

    const fim =
        inicio +
        itensPorPagina;

    const maquinasPagina =
        maquinasFiltradas.slice(
            inicio,
            fim
        );

    /*
     * ------------------------------------------------------------
     * FECHAR MODAL COM ESC
     * ------------------------------------------------------------
     *
     * Igual à TabelaSoftwares.
     */

    useEffect(() => {

        if (!modalInfo) return;

        const handleKeyDown =
            (event: KeyboardEvent) => {

                if (event.key === "Escape") {

                    setModalInfo(false);

                    setMaquinaSelecionada(null);
                }
            };

        window.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {

            window.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };

    }, [modalInfo]);

    /*
     * ------------------------------------------------------------
     * RESET DA PÁGINA
     * ------------------------------------------------------------
     */

    useEffect(() => {

        setPagina(1);

    }, [
        pesquisa,
        maquinasFiltradas.length,
    ]);

    /*
     * Garante que a página atual
     * nunca fique maior que o total.
     */

    useEffect(() => {

        setPagina(
            (paginaAtual) =>
                Math.min(
                    paginaAtual,
                    totalPaginas
                )
        );

    }, [totalPaginas]);

    /*
     * ------------------------------------------------------------
     * PÁGINAS VISÍVEIS
     * ------------------------------------------------------------
     */

    const paginasVisiveis = () => {

        const paginas:
            (number | "...")[] = [];

        if (totalPaginas <= 7) {

            for (
                let i = 1;
                i <= totalPaginas;
                i++
            ) {
                paginas.push(i);
            }

            return paginas;
        }

        paginas.push(1);

        if (pagina > 4) {
            paginas.push("...");
        }

        const inicioPaginas =
            Math.max(
                2,
                pagina - 1
            );

        const fimPaginas =
            Math.min(
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

        if (
            pagina <
            totalPaginas - 3
        ) {
            paginas.push("...");
        }

        paginas.push(totalPaginas);

        return paginas;
    };

    /*
     * ------------------------------------------------------------
     * FORMATAÇÃO DA DATA
     * ------------------------------------------------------------
     */

    const formatarData = (
        data: string | null
    ) => {

        if (!data) return "-";

        return new Intl.DateTimeFormat(
            "pt-BR",
            {
                dateStyle: "short",
                timeStyle: "short",
                timeZone: "America/Sao_Paulo",
            }
        ).format(
            new Date(data)
        );
    };

    /*
     * ------------------------------------------------------------
     * COLUNAS
     * ------------------------------------------------------------
     */

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

    /*
     * ------------------------------------------------------------
     * LOADING
     * ------------------------------------------------------------
     */

    if (maquinas.isPending) {

        return (
            <h1>
                Carregando usuários...
            </h1>
        );
    }

    /*
     * ------------------------------------------------------------
     * ERROR
     * ------------------------------------------------------------
     */

    if (maquinas.isError) {

        return (
            <h1>
                Erro ao carregar usuários
            </h1>
        );
    }

    /*
     * ------------------------------------------------------------
     * RENDER
     * ------------------------------------------------------------
     */

    return (
        <>

            {/* ====================================================
                TABELA
            ==================================================== */}

            <motion.div
                animate={{
                    color: darkMode
                        ? "#fafafa"
                        : "#18181b",
                }}
                className="
                    w-full
                    overflow-x-auto
                    shadow-sm
                "
            >

                <motion.table
                    className="
                        w-full
                        min-w-max
                    "
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

                            {colunas.map(
                                (coluna) => (

                                    <motion.th
                                        key={coluna.id}
                                        style={{
                                            width:
                                                coluna.width,
                                            textAlign:
                                                coluna.align,
                                        }}
                                        initial={{
                                            opacity: 0,
                                            y: 8,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            borderColor:
                                                darkMode
                                                    ? "#ffffff31"
                                                    : "#00000055",
                                        }}
                                        whileHover={{
                                            backgroundColor:
                                                darkMode
                                                    ? "#18181a"
                                                    : "#f4f4f5",
                                        }}
                                        className="
                                            border
                                            sticky
                                            top-0
                                            z-10
                                            px-5
                                            py-4
                                            text-xs
                                            font-semibold
                                            uppercase
                                            tracking-wider
                                            backdrop-blur-sm
                                        "
                                    >
                                        {coluna.header}
                                    </motion.th>

                                )
                            )}

                        </motion.tr>

                    </thead>

                    <tbody>

                        {maquinasPagina.map(
                            (linha) => (

                                <LinhaUsuario
                                    key={linha.id}
                                    linha={linha}
                                    colunas={colunas}
                                    darkMode={darkMode}
                                    formatarData={
                                        formatarData
                                    }
                                    aoClicar={() => {

                                        /*
                                         * AQUI ESTÁ A DIFERENÇA
                                         *
                                         * Na TabelaSoftwares:
                                         *
                                         * setProgramaSelecionado(
                                         *     linha.id
                                         * );
                                         *
                                         * Aqui:
                                         *
                                         * setMaquinaSelecionada(
                                         *     linha.id
                                         * );
                                         */

                                        setMaquinaSelecionada(
                                            linha.id
                                        );

                                        setModalInfo(
                                            true
                                        );
                                    }}
                                />

                            )
                        )}

                    </tbody>

                </motion.table>

            </motion.div>


            {/* ====================================================
                PAGINAÇÃO
            ==================================================== */}

            {totalPaginas > 1 && (

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
                            setPagina(
                                (p) =>
                                    Math.max(
                                        1,
                                        p - 1
                                    )
                            )
                        }
                        disabled={
                            pagina === 1
                        }
                        className="
                            rounded-md
                            border
                            px-4
                            py-2
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                        "
                    >
                        Anterior
                    </button>


                    {paginasVisiveis().map(
                        (
                            item,
                            index
                        ) =>

                            item === "..." ? (

                                <span
                                    key={
                                        `ellipsis-${index}`
                                    }
                                    className="px-2"
                                >
                                    ...
                                </span>

                            ) : (

                                <button
                                    key={item}
                                    onClick={() =>
                                        setPagina(
                                            item
                                        )
                                    }
                                    className={`
                                        rounded-md
                                        border
                                        px-3
                                        py-2

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
                            setPagina(
                                (p) =>
                                    Math.min(
                                        totalPaginas,
                                        p + 1
                                    )
                            )
                        }
                        disabled={
                            pagina ===
                            totalPaginas
                        }
                        className="
                            rounded-md
                            border
                            px-4
                            py-2
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                        "
                    >
                        Próxima
                    </button>

                </motion.div>

            )}


            {/* ====================================================
                MODAL DA MÁQUINA
            ==================================================== */}

            <AnimatePresence>

                {modalInfo &&
                    maquinaSelecionada !== null && (

                        <motion.div
                            key="modal-maquina"
                            className="
                                fixed
                                inset-0
                                z-[1000]
                                flex
                                items-center
                                justify-center
                            "
                        >

                            {/* =================================================
                                OVERLAY
                            ================================================= */}

                            <motion.div
                                className="
                                    absolute
                                    inset-0
                                    z-0
                                    bg-black/40
                                "
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                }}
                                onClick={() => {

                                    setModalInfo(
                                        false
                                    );

                                    setMaquinaSelecionada(
                                        null
                                    );
                                }}
                            />


                            {/* =================================================
                                CONTEÚDO DO MODAL
                            ================================================= */}

                            <motion.div
                                className="
                                    relative
                                    z-10
                                    w-full
                                    max-w-5xl
                                    max-h-[90vh]
                                    overflow-y-auto
                                "
                                initial={{
                                    opacity: 0,
                                    scale: 0.95,
                                    y: 20,
                                    height: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    y: 0,
                                    height: "auto",
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.95,
                                    y: 20,
                                    height: 0,
                                }}
                                transition={{
                                    duration: 0.2,
                                    ease: "easeInOut",
                                }}
                                onClick={(event) => {

                                    event.stopPropagation();
                                }}
                            >

                                <UsuarioCompleto
                                    maquina_id={
                                        maquinaSelecionada
                                    }
                                />

                            </motion.div>

                        </motion.div>

                    )}

            </AnimatePresence>

        </>
    );
}