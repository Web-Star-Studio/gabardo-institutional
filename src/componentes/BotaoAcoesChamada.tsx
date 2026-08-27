import { useState } from 'react';
import { Settings, User, Users } from 'lucide-react'; // Assumindo Lucide para os ícones
import { useAutenticacao } from '@/contextos/Autenticacao';

interface BotaoAcoesChamadaProps {
  idChamada: string;
  idTecnicoResponsavel: string | null;
  numeroTecnicos: number;
  aoClicar: (idChamada: string, tipoAcao: 'acoes' | 'cooperacao') => void;
}

export function BotaoAcoesChamada({
  idChamada,
  idTecnicoResponsavel,
  numeroTecnicos,
  aoClicar
}: BotaoAcoesChamadaProps) {

  const [isHovered, setIsHovered] = useState(false);

  const { user } = useAutenticacao();

  const meuId = user?.id;

  const isMeuAtendimento =
    idTecnicoResponsavel !== null &&
    idTecnicoResponsavel === meuId;

  const semTecnico = idTecnicoResponsavel === null;

  const maisDeUmTecnico = numeroTecnicos > 1;

  let IconeAtual = User;
  let tipoAcao: 'acoes' | 'cooperacao' = 'cooperacao';

  if (isMeuAtendimento) {
    IconeAtual = Settings;
    tipoAcao = 'acoes';
  } else if (semTecnico) {
    IconeAtual = User;
    tipoAcao = 'cooperacao';
  } else if (maisDeUmTecnico || isHovered) {
    IconeAtual = Users;
    tipoAcao = 'cooperacao';
  }

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => aoClicar(idChamada, tipoAcao)}
      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
      title={tipoAcao === 'acoes' ? 'Configurações da Chamada' : 'Cooperar / Assumir'}
    >
      <IconeAtual size={20} className="text-gray-700" />
    </button>
  );
}