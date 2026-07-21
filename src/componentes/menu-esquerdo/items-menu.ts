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
      "Cartuchos",
      "Insumos",
      "Telefones",
      "Dispositivos não gerenciados",
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
      "Fila de Notificação",
      "Inventário",
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
  {
    titulo: "Configurações",
    submenus: [
      "Listas suspensas",
      "Notificações",
      "Níveis de serviços",
      "Geral",
      "Unicidade de campos",
      "Ações automáticas",
      "Autenticação",
      "Destinatários",
      "Plug-ins",
      "Aplicações Oauth IMAP",
    ],
  },
];

export default itemsMenu;