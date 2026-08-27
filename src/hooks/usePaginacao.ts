import { useState, useEffect } from 'react';

export function usePaginacao(totalItens: number, itensPorPagina: number = 25) {
  const [pagina, setPagina] = useState(1);
  const totalPaginas = Math.ceil(totalItens / itensPorPagina);

  useEffect(() => {
    if (pagina > totalPaginas && totalPaginas > 0) {
      setPagina(totalPaginas);
    }
  }, [totalItens, totalPaginas, pagina]);

  const inicio = (pagina - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;

  return {
    pagina,
    setPagina,
    totalPaginas,
    inicio,
    fim,
  };
}