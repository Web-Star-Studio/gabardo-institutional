export type ItemMenu = {
    titulo: string;
    submenus: string[];
}

export const itemsMenu: ItemMenu[] = [
  {
    titulo: "Ativos",
    submenus: [
      "Dashboard",
      "Computadores",
      "Monitores",
      "Softwares",
      "Dispositivos de Rede",
      "Dispositivos",
      "Impressoras",
      "Global",
    ],
  },
  {
    titulo: "Assistência",
    submenus: [
      "Dashboard",
      "Chamadas",
      "Criar chamada",
      "Estatísticas",
      "Chamadas recorrentes",
    ],
  },
  {
    titulo: "Gerência",
    submenus: [
      "Licenças",
      "Orçamentos",
      "Fornecedores",
      "Contatos",
      "Contratos",
      "Certificados",
      "Domínios",
    ],
  },
  {
    titulo: "Ferramentas",
    submenus: [
      "Projetos",
      "Base de Conhecimento",
      "Alertas",
    ],
  },

  {
    titulo: "Administração",
    submenus: [
      "Usuários",
      "Grupos",
    ],
  },
  {
    titulo: "Câmeras",
    submenus: [
      "Monitoramento",
      "Gravações",
      "Dispositivos",
    ],
  },
];

export default itemsMenu;