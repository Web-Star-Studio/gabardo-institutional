import { useState } from 'react';
import { supabase } from '@/lib/supabase'; // Ajuste o caminho se necessário
import { useAutenticacao } from '@/contextos/Autenticacao';
import { motion } from 'motion/react';
import { useHeader } from '@/contextos/Header';

interface ModalCooperacaoProps {
    idChamada: string;
    fecharModal: () => void;
}

export function ModalCooperacoes({ idChamada, fecharModal }: ModalCooperacaoProps) {
    const { user } = useAutenticacao();
    const [loading, setLoading] = useState(false);

    const { darkMode } = useHeader();

    const bg = darkMode ? '#181818' : '#f7f7f9'
    const text = darkMode ? '#e8e8ea' : '#0f172a'

    const handleAssumirChamada = async () => {
        if (!user?.id) return;

        setLoading(true);
        try {
            const { error } = await supabase.rpc('inserir_tecnico_chamada', {
                p_id_chamada: idChamada,
                p_id_tecnico: user.id
            });

            if (error) throw error;

            fecharModal();

        } catch (error) {
            console.error("Erro ao assumir chamada:", error);
            alert("Ocorreu um erro ao tentar assumir a chamada.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            animate={{
                backgroundColor: bg,
                color: text
            }}
            className="w-180 p-6 rounded-lg shadow-xl border ">

            <h2 className="text-xl font-bold mb-4">
                Assumir Chamada
            </h2>

            <motion.p className="mb-6 ">
                Você deseja cooperar e assumir o atendimento desta chamada?
            </motion.p>

            <motion.div className="flex justify-end gap-3">
                <motion.button
                    onClick={fecharModal}
                    disabled={loading}
                    className="px-4 py-2 rounded-md border "
                >
                    Cancelar
                </motion.button>

                <motion.button
                    onClick={handleAssumirChamada}
                    disabled={loading}
                    className="px-4 py-2 rounded-md   disabled:opacity-50 flex items-center gap-2"
                >
                    {loading ? 'Processando...' : 'Assumir Chamada'}
                </motion.button>
            </motion.div>
        </motion.div>
    );
}