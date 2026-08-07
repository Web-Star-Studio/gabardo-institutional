import { ResponsiveContainer, SunburstChart, type SunburstData, Tooltip } from 'recharts';
import { useHeader } from "@/contextos/Header";
import { useFiltrosChamadas } from "@/contextos/FiltrosChamadas";

export default function SunburstChartExample() {

    const { darkMode } = useHeader();
    const { megaInfoChamadas } = useFiltrosChamadas();

    const categorias = [
        {
            name: "Atrasadas",
            fill: "#df670c",
            total: megaInfoChamadas.chamadasAtrasadas,
            field: "numeroAtrasadas",
        },
        {
            name: "Em Atendimento",
            fill: "#2a9d8f",
            total: megaInfoChamadas.chamadasEmAndamento,
            field: "numeroEmAtendimento",
        },
        {
            name: "Concluídas",
            fill: "#e9c46a",
            total: megaInfoChamadas.chamadasConcluidas,
            field: "numeroConcluidas",
        },
        {
            name: "Concluídas c/ atraso",
            fill: "#bf1414",
            total: megaInfoChamadas.chamadasConcluidasAtrasadas,
            field: "numeroConcluidasAtrasadas",
        },
        {
            name: "Paradas",
            fill: "#706161",
            total: megaInfoChamadas.chamadasParadas,
        },
        {
            name: "Pausadas",
            fill: "#dbb241",
            total: megaInfoChamadas.chamadasPausadas,
            field: "numeroPausadas",
        },
    ] as const;

    const hierarchy: SunburstData = {
        name: "Chamadas",
        value: megaInfoChamadas.chamadasTotais,

        children: categorias.map(({ name, fill, total, field }) => ({
            name,
            fill,
            value: total,

            children: field
                ? Object.entries(megaInfoChamadas.chamadasDele).map(([tecnico, info]) => ({
                    name: tecnico,
                    value: info[field],
                }))
                : undefined,
        })),
    };

    Object.entries(megaInfoChamadas.chamadasDele).forEach(([nome, info]) => {
        console.group(nome);

        console.table({
            Total: info.numeroTotalChamadas,
            Atendimento: info.numeroEmAtendimento,
            Atrasadas: info.numeroAtrasadas,
            Concluidas: info.numeroConcluidas,
            ConcluidasAtrasadas: info.numeroConcluidasAtrasadas,
            Pausadas: info.numeroPausadas,
        });

        console.groupEnd();
    });

    const soma = {
        atendimento: 0,
        atrasadas: 0,
        concluidas: 0,
        concluidasAtrasadas: 0,
        pausadas: 0,
    };

    Object.values(megaInfoChamadas.chamadasDele).forEach((info) => {
        soma.atendimento += info.numeroEmAtendimento;
        soma.atrasadas += info.numeroAtrasadas;
        soma.concluidas += info.numeroConcluidas;
        soma.concluidasAtrasadas += info.numeroConcluidasAtrasadas;
        soma.pausadas += info.numeroPausadas;
    });

    console.group("=== TOTAIS ===");

    console.table({
        "Em Atendimento": {
            Global: megaInfoChamadas.chamadasEmAndamento,
            SomaFilhos: soma.atendimento,
        },
        Atrasadas: {
            Global: megaInfoChamadas.chamadasAtrasadas,
            SomaFilhos: soma.atrasadas,
        },
        Concluidas: {
            Global: megaInfoChamadas.chamadasConcluidas,
            SomaFilhos: soma.concluidas,
        },
        "Concluidas c/ atraso": {
            Global: megaInfoChamadas.chamadasConcluidasAtrasadas,
            SomaFilhos: soma.concluidasAtrasadas,
        },
        Pausadas: {
            Global: megaInfoChamadas.chamadasPausadas,
            SomaFilhos: soma.pausadas,
        },
        Paradas: {
            Global: megaInfoChamadas.chamadasParadas,
        },
    });

    console.groupEnd();

    console.log("hierarchy", hierarchy);
    return (
        <ResponsiveContainer width="100%" height={450}>
            <SunburstChart
                startAngle={90}
                endAngle={270}
                data={hierarchy}>
                <Tooltip />
            </SunburstChart>
        </ResponsiveContainer>
    );
}