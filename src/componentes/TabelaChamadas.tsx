import { useDados } from "@/contextos/Dados";
import { useAutenticacao } from "@/contextos/Autenticacao";
import { useFiltrosChamadas } from "@/contextos/FiltrosChamadas";
import { useHeader } from "@/contextos/Header";
import { motion } from 'motion/react';
import { Settings, Users2, Users } from 'lucide-react';
import { useState } from 'react';
import useTimerFormatado from '@/hooks/useTimerFormatado';
import { BotaoAcoesChamada } from './BotaoAcoesChamada';

type Coluna = {
    id: string;
    header: string;
    width: number;
    align?: "left" | "center" | "right";
};

type LinhaChamadaProps = {
    linha: any;
    colunas: readonly Coluna[];
    colunasData: string[];
    darkMode: boolean;
    formatarData: (data: string | null) => string;
    onSelecionar: (id: string) => void;

    meuId: string;
    onAcaoClick: (id: string, acao: 'acoes' | 'cooperacao') => void;
};

function LinhaChamada({
    linha,
    colunas,
    colunasData,
    darkMode,
    formatarData,
    onSelecionar,
    meuId,
    onAcaoClick
}: LinhaChamadaProps) {

    const bg = darkMode ? '#18181B' : '#f7f7f9'
    const timer = useTimerFormatado(linha);

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
                const valor =
                    linha[coluna.id as keyof typeof linha];

                const botao =
                    coluna.id === "acoes";

                const ehTempo =
                    coluna.id === "segundos_restantes";

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
                            backgroundColor: botao ? bg : '',
                        }}
                        className={`
    px-10 border py-5 whitespace-normal break-words

    ${botao
                                ? "sticky right-0 z-20 border-l"
                                : ""
                            }

    ${darkMode
                                ? "hover:bg-[#18181a]"
                                : "hover:bg-[#eaeaf0]"
                            }
`}
                    >
                        {botao ? (
                            <BotaoAcoesChamada
                                idChamada={linha.id}
                                idTecnicoResponsavel={linha.tecnico_id}
                                meuId={meuId}
                                numeroTecnicos={linha.numero_tecnicos || 0}
                                aoClicar={onAcaoClick}
                            />

                        ) : ehTempo ? (

                            timer

                        ) : colunasData.includes(coluna.id) ? (

                            formatarData(
                                valor as string | null
                            )

                        ) : (

                            String(valor ?? "-")

                        )}
                    </motion.td>
                );
            })}
        </motion.tr>
    );
}

export default function TabelaChamadas() {
    const { chamadas } = useDados();
    const [abrirConfiguracoes, setAbrirConfiguracoes] = useState(false);
    const [selecionarChamada, setSelecionarChamada] = useState<string | null>(null);
    const [modalAberto, setModalAberto] = useState<'acoes' | 'cooperacao' | null>(null);
    const [pagina, setPagina] = useState(1);

    const { megaInfoChamadas } = useFiltrosChamadas();
    const { user } = useAutenticacao();


    //const [meusDados, setMeusDados] = useState<typeof(megaInfoChamadas.individual)>(); 

    const itensPorPagina = 25;

    const totalItens = chamadas.data?.length ?? 0;

    const totalPaginas = Math.ceil(totalItens / itensPorPagina);

    const inicio = (pagina - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;

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

        const inicio = Math.max(2, pagina - 1);
        const fim = Math.min(totalPaginas - 1, pagina + 1);

        for (let i = inicio; i <= fim; i++) {
            paginas.push(i);
        }

        if (pagina < totalPaginas - 3) {
            paginas.push("...");
        }

        paginas.push(totalPaginas);

        return paginas;
    };

    const chamadasPagina = chamadas.data?.slice(inicio, fim) ?? [];

    const { darkMode } = useHeader();
    const bg = darkMode ? '#020202' : '#f7f7f9'

    const colunasData = [
        "data_atendeu",
        "data_criacao",
        "data_finalizacao",
        "prazo_final",
    ];


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
            id: "titulo",
            header: "Título",
            width: 250,
            align: "center",
        },
        {
            id: "descricao",
            header: "Descrição",
            width: 350,
            align: "center",
        },
        {
            id: "prioridade",
            header: "Prioridade",
            width: 120,
            align: "center",
        },
        {
            id: "categoria",
            header: "Categoria",
            width: 150,
            align: "center",
        },
        {
            id: "data_atendeu",
            header: "Atendido em",
            width: 160,
            align: "center",
        },
        {
            id: "data_criacao",
            header: "Criado em",
            width: 160,
            align: "center",
        },
        {
            id: "data_finalizacao",
            header: "Fechado em",
            width: 160,
            align: "center",
        },
        {
            id: "email_requerente",
            header: "Email",
            width: 250,
            align: "center",
        },
        {
            id: "requerente",
            header: "Nome",
            width: 200,
            align: "center",
        },
        {
            id: "prazo_final",
            header: "Vence em",
            width: 160,
            align: "center",
        },
        {
            id: "segundos_restantes",
            header: "Tempo",
            width: 160,
            align: "center",
        },
        {
            id: "status",
            header: "Status",
            width: 140,
            align: "center",
        },
        {
            id: "acoes",
            header: "Ações",
            width: 130,
            align: "center",
        },
    ] as const;

    if (chamadas.isPending) {
        return <h1>Carregando...</h1>;
    }

    if (chamadas.isError) {
        return <h1>Erro ao carregar chamadas</h1>;
    }

    return (
        <>
            <motion.div
                animate={{
                    color: darkMode
                        ? "#fafafa" : "#18181b",
                }}
                className="w-full overflow-x-auto shadow-sm" >

                <motion.table
                    className="w-full min-w-max">
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
                            {colunas.map((header) => (
                                <motion.th key={header.id}
                                    style={{
                                        width: header.width,
                                        textAlign: header.align,
                                    }}
                                    initial={{
                                        opacity: 0,
                                        y: 8,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        borderColor: darkMode ? "#ffffff31" : "#00000055",
                                    }}
                                    whileHover={{
                                        backgroundColor: darkMode
                                            ? "#18181a"
                                            : "#f4f4f5",
                                    }}
                                    className={`
    border
    sticky top-0
    z-10
    px-5 py-4
    text-xs
    font-semibold
    uppercase
    tracking-wider
    backdrop-blur-sm

    ${header.id === "acoes"
                                            ? "right-0 border-r"
                                            : ""
                                        }
`}
                                >
                                    {header.header}
                                </motion.th>
                            ))}
                        </motion.tr>
                    </thead>
                    <tbody>
                        {chamadasPagina.map((linha) => (
                            <LinhaChamada
                                key={linha.id}
                                linha={linha}
                                colunas={colunas}
                                colunasData={colunasData}
                                darkMode={darkMode}
                                formatarData={formatarData}
                                onSelecionar={setSelecionarChamada}

                                meuId={user?.id || ''}
                                onAcaoClick={(id, acao) => {
                                    setSelecionarChamada(id);
                                    setModalAberto(acao);
                                }}
                            />
                        ))}
                    </tbody>
                </motion.table>
            </motion.div >
            <motion.div
                animate={{
                    color: darkMode ? "#fafafa" : "#18181b",
                }}
                className="flex items-center justify-center gap-2 py-5"
            >
                <button
                    onClick={() => setPagina((p) => p - 1)}
                    disabled={pagina === 1}
                    className="
            rounded-md border px-4 py-2
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
                    onClick={() => setPagina((p) => p + 1)}
                    disabled={pagina === totalPaginas}
                    className="
            rounded-md border px-4 py-2
            disabled:cursor-not-allowed
            disabled:opacity-40
        "
                >
                    Próxima
                </button>
            </motion.div>
        </>
    )
}