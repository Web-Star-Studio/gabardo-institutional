import { DataGrid, type GridRowsProp, type GridColDef } from '@mui/x-data-grid';
import { useDados } from '@/contextos/Dados';
import { useEffect, useState } from 'react';

export default function TabelaChamadas() {
    const { chamadas } = useDados();

    const colunas: GridColDef[] = [
        { field: 'titulo', headerName: 'Título', width: 300 },
        { field: 'descricao', headerName: 'Descrição', width: 300 },
        { field: 'titulo', headerName: 'Título', width: 300 },
        { field: 'prioridade', headerName: 'Prioridade', width: 300 },
        { field: 'categoria', headerName: 'Categoria', width: 300 },
        { field: 'data_atendeu', headerName: 'Atendido em', width: 300 },
        { field: 'data_criacao', headerName: 'Criado em', width: 300 },
        { field: 'data_finalizacao', headerName: 'Fechado em', width: 300 },
        { field: 'email_requerente', headerName: 'Email', width: 300 },
        { field: 'requerente', headerName: 'Nome', width: 300 },
        { field: 'prazo', headerName: 'Vence em', width: 300 },
        { field: 'seguros_restantes', headerName: 'Tempo', width: 300 },
        { field: 'status', headerName: 'Status', width: 300 },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            {(chamadas.isSuccess) && (
                <DataGrid rows={chamadas.data ?} columns={colunas} />
            )}
        </div>
    );
}