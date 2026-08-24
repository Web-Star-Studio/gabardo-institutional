import { useDados } from "@/contextos/Dados";
import { useHeader } from "@/contextos/Header";
import { motion } from 'motion/react';
import { Settings, Users2, Users } from 'lucide-react';
import { useState } from 'react';

type Coluna = {
    id: string;
    header: string;
    width: number;
    align?: "left" | "center" | "right";
};


export default function TabelaChamadas() {
    const { chamadas } = useDados();
    const [abrirConfiguracoes, setAbrirConfiguracoes] = useState(false);
    const [selecionarChamada, setSelecionarChamada] = useState("");

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
            width: 120,
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
            width: 100,
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
                                    border sticky top-0 z-10 px-5 py-4 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm
                                 `}
                                >
                                    {header.header}
                                </motion.th>
                            ))}
                        </motion.tr>
                    </thead>
                    <tbody>
                        {chamadas.data?.map((linha) => (
                            <motion.tr
                                key={linha.id}
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
                                    const valor = linha[coluna.id as keyof typeof linha];
                                    const botao = coluna.id === 'acoes';
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


                                            className={`
        px-10 border py-5 whitespace-normal break-words
        ${darkMode
                                                    ? "hover:bg-[#18181a]"
                                                    : "hover:bg-[#eaeaf0]"
                                                }
    `}
                                        >{botao ? (
                                            <motion.button
                                                onClick={() => setSelecionarChamada(linha.id)}
                                            >
                                                <Settings className="outline-none" size={40} />
                                            </motion.button>
                                        ) : (
                                            colunasData.includes(coluna.id)
                                                ? formatarData(valor as string | null)
                                                : String(valor ?? "-")
                                        )}
                                        </motion.td>
                                    );
                                })}
                            </motion.tr>
                        ))}
                    </tbody>
                </motion.table>
            </motion.div >
            {
                (abrirConfiguracoes) && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => setAbrirConfiguracoes(false)}
                        className="fixed inset-0 z-[501] bg-black/40"
                    />
                )
            }

        </>
    )
}