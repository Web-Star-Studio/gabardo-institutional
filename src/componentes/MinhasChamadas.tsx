import { motion } from 'motion/react';
import useTimerFormatado from '@/hooks/useTimerFormatado';
import { useHeader } from '@/contextos/Header';

export function CardChamadaNova({ nova }: any) {
    const { darkMode } = useHeader();

    const tempo = useTimerFormatado({
        ...nova,
        segundos_restantes: nova.segundos_restantes ?? 0
    });

    return (
        <div
            key={nova.id}
            className={`
                        rounded-xl border p-4
                          ${darkMode
                    ? "border-zinc-700 bg-zinc-800/60"
                    : "border-zinc-200 bg-zinc-50"
                }
                        `}
        >
            <div className="mb-2 flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold leading-snug">
                    {nova.titulo}
                </h3>
                {nova.categoria && (
                    <span
                        className={`
                              shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium
                                ${darkMode
                                ? "bg-zinc-700 text-zinc-200"
                                : "bg-zinc-200 text-zinc-700"
                            }
                              `}
                    >
                        {nova.categoria}
                    </span>
                )}
            </div>

            {nova.descricao && (
                <p
                    className={`
                            mb-3 break-words text-sm leading-relaxed
                            ${darkMode ? "text-zinc-300" : "text-zinc-600"}
                          `}
                >
                    {nova.descricao}
                </p>
            )}

            <div
                className={`
                          flex flex-row justify-between gap-1 border-t pt-3 text-sm
                          ${darkMode ? "border-zinc-700" : "border-zinc-200"}
                        `}
            >
                <div>
                    {nova.requerente && (
                        <div className="flex gap-2">
                            <span
                                className={
                                    darkMode ? "text-zinc-500" : "text-zinc-400"
                                }
                            >
                                Requerente:
                            </span>
                            <span className="font-medium">{nova.requerente}</span>
                        </div>
                    )}
                    {nova.email_requerente && (
                        <div className="flex gap-2">
                            <span
                                className={
                                    darkMode ? "text-zinc-500" : "text-zinc-400"
                                }
                            >
                                E-mail:
                            </span>
                            <span className="truncate">{nova.email_requerente}</span>
                        </div>
                    )}
                </div>
                <div className="h-auto w-auto pr-10">
                    <motion.div
                        className="w-50 h-full rounded-lg text-2xl font-semibold"
                        animate={{}}
                    >
                        {tempo}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}