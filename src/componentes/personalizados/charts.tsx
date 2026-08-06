'use client';

import { useRef, useState, useMemo } from 'react';
import Moveable from 'react-moveable';
import { motion, AnimatePresence } from 'motion/react';
import {
    ResponsiveContainer,
    PieChart, Pie, Cell, Tooltip, Legend,
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    AreaChart, Area,
} from 'recharts';
import { useFiltrosChamadas } from '@/contextos/FiltrosChamadas';
import { useHeader } from '@/contextos/Header';

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
    visible: boolean;
};

const COLORS = {
    andamento: '#3b82f6',
    pausa: '#f59e0b',
    atrasada: '#ef4444',
    parada: '#6b7280',
    concluida: '#22c55e',
    concluidaAtraso: '#a855f7',
    medio: '#8b5cf6',
    espera: '#f97316',
};

function toMin(ms: number = 0) {
    return Math.round(ms / 1000 / 60);
}

function toHours(ms: number = 0) {
    return +(ms / 1000 / 60 / 60).toFixed(1);
}

// ===================== DATA HELPERS =====================

function dadosStatusGeral(mega: any, tecnico?: string | null) {
    if (tecnico && tecnico !== 'Geral' && mega.chamadasDele?.[tecnico]) {
        const t = mega.chamadasDele[tecnico];
        return [
            { name: 'Em andamento', value: Math.max(0, t.numeroEmAtendimento - t.numeroPausadas), fill: COLORS.andamento },
            { name: 'Pausadas', value: t.numeroPausadas, fill: COLORS.pausa },
            { name: 'Atrasadas', value: t.numeroAtrasadas, fill: COLORS.atrasada },
            { name: 'Concluídas', value: t.numeroConcluidas, fill: COLORS.concluida },
            { name: 'Fechadas c/ atraso', value: t.numeroConcluidasAtrasadas, fill: COLORS.concluidaAtraso },
        ].filter((i) => i.value > 0);
    }

    return [
        { name: 'Em andamento', value: Math.max(0, mega.chamadasEmAndamento - mega.chamadasPausadas), fill: COLORS.andamento },
        { name: 'Pausadas', value: mega.chamadasPausadas, fill: COLORS.pausa },
        { name: 'Atrasadas', value: mega.chamadasAtrasadas, fill: COLORS.atrasada },
        { name: 'Paradas', value: mega.chamadasParadas, fill: COLORS.parada },
        { name: 'Concluídas', value: mega.chamadasConcluidas, fill: COLORS.concluida },
        { name: 'Fechadas c/ atraso', value: mega.chamadasConcluidasAtrasadas, fill: COLORS.concluidaAtraso },
    ].filter((i) => i.value > 0);
}

function dadosTemposTotais(mega: any, tecnico?: string | null) {
    if (tecnico && tecnico !== 'Geral' && mega.chamadasDele?.[tecnico]) {
        const t = mega.chamadasDele[tecnico];
        return [
            { name: 'Andamento', minutos: toMin(t.tempoTotalAndamento), horas: toHours(t.tempoTotalAndamento), fill: COLORS.andamento },
            { name: 'Pausa', minutos: toMin(t.tempoTotalPausa), horas: toHours(t.tempoTotalPausa), fill: COLORS.pausa },
            { name: 'Espera', minutos: toMin(t.tempoTotalEspera), horas: toHours(t.tempoTotalEspera), fill: COLORS.espera },
        ];
    }

    return [
        { name: 'Andamento', minutos: toMin(mega.tempoTotalAndamento), horas: toHours(mega.tempoTotalAndamento), fill: COLORS.andamento },
        { name: 'Pausa', minutos: toMin(mega.tempoTotalPausa), horas: toHours(mega.tempoTotalPausa), fill: COLORS.pausa },
        { name: 'Espera', minutos: toMin(mega.tempoTotalEspera), horas: toHours(mega.tempoTotalEspera), fill: COLORS.espera },
    ];
}

function dadosRankingTecnicos(mega: any) {
    return Object.entries(mega.chamadasDele || {})
        .map(([nome, info]: [string, any]) => ({
            nome: nome.length > 16 ? nome.slice(0, 14) + '…' : nome,
            nomeCompleto: nome,
            concluidas: info.numeroConcluidas || 0,
            emAtendimento: info.numeroEmAtendimento || 0,
            pausadas: info.numeroPausadas || 0,
            atrasadas: (info.numeroAtrasadas || 0) + (info.numeroConcluidasAtrasadas || 0),
            total: info.numeroTotalChamadas || 0,
            tempoMedioMin: toMin(info.tempoMedioAtendimento),
        }))
        .sort((a, b) => b.total - a.total);
}

function dadosTempoMedio(mega: any) {
    return Object.entries(mega.chamadasDele || {})
        .map(([nome, info]: [string, any]) => ({
            nome: nome.length > 14 ? nome.slice(0, 12) + '…' : nome,
            nomeCompleto: nome,
            tempoMedio: toMin(info.tempoMedioAtendimento),
            tempoMedioHoras: toHours(info.tempoMedioAtendimento),
        }))
        .sort((a, b) => a.tempoMedio - b.tempoMedio);
}

function dadosStatusPorTecnico(mega: any) {
    return Object.entries(mega.chamadasDele || {})
        .map(([nome, info]: [string, any]) => ({
            nome: nome.split(' ')[0],
            nomeCompleto: nome,
            concluidas: info.numeroConcluidas || 0,
            concluidasAtrasadas: info.numeroConcluidasAtrasadas || 0,
            emAtendimento: info.numeroEmAtendimento || 0,
            pausadas: info.numeroPausadas || 0,
            atrasadas: info.numeroAtrasadas || 0,
        }))
        .sort((a, b) => (b.concluidas + b.emAtendimento) - (a.concluidas + a.emAtendimento));
}

function dadosTemposPorTecnico(mega: any) {
    return Object.entries(mega.chamadasDele || {})
        .map(([nome, info]: [string, any]) => ({
            nome: nome.split(' ')[0],
            nomeCompleto: nome,
            andamento: toMin(info.tempoTotalAndamento),
            pausa: toMin(info.tempoTotalPausa),
            espera: toMin(info.tempoTotalEspera),
            total: toMin((info.tempoTotalAndamento || 0) + (info.tempoTotalPausa || 0) + (info.tempoTotalEspera || 0)),
        }))
        .sort((a, b) => b.total - a.total);
}

// ===================== CHARTS CONFIG =====================

const INITIAL_CHARTS: ChartConfig[] = [
    {
        id: 'status',
        title: 'Status das Chamadas',
        default: { translate: [30, 30], rotate: 0, width: 420, height: 360 },
        visible: true,
    },
    {
        id: 'tempos',
        title: 'Tempos Totais (min / h)',
        default: { translate: [480, 30], rotate: 0, width: 420, height: 340 },
        visible: true,
    },
    {
        id: 'ranking',
        title: 'Ranking de Técnicos',
        default: { translate: [30, 420], rotate: 0, width: 560, height: 380 },
        visible: true,
    },
    {
        id: 'tempoMedio',
        title: 'Tempo Médio por Técnico (min)',
        default: { translate: [620, 420], rotate: 0, width: 480, height: 360 },
        visible: true,
    },
    {
        id: 'statusTecnico',
        title: 'Status por Técnico',
        default: { translate: [920, 30], rotate: 0, width: 520, height: 360 },
        visible: true,
    },
    {
        id: 'temposTecnico',
        title: 'Tempos por Técnico (min)',
        default: { translate: [920, 420], rotate: 0, width: 520, height: 380 },
        visible: true,
    },
];

// ===================== COMPONENT =====================

export default function ChartsMoveableMegaInfo() {
    const { megaInfoChamadas } = useFiltrosChamadas();
    const { darkMode } = useHeader();

    const targetRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const [frames, setFrames] = useState<Record<string, Frame>>(() =>
        Object.fromEntries(INITIAL_CHARTS.map((c) => [c.id, { ...c.default }]))
    );
    const [charts, setCharts] = useState<ChartConfig[]>(INITIAL_CHARTS);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [tecnicoSelecionado, setTecnicoSelecionado] = useState<string>('Geral');
    const [showControls, setShowControls] = useState(true);

    const tecnicosList = useMemo(() => {
        if (!megaInfoChamadas?.chamadasDele) return ['Geral'];
        return ['Geral', ...Object.keys(megaInfoChamadas.chamadasDele).sort()];
    }, [megaInfoChamadas]);

    const data = useMemo(() => {
        if (!megaInfoChamadas || megaInfoChamadas.chamadasTotais === 0) return null;

        const tech = tecnicoSelecionado === 'Geral' ? null : tecnicoSelecionado;

        return {
            status: dadosStatusGeral(megaInfoChamadas, tech),
            tempos: dadosTemposTotais(megaInfoChamadas, tech),
            ranking: dadosRankingTecnicos(megaInfoChamadas),
            tempoMedio: dadosTempoMedio(megaInfoChamadas),
            statusTecnico: dadosStatusPorTecnico(megaInfoChamadas),
            temposTecnico: dadosTemposPorTecnico(megaInfoChamadas),
        };
    }, [megaInfoChamadas, tecnicoSelecionado]);

    const bg = darkMode ? '#1b1a1a' : '#f1f5f9';
    const cardBg = darkMode ? '#262626' : '#fff';
    const textColor = darkMode ? '#e2e8f0' : '#1e293b';
    const borderColor = darkMode ? '#404040' : '#e2e8f0';
    const headerBg = darkMode ? '#333' : '#f8fafc';

    if (!data) {
        return (
            <motion.div
                animate={{ padding: 60, textAlign: 'center', color: '#64748b', backgroundColor: bg }}
                style={{ minHeight: '100vh' }}
            >
                Sem dados de chamadas ainda...
            </motion.div>
        );
    }

    const selectedTarget = selectedId ? targetRefs.current[selectedId] : null;
    const selectedFrame = selectedId ? frames[selectedId] : null;

    const updateFrame = (id: string, partial: Partial<Frame>) => {
        setFrames((prev) => ({ ...prev, [id]: { ...prev[id], ...partial } }));
    };

    const toggleVisibility = (id: string) => {
        setCharts((prev) =>
            prev.map((c) => (c.id === id ? { ...c, visible: !c.visible } : c))
        );
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
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
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
                        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#444' : '#e2e8f0'} />
                        <XAxis dataKey="name" stroke={textColor} />
                        <YAxis stroke={textColor} />
                        <Tooltip
                            isAnimationActive={false}
                            contentStyle={{ background: cardBg, border: `1px solid ${borderColor}` }}
                            formatter={(value: number, name: string, props: any) => [
                                `${value} min (${props.payload.horas}h)`,
                                name,
                            ]}
                        />
                        <Bar dataKey="minutos" radius={[6, 6, 0, 0]} name="Minutos">
                            {data.tempos.map((entry, i) => (
                                <Cell key={i} fill={entry.fill} />
                            ))}
                        </Bar>
                    </BarChart>
                );

            case 'ranking':
                return (
                    <BarChart data={data.ranking} layout="vertical" margin={{ top: 10, right: 30, left: 90, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#444' : '#e2e8f0'} />
                        <XAxis type="number" stroke={textColor} />
                        <YAxis dataKey="nome" type="category" width={85} tick={{ fontSize: 12, fill: textColor }} />
                        <Tooltip isAnimationActive={false} contentStyle={{ background: cardBg, border: `1px solid ${borderColor}` }} />
                        <Legend />
                        <Bar dataKey="concluidas" stackId="a" fill={COLORS.concluida} name="Concluídas" />
                        <Bar dataKey="emAtendimento" stackId="a" fill={COLORS.andamento} name="Em atendimento" />
                        <Bar dataKey="pausadas" stackId="a" fill={COLORS.pausa} name="Pausadas" />
                        <Bar dataKey="atrasadas" stackId="a" fill={COLORS.atrasada} name="Atrasadas" />
                    </BarChart>
                );

            case 'tempoMedio':
                return (
                    <BarChart data={data.tempoMedio} margin={{ top: 20, right: 20, left: 10, bottom: 60 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#444' : '#e2e8f0'} />
                        <XAxis dataKey="nome" angle={-35} textAnchor="end" interval={0} height={70} tick={{ fontSize: 11, fill: textColor }} />
                        <YAxis stroke={textColor} />
                        <Tooltip
                            isAnimationActive={false}
                            contentStyle={{ background: cardBg, border: `1px solid ${borderColor}` }}
                            formatter={(v: number) => [`${v} min`, 'Tempo médio']}
                        />
                        <Bar dataKey="tempoMedio" fill={COLORS.medio} radius={[6, 6, 0, 0]} name="Tempo médio (min)" />                    </BarChart>
                );

            case 'statusTecnico':
                return (
                    <BarChart data={data.statusTecnico} margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#444' : '#e2e8f0'} />
                        <XAxis dataKey="nome" tick={{ fontSize: 12, fill: textColor }} />
                        <YAxis stroke={textColor} />
                        <Tooltip isAnimationActive={false} contentStyle={{ background: cardBg, border: `1px solid ${borderColor}` }} />
                        <Legend />
                        <Bar dataKey="concluidas" stackId="a" fill={COLORS.concluida} name="Concluídas" />
                        <Bar dataKey="concluidasAtrasadas" stackId="a" fill={COLORS.concluidaAtraso} name="Conc. atrasadas" />
                        <Bar dataKey="emAtendimento" stackId="a" fill={COLORS.andamento} name="Em atendimento" />
                        <Bar dataKey="pausadas" stackId="a" fill={COLORS.pausa} name="Pausadas" />
                        <Bar dataKey="atrasadas" stackId="a" fill={COLORS.atrasada} name="Atrasadas" />
                    </BarChart>
                );

            case 'temposTecnico':
                return (
                    <BarChart data={data.temposTecnico} margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#444' : '#e2e8f0'} />
                        <XAxis dataKey="nome" tick={{ fontSize: 12, fill: textColor }} />
                        <YAxis stroke={textColor} />
                        <Tooltip isAnimationActive={false} contentStyle={{ background: cardBg, border: `1px solid ${borderColor}` }} />
                        <Legend />
                        <Bar dataKey="andamento" stackId="a" fill={COLORS.andamento} name="Andamento" />
                        <Bar dataKey="pausa" stackId="a" fill={COLORS.pausa} name="Pausa" />
                        <Bar dataKey="espera" stackId="a" fill={COLORS.espera} name="Espera" />
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
                background: bg,
                overflow: 'hidden',
            }}
            onClick={() => setSelectedId(null)}
        >
            {/* ===== CONTROLES FLUTUANTES ===== */}
            <AnimatePresence>
                {showControls && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{
                            position: 'fixed',
                            top: 16,
                            right: 16,
                            zIndex: 100,
                            background: cardBg,
                            border: `1px solid ${borderColor}`,
                            borderRadius: 12,
                            padding: '12px 16px',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                            minWidth: 260,
                            color: textColor,
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                            <strong style={{ fontSize: 14 }}>Controles</strong>
                            <button
                                onClick={() => setShowControls(false)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: textColor, fontSize: 18 }}
                            >
                                ×
                            </button>
                        </div>

                        {/* Dropdown Técnico */}
                        <label style={{ fontSize: 12, opacity: 0.8, display: 'block', marginBottom: 4 }}>
                            Filtrar por Técnico
                        </label>
                        <select
                            value={tecnicoSelecionado}
                            onChange={(e) => setTecnicoSelecionado(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '6px 10px',
                                borderRadius: 8,
                                border: `1px solid ${borderColor}`,
                                background: darkMode ? '#333' : '#fff',
                                color: textColor,
                                marginBottom: 14,
                                fontSize: 13,
                            }}
                        >
                            {tecnicosList.map((t) => (
                                <option key={t} value={t}>
                                    {t}
                                </option>
                            ))}
                        </select>

                        {/* Toggles de visibilidade */}
                        <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 6 }}>Exibir Charts</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            {charts.map((c) => (
                                <label
                                    key={c.id}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        fontSize: 13,
                                        cursor: 'pointer',
                                        userSelect: 'none',
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={c.visible}
                                        onChange={() => toggleVisibility(c.id)}
                                        style={{ accentColor: '#3b82f6' }}
                                    />
                                    {c.title}
                                </label>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Botão para reabrir controles */}
            {!showControls && (
                <button
                    onClick={() => setShowControls(true)}
                    style={{
                        position: 'fixed',
                        top: 16,
                        right: 16,
                        zIndex: 100,
                        background: '#3b82f6',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 8,
                        padding: '8px 14px',
                        cursor: 'pointer',
                        fontWeight: 600,
                        boxShadow: '0 4px 12px rgba(59,130,246,0.4)',
                    }}
                >
                    Controles
                </button>
            )}

            {/* ===== GRÁFICOS ===== */}
            {charts.map((chart) => {
                const frame = frames[chart.id];
                const isVisible = chart.visible;

                return (
                    <div
                        key={chart.id}
                        ref={(el) => {
                            targetRefs.current[chart.id] = el;
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (isVisible) setSelectedId(chart.id);
                        }}
                        style={{
                            position: 'absolute',
                            width: frame.width,
                            height: frame.height,
                            transform: `translate(${frame.translate[0]}px, ${frame.translate[1]}px) rotate(${frame.rotate}deg)`,
                            transformOrigin: 'center center',
                            border: selectedId === chart.id ? '2px solid #3b82f6' : `1px solid ${borderColor}`,
                            borderRadius: 12,
                            background: cardBg,
                            boxShadow:
                                selectedId === chart.id
                                    ? '0 8px 30px rgba(59,130,246,0.25)'
                                    : '0 4px 16px rgba(0,0,0,0.08)',
                            overflow: 'hidden',
                            cursor: isVisible ? 'default' : 'default',
                            zIndex: selectedId === chart.id ? 50 : 10,
                            transition: 'box-shadow 0.15s, border-color 0.15s, opacity 0.25s',
                            opacity: isVisible ? 1 : 0,
                            pointerEvents: isVisible ? 'auto' : 'none',
                        }}
                    >
                        {/* Cabeçalho */}
                        <div
                            style={{
                                height: 36,
                                background: selectedId === chart.id ? (darkMode ? '#1e3a5f' : '#eff6ff') : headerBg,
                                borderBottom: `1px solid ${borderColor}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '0 12px',
                                fontSize: 13,
                                fontWeight: 600,
                                color: textColor,
                                userSelect: 'none',
                            }}
                        >
                            <span>
                                {chart.title}
                                {tecnicoSelecionado !== 'Geral' && ['status', 'tempos'].includes(chart.id) && (
                                    <span style={{ fontWeight: 400, opacity: 0.7, marginLeft: 6 }}>
                                        · {tecnicoSelecionado.split(' ')[0]}
                                    </span>
                                )}
                            </span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleVisibility(chart.id);
                                }}
                                title="Ocultar chart"
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: textColor,
                                    opacity: 0.6,
                                    fontSize: 16,
                                    lineHeight: 1,
                                }}
                            >
                                ×
                            </button>
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

            {/* ===== MOVEABLE ===== */}
            {selectedTarget && selectedFrame && selectedId && charts.find((c) => c.id === selectedId)?.visible && (
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
                    onDrag={({ target, beforeTranslate }) => {
                        if (!selectedId) return;
                        updateFrame(selectedId, { translate: beforeTranslate as [number, number] });
                        target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px) rotate(${selectedFrame.rotate}deg)`;
                    }}
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