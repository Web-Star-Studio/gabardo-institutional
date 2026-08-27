import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAutenticacao } from '@/contextos/Autenticacao';
import { useHeader } from '@/contextos/Header';
import { motion } from 'motion/react';

interface ModalAcoesProps {
    idChamada: string;
    statusChamada: number;
    fecharModal: () => void;
}

export function ModalAcoes({ idChamada, statusChamada, fecharModal }: ModalAcoesProps) {
    const { user } = useAutenticacao();
    const [loading, setLoading] = useState(false);

    const { darkMode } = useHeader();

    const bg = darkMode ? '#181818' : '#f7f7f9'
    const card = darkMode ? '#1414178b' : '#ffffff98'
    const border = darkMode ? '#2f2f3e' : '#9090ffbb'
    const text = darkMode ? '#e8e8ea' : '#0f172a'
    const muted = darkMode ? '#6b6b78' : '#6b7280'
    const primary = darkMode ? '#1e3a8a' : '#1904fd'
    const primaryHover = darkMode ? '#1e40af' : '#1904fd'
    const inputBg = darkMode ? '#1c1c21' : '#F9F9F7'
    const accent = darkMode ? '#3b83f638' : '#1904fd28'
    const cursorzinho = 'cursor-target';


    const [descricao, setDescricao] = useState('');

    const handleAcao = async (motivo: 'comentou' | 'pausou' | 'continuou' | 'fechou') => {
        if (!user?.id) return;

        setLoading(true);
        try {
            const { error } = await supabase.rpc('criar_andamento', {
                p_id_chamada: idChamada,
                p_id_tecnico: user.id,
                p_motivo: motivo,
                p_descricao: descricao || null
            });

            if (error) throw error;

            fecharModal();

        } catch (error: any) {
            console.error("Erro ao registrar andamento:", error);
            alert(error.message || "Erro ao executar ação na chamada.");
        } finally {
            setLoading(false);
        }
    };

    const isPausado = statusChamada === 4;
    const isContando = (statusChamada == 5 || statusChamada == 6);

    return (
        <motion.div
            animate={{
                backgroundColor: bg,
                color: text
            }}
            className="w-180 p-6  rounded-lg shadow-xl border ">

            <motion.h2 className="text-xl font-bold mb-4">
                Ações da Chamada
            </motion.h2>

            <motion.textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Adicione um comentário ou justificativa (opcional)"
                className="w-full p-3 mb-4 rounded-md border focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows={3}
            />

            <motion.div className="grid grid-cols-2 gap-3 mb-6">
                <motion.button
                    onClick={() => handleAcao('comentou')}
                    disabled={loading}
                    className="p-2 border rounded-md "
                >
                    Comentar
                </motion.button>
                <motion.button
                    onClick={() => handleAcao('pausou')}
                    disabled={loading || isPausado}
                    className="p-2 border rounded-md"
                >
                    {isPausado ? 'Já Pausado' : 'Pausar'}
                </motion.button>
                <motion.button
                    onClick={() => handleAcao('continuou')}
                    disabled={loading || isContando}
                    className="p-2 border rounded-md"
                >
                    {isContando ? 'Já em Andamento' : 'Continuar'}                </motion.button>
                <motion.button
                    onClick={() => handleAcao('fechou')}
                    disabled={loading}
                    className="p-2 border rounded-md"
                >
                    Finalizar
                </motion.button>
            </motion.div>

            <motion.div className="flex justify-end">
                <motion.button
                    onClick={fecharModal}
                    className="px-4 py-2 text-sm"
                >
                    Cancelar
                </motion.button>
            </motion.div>
        </motion.div>
    );
}