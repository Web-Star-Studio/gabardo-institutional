import { useState } from 'react';
import { Settings, User, Users } from 'lucide-react';
import { useAutenticacao } from '@/contextos/Autenticacao';
import { useHeader } from '@/contextos/Header';

interface BotaoAcoesChamadaProps {
  idChamada: string;
  idTecnicoResponsavel: string | null;
  numeroTecnicos: number;
  aoClicar: (idChamada: string, tipoAcao: 'acoes' | 'cooperacao') => void;
  status: number;
}

export function BotaoAcoesChamada({
  idChamada,
  idTecnicoResponsavel,
  numeroTecnicos,
  aoClicar,
  status
}: BotaoAcoesChamadaProps) {

  const [isHovered, setIsHovered] = useState(false);

  const { darkMode } = useHeader();

  const { user } = useAutenticacao();

  const meuId = user?.id;

  const isMeuAtendimento =
    idTecnicoResponsavel !== null &&
    idTecnicoResponsavel === meuId;


  const semTecnico = idTecnicoResponsavel === null;
  const desativar = status == 2 || status == 1;
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
      disabled={desativar}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => aoClicar(idChamada, tipoAcao)}
      className={`
  p-2 rounded-md transition-colors

  ${darkMode
          ? (
            desativar
              ? 'bg-gray-800 text-gray-600 cursor-not-allowed opacity-50'
              : 'bg-transparent text-gray-200 hover:bg-gray-800 hover:text-blue-400 cursor-pointer'
          )
          : (
            desativar
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50'
              : 'bg-transparent text-gray-700 hover:bg-gray-200 hover:text-blue-600 cursor-pointer'
          )
        }
`}
      title={
        desativar
          ? 'Esta chamada está fechada'
          : tipoAcao === 'acoes'
            ? 'Configurações da Chamada'
            : 'Cooperar / Assumir'
      }
    >
      <IconeAtual size={20} />
    </button>
  );
}