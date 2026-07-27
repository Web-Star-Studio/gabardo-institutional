import type { DadosContextType } from "@/contextos/tipos-contexto";
import type { SessaoConfig } from "../tipos/grafico";

export function montarSessoesDashboard(dados: DadosContextType): SessaoConfig[] {
  return [
    {
      titulo: "Chamadas",
      graficos: [
        { titulo: "Por status", dados: dados.infoChamadas.chamadasPorStatus },
        { titulo: "Por prioridade", dados: dados.infoChamadas.chamadasPorPrioridade },
        { titulo: "Por tecnico", dados: dados.infoChamadas.chamadasPorTecnico },
      ],
    },
    {
      titulo: "Computadores",
      graficos: [
        { titulo: "Por arquitetura", dados: dados.arquitetura },
        { titulo: "Por sistema operacional", dados: dados.SO },
        { titulo: "Por modelo", dados: dados.modelos },
        { titulo: "Por fabricante", dados: dados.fabricantes },
        { titulo: "Por ativacao", dados: dados.ativacao },
      ],
    },
    {
      titulo: "Processadores",
      graficos: [
        { titulo: "Por processador", dados: dados.processadores },
        { titulo: "Por fabricante", dados: dados.processadorFabricantes },
      ],
    },
    {
      titulo: "Memorias",
      graficos: [
        { titulo: "Por tipo", dados: dados.meTipos },
        { titulo: "Por velocidade", dados: dados.meVelocidade },
        { titulo: "Por status", dados: dados.meStatus },
        { titulo: "Por capacidade", dados: dados.meCapacidade },
      ],
    },
    {
      titulo: "Monitores",
      graficos: [
        { titulo: "Por monitor", dados: dados.monitores },
        { titulo: "Por fabricante", dados: dados.mFabricantes },
        { titulo: "Por quantidade", dados: dados.mContagem },
      ],
    },
    {
      titulo: "Placas-mae",
      graficos: [
        { titulo: "Por fabricante", dados: dados.pmFabricantes },
        { titulo: "Por modelo", dados: dados.pmModelos },
        { titulo: "Por status", dados: dados.pmStatus },
      ],
    },
    {
      titulo: "Seguranca",
      graficos: [
        { titulo: "UAC", dados: dados.uac },
        { titulo: "Firewall", dados: dados.firewall },
      ],
    },
    {
      titulo: "Impressoras",
      graficos: [
        { titulo: "Por impressora", dados: dados.impressoras },
        { titulo: "Por driver", dados: dados.iDrivers },
        { titulo: "Por status", dados: dados.iStatus },
      ],
    },
  ];
}
