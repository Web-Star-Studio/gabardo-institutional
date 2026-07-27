import type { InfoPCs, Contagem } from "../tipos-contexto";
import type { InventarioRegistro } from "@/lib/tipos_inventario";

function registro(valor: unknown): Record<string, unknown> {
  return typeof valor === "object" && valor !== null && !Array.isArray(valor)
    ? valor as Record<string, unknown>
    : {};
}

function lista(valor: unknown): unknown[] {
  return Array.isArray(valor) ? valor : [];
}

function texto(valor: unknown) {
  if (valor === null || valor === undefined) {
    return null;
  }

  const convertido = String(valor).trim();
  return convertido.length > 0 ? convertido : null;
}

function contar(destino: Contagem, valor: unknown) {
  const chave = texto(valor);

  if (!chave) {
    return;
  }

  destino[chave] = (destino[chave] ?? 0) + 1;
}

function contarComoTexto(destino: Contagem, valor: unknown) {
  const chave = texto(valor) ?? "Nao informado";
  destino[chave] = (destino[chave] ?? 0) + 1;
}

export function montarInfoPCs(registros: InventarioRegistro[]): InfoPCs {
  const info: InfoPCs = {
    totalUsuarios: registros.length,
    numeroUsuarios: registros.length,
    usuarios: {},
    processadores: {},
    processadorFabricantes: {},
    modelos: {},
    fabricantes: {},
    SO: {},
    ativacao: {},
    arquitetura: {},
    meTipos: {},
    meVelocidade: {},
    meStatus: {},
    meCapacidade: {},
    monitores: {},
    mStatus: {},
    mFabricantes: {},
    mContagem: {},
    pmFabricantes: {},
    pmModelos: {},
    pmStatus: {},
    softwares: {},
    uac: {},
    firewall: {},
    impressoras: {},
    iDrivers: {},
    iStatus: {},
  };

  registros.forEach((item) => {
    const data = registro(item.data);
    const coleta = registro(data.coleta);
    const processador = registro(data.processador);
    const sistema = registro(data.sistema);
    const memoria = registro(data.memoria);
    const monitoresDados = registro(data.monitores);
    const placaMae = registro(data.placa_mae ?? data.placas_mae);
    const seguranca = registro(data.seguranca);
    const software = registro(data.software);

    if (item.hostname) {
      info.usuarios[item.hostname] = texto(coleta.usuario_executando) ?? "";
    }

    contar(info.processadores, processador.nome);
    contar(info.processadorFabricantes, processador.fabricante);

    contar(info.modelos, sistema.modelo_computador);
    contar(info.fabricantes, sistema.fabricante_computador);
    contar(info.SO, sistema.nome);
    contar(info.ativacao, sistema.ativacao);
    contar(info.arquitetura, sistema.arquitetura);

    contar(info.meTipos, memoria.tipo);
    contar(info.meStatus, memoria.status);

    lista(memoria.modulos).forEach((moduloBruto) => {
      const modulo = registro(moduloBruto);
      contar(info.meVelocidade, modulo.velocidade_mhz);
      contar(info.meCapacidade, modulo.capacidade_gb);
    });

    contar(info.mStatus, monitoresDados.status);
    contar(info.mFabricantes, monitoresDados.fabricante);
    contarComoTexto(info.mContagem, lista(data.monitores_edid).length);

    lista(data.monitores_edid).forEach((monitorBruto) => {
      const monitor = registro(monitorBruto);
      contar(info.monitores, monitor.nome_amigavel);
      contar(info.mFabricantes, monitor.fabricante);
    });

    contar(info.pmModelos, placaMae.modelo);
    contar(info.pmFabricantes, placaMae.fabricante);
    contar(info.pmStatus, placaMae.status);

    contar(info.uac, seguranca.uac);
    contar(info.firewall, seguranca.firewall);

    lista(software.programas_instalados).forEach((programaBruto) => {
      const programa = registro(programaBruto);
      contar(info.softwares, programa.nome);
    });

    lista(data.impressoras).forEach((impressoraBruta) => {
      const impressora = registro(impressoraBruta);

      if (!impressora.local) {
        return;
      }

      contar(info.impressoras, impressora.nome);
      contar(info.iStatus, impressora.status);
      contar(info.iDrivers, impressora.driver);
    });
  });

  return info;
}
