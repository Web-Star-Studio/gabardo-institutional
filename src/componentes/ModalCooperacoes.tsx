import { useState } from 'react';
import { supabase } from '@/lib/supabase'; // Ajuste o caminho se necessário
import { useAutenticacao } from '@/contextos/Autenticacao';

interface ModalCooperacaoProps {
    idChamada: string;
    fecharModal: () => void;
}

export function ModalCooperacao({ idChamada, fecharModal }: ModalCooperacaoProps) {
    const { user } = useAutenticacao();
    const [loading, setLoading] = useState(false);

    const handleAssumirChamada = async () => {
        if (!user?.id) return;

        setLoading(true);
        try {
            // Chamada RPC (Remote Procedure Call) para a sua função SQL
            const { error } = await supabase.rpc('inserir_tecnico_chamada', {
                p_id_chamada: idChamada,
                p_id_tecnico: user.id
            });

            if (error) throw error;

            // Se chegou aqui, o PostgreSQL fez o commit da transação com sucesso
            alert("Chamada assumida com sucesso!");
            fecharModal();

        } catch (error) {
            console.error("Erro ao assumir chamada:", error);
            alert("Ocorreu um erro ao tentar assumir a chamada.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md p-6 bg-white dark:bg-[#18181b] rounded-lg shadow-xl border dark:border-gray-800">

                <h2 className="text-xl font-bold mb-4 dark:text-white">
                    Assumir Chamada
                </h2>

                <p className="mb-6 text-gray-600 dark:text-gray-400">
                    Você deseja cooperar e assumir o atendimento desta chamada?
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={fecharModal}
                        disabled={loading}
                        className="px-4 py-2 rounded-md border hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors dark:text-white"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={handleAssumirChamada}
                        disabled={loading}
                        className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                    >
                        {loading ? 'Processando...' : 'Assumir Chamada'}
                    </button>
                </div>
            </div>
        </div>
    );
}