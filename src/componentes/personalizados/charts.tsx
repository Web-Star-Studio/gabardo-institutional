'use client';

import { useRef, useState, useMemo } from 'react';
import Moveable from 'react-moveable';
import {
    ResponsiveContainer,
    PieChart, Pie, Cell, Tooltip, Legend,
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import { useFiltrosChamadas } from '@/contextos/FiltrosChamadas';


type Frame = {
    translate: [number, number];
    rotate: number;
    width: number;
    height: number;
};

type ChartConfig = {
    id: string;
    title: string;
    default: Frame;
};


function dadosStatusGeral(mega: any) {
    return [
        { name: 'Em andamento', value: Math.max(0, mega.chamadasEmAndamento - mega.chamadasPausadas), fill: '#3b82f6' },
        { name: 'Pausadas', value: mega.chamadasPausadas, fill: '#f59e0b' },
        { name: 'Atrasadas', value: mega.chamadasAtrasadas, fill: '#ef4444' },
        { name: 'Paradas', value: mega.chamadasParadas, fill: '#6b7280' },
        { name: 'Concluídas', value: mega.chamadasConcluidas, fill: '#22c55e' },
        { name: 'Conc. atrasadas', value: mega.chamadasConcluidasAtrasadas, fill: '#a855f7' },
    ].filter((i) => i.value > 0);
}

function dadosTemposTotais(mega: any) {
    const toMin = (ms: number) => Math.round(ms / 1000 / 60);
    return [
        { name: 'Andamento', minutos: toMin(mega.tempoTotalAndamento), fill: '#3b82f6' },
        { name: 'Pausa', minutos: toMin(mega.tempoTotalPausa), fill: '#f59e0b' },
        { name: 'Espera', minutos: toMin(mega.tempoTotalEspera), fill: '#ef4444' },
    ];
}

function dadosRankingTecnicos(mega: any) {
    return Object.entries(mega.chamadasDele || {})
        .map(([nome, info]: [string, any]) => ({
            nome: nome.length > 15 ? nome.slice(0, 13) + '…' : nome,
            concluidas: info.numeroConcluidas,
            emAtendimento: info.numeroEmAtendimento,
            pausadas: info.numeroPausadas,
            atrasadas: info.numeroAtrasadas + info.numeroConcluidasAtrasadas,
            total: info.numeroTotalChamadas,
        }))
        .sort((a, b) => b.total - a.total);
}

function dadosTempoMedio(mega: any) {
    return Object.entries(mega.chamadasDele || {})
        .map(([nome, info]: [string, any]) => ({
            nome: nome.length > 13 ? nome.slice(0, 11) + '…' : nome,
            tempoMedio: Math.round((info.tempoMedioAtendimento || 0) / 1000 / 60),
        }))
        .sort((a, b) => a.tempoMedio - b.tempoMedio);
}

function dadosStatusPorTecnico(mega: any) {
    return Object.entries(mega.chamadasDele || {})
        .map(([nome, info]: [string, any]) => ({
            nome: nome.split(' ')[0],
            concluidas: info.numeroConcluidas,
            concluidasAtrasadas: info.numeroConcluidasAtrasadas,
            emAtendimento: info.numeroEmAtendimento,
            pausadas: info.numeroPausadas,
            atrasadas: info.numeroAtrasadas,
        }))
        .sort((a, b) => (b.concluidas + b.emAtendimento) - (a.concluidas + a.emAtendimento));
}


const CHARTS: ChartConfig[] = [
    {
        id: 'status',
        title: 'Status das Chamadas',
        default: { translate: [30, 30], rotate: 0, width: 420, height: 360 },
    },
    {
        id: 'tempos',
        title: 'Tempos Totais (min)',
        default: { translate: [480, 30], rotate: 0, width: 400, height: 320 },
    },
    {
        id: 'ranking',
        title: 'Ranking de Técnicos',
        default: { translate: [30, 420], rotate: 0, width: 560, height: 380 },
    },
    {
        id: 'tempoMedio',
        title: 'Tempo Médio por Técnico',
        default: { translate: [620, 420], rotate: 0, width: 480, height: 360 },
    },
    {
        id: 'statusTecnico',
        title: 'Status por Técnico',
        default: { translate: [910, 30], rotate: 0, width: 520, height: 360 },
    },
];


export default function ChartsMoveableMegaInfo() {
    const { megaInfoChamadas } = useFiltrosChamadas();

    const targetRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const [frames, setFrames] = useState<Record<string, Frame>>(() =>
        Object.fromEntries(CHARTS.map((c) => [c.id, { ...c.default }]))
    );

    const [selectedId, setSelectedId] = useState<string | null>(null);

    const data = useMemo(() => {
        if (!megaInfoChamadas || megaInfoChamadas.chamadasTotais === 0) return null;

        return {
            status: dadosStatusGeral(megaInfoChamadas),
            tempos: dadosTemposTotais(megaInfoChamadas),
            ranking: dadosRankingTecnicos(megaInfoChamadas),
            tempoMedio: dadosTempoMedio(megaInfoChamadas),
            statusTecnico: dadosStatusPorTecnico(megaInfoChamadas),
        };
    }, [megaInfoChamadas]);

    if (!data) {
        return (
            <div style={{ padding: 60, textAlign: 'center', color: '#64748b' }}>
                Sem dados de chamadas ainda...
            </div>
        );
    }

    const selectedTarget = selectedId ? targetRefs.current[selectedId] : null;
    const selectedFrame = selectedId ? frames[selectedId] : null;

    const updateFrame = (id: string, partial: Partial<Frame>) => {
        setFrames((prev) => ({
            ...prev,
            [id]: { ...prev[id], ...partial },
        }));
    };

    const renderChart = (id: string) => {
        switch (id) {
            case 'status':
                return (
                    <PieChart>
                        <Pie
                            data={data.status}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius="68%"
                        >
                            {data.status.map((entry, i) => (
                                <Cell key={i} fill={entry.fill} />
                            ))}
                        </Pie>
                        <Tooltip isAnimationActive={false} />
                        <Legend />
                    </PieChart>
                );

            case 'tempos':
                return (
                    <BarChart data={data.tempos} margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip isAnimationActive={false} />
                        <Bar dataKey="minutos" radius={[6, 6, 0, 0]}>
                            {data.tempos.map((entry, i) => (
                                <Cell key={i} fill={entry.fill} />
                            ))}
                        </Bar>
                    </BarChart>
                );

            case 'ranking':
                return (
                    <BarChart data={data.ranking} layout="vertical" margin={{ top: 10, right: 30, left: 80, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="nome" type="category" width={80} tick={{ fontSize: 12 }} />
                        <Tooltip isAnimationActive={false} />
                        <Legend />
                        <Bar dataKey="concluidas" stackId="a" fill="#22c55e" name="Concluídas" />
                        <Bar dataKey="emAtendimento" stackId="a" fill="#3b82f6" name="Em atendimento" />
                        <Bar dataKey="pausadas" stackId="a" fill="#f59e0b" name="Pausadas" />
                        <Bar dataKey="atrasadas" stackId="a" fill="#ef4444" name="Atrasadas" />
                    </BarChart>
                );

            case 'tempoMedio':
                return (
                    <BarChart data={data.tempoMedio} margin={{ top: 20, right: 20, left: 10, bottom: 60 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="nome" angle={-35} textAnchor="end" interval={0} height={70} tick={{ fontSize: 11 }} />
                        <YAxis />
                        <Tooltip isAnimationActive={false} />
                        <Bar dataKey="tempoMedio" fill="#8b5cf6" radius={[6, 6, 0, 0]} name="Tempo médio (min)" />
                    </BarChart>
                );

            case 'statusTecnico':
                return (
                    <BarChart data={data.statusTecnico} margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="nome" tick={{ fontSize: 12 }} />
                        <YAxis />
                        <Tooltip isAnimationActive={false} />
                        <Legend />
                        <Bar dataKey="concluidas" stackId="a" fill="#22c55e" name="Concluídas" />
                        <Bar dataKey="concluidasAtrasadas" stackId="a" fill="#a855f7" name="Conc. atrasadas" />
                        <Bar dataKey="emAtendimento" stackId="a" fill="#3b82f6" name="Em atendimento" />
                        <Bar dataKey="pausadas" stackId="a" fill="#f59e0b" name="Pausadas" />
                        <Bar dataKey="atrasadas" stackId="a" fill="#ef4444" name="Atrasadas" />
                    </BarChart>
                );

            default:
                return null;
        }
    };

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                minHeight: '100vh',
                background: '#f1f5f9',
                overflow: 'hidden',
            }}
            onClick={() => setSelectedId(null)} // clica fora = deseleciona
        >
            {/* ===== GRÁFICOS ===== */}
            {CHARTS.map((chart) => {
                const frame = frames[chart.id];

                return (
                    <div
                        key={chart.id}
                        ref={(el) => {
                            targetRefs.current[chart.id] = el;
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedId(chart.id);
                        }}
                        style={{
                            position: 'absolute',
                            width: frame.width,
                            height: frame.height,
                            transform: `translate(${frame.translate[0]}px, ${frame.translate[1]}px) rotate(${frame.rotate}deg)`,
                            transformOrigin: 'center center',
                            border: selectedId === chart.id ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                            borderRadius: 12,
                            background: '#fff',
                            boxShadow: selectedId === chart.id
                                ? '0 8px 30px rgba(59,130,246,0.25)'
                                : '0 4px 16px rgba(0,0,0,0.08)',
                            overflow: 'hidden',
                            cursor: 'default',
                            zIndex: selectedId === chart.id ? 50 : 10,
                            transition: 'box-shadow 0.15s, border-color 0.15s',
                        }}
                    >
                        {/* Cabeçalho */}
                        <div
                            style={{
                                height: 36,
                                background: selectedId === chart.id ? '#eff6ff' : '#f8fafc',
                                borderBottom: '1px solid #e2e8f0',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0 12px',
                                fontSize: 13,
                                fontWeight: 600,
                                color: '#1e293b',
                                userSelect: 'none',
                            }}
                        >
                            {chart.title}
                        </div>

                        {/* Gráfico */}
                        <div style={{ width: '100%', height: 'calc(100% - 36px)' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                {renderChart(chart.id)}
                            </ResponsiveContainer>
                        </div>
                    </div>
                );
            })}

            {/* ===== MOVEABLE (controles) ===== */}
            {selectedTarget && selectedFrame && (
                <Moveable
                    target={selectedTarget}
                    draggable
                    resizable
                    rotatable
                    throttleDrag={0}
                    throttleResize={0}
                    throttleRotate={1}
                    keepRatio={false}
                    origin={false}
                    edge={false}
                    // ---- Drag ----
                    onDrag={({ target, beforeTranslate }) => {
                        if (!selectedId) return;
                        updateFrame(selectedId, { translate: beforeTranslate as [number, number] });
                        target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px) rotate(${selectedFrame.rotate}deg)`;
                    }}
                    // ---- Resize ----
                    onResize={({ target, width, height, drag }) => {
                        if (!selectedId) return;
                        updateFrame(selectedId, {
                            width,
                            height,
                            translate: drag.beforeTranslate as [number, number],
                        });
                        target.style.width = `${width}px`;
                        target.style.height = `${height}px`;
                        target.style.transform = `translate(${drag.beforeTranslate[0]}px, ${drag.beforeTranslate[1]}px) rotate(${selectedFrame.rotate}deg)`;
                    }}
                    // ---- Rotate ----
                    onRotate={({ target, beforeRotate }) => {
                        if (!selectedId) return;
                        updateFrame(selectedId, { rotate: beforeRotate });
                        target.style.transform = `translate(${selectedFrame.translate[0]}px, ${selectedFrame.translate[1]}px) rotate(${beforeRotate}deg)`;
                    }}
                />
            )}
        </div>
    );
}