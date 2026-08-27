import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAutenticacao } from '@/contextos/Autenticacao';

interface ModalAcoesProps {
    idChamada: string;
    fecharModal: () => void;
}

export function ModalAcoes({ idChamada, fecharModal }: ModalAcoesProps) {
    const { user } = useAutenticacao();
    const [loading, setLoading] = useState(false);

    // Estado opcional caso queira enviar um texto junto com a ação (útil para o motivo 'comentou')
    const [descricao, setDescricao] = useState('');

    // Função central que se comunica com sua RPC no banco
    const handleAcao = async (motivo: 'comentou' | 'pausou' | 'continuou' | 'fechou') => {
        if (!user?.id) return;

        setLoading(true);
        try {
            // Chamada direta para a sua função SQL
            const { error } = await supabase.rpc('criar_andamento', {
                p_id_chamada: idChamada,
                p_id_tecnico: user.id,
                p_motivo: motivo,
                // p_descricao: descricao // Descomente caso atualize sua função SQL para receber o texto
            });

            if (error) throw error;

            fecharModal();

        } catch (error: any) {
            console.error("Erro ao registrar andamento:", error);
            // Captura os erros personalizados que você programou com "RAISE EXCEPTION" no SQL
            alert(error.message || "Erro ao executar ação na chamada.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md p-6 bg-white dark:bg-[#18181b] rounded-lg shadow-xl border dark:border-[#ffffff31]">

                <h2 className="text-xl font-bold mb-4 dark:text-white">
                    Ações da Chamada
                </h2>

                <textarea
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    placeholder="Adicione um comentário ou justificativa (opcional)"
                    className="w-full p-3 mb-4 rounded-md border dark:border-gray-700 bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                />

                <div className="grid grid-cols-2 gap-3 mb-6">
                    <button
                        onClick={() => handleAcao('comentou')}
                        disabled={loading}
                        className="p-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        Comentar
                    </button>
                    <button
                        onClick={() => handleAcao('pausou')}
                        disabled={loading}
                        className="p-2 border rounded-md hover:bg-yellow-50 dark:hover:bg-yellow-900/20 text-yellow-600 transition-colors"
                    >
                        Pausar
                    </button>
                    <button
                        onClick={() => handleAcao('continuou')}
                        disabled={loading}
                        className="p-2 border rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 transition-colors"
                    >
                        Continuar
                    </button>
                    <button
                        onClick={() => handleAcao('fechou')}
                        disabled={loading}
                        className="p-2 border rounded-md hover:bg-green-50 dark:hover:bg-green-900/20 text-green-600 transition-colors"
                    >
                        Finalizar
                    </button>
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={fecharModal}
                        className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}