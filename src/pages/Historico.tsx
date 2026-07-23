import React from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  IconButton, Chip, Button, Tooltip
} from '@mui/material';
import { 
  Visibility as VisibilityIcon, 
  PictureAsPdf as PdfIcon, 
  Delete as DeleteIcon, 
  Replay as ReplayIcon 
} from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Peticao } from '../types';
import dayjs from 'dayjs';

export default function Historico() {
  const queryClient = useQueryClient();
  const { data: peticoes, isLoading } = useQuery<(Peticao & { cliente_nome: string; advogado_nome: string })[]>({
    queryKey: ['peticoes'],
    queryFn: () => axios.get('/api/peticoes').then(res => res.data)
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => axios.delete(`/api/peticoes/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['peticoes'] })
  });

  const handleDownloadPdf = (path: string) => {
    window.open(path, '_blank');
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>Histórico de Petições</Typography>

      <TableContainer component={Paper} sx={{ border: '1px solid', borderColor: 'divider' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8fafc' }}>
            <TableRow>
              <TableCell sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', letterSpacing: 0.5 }}>Número</TableCell>
              <TableCell sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', letterSpacing: 0.5 }}>Data</TableCell>
              <TableCell sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', letterSpacing: 0.5 }}>Cliente</TableCell>
              <TableCell sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', letterSpacing: 0.5 }}>Advogado</TableCell>
              <TableCell sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', letterSpacing: 0.5 }}>Tipo</TableCell>
              <TableCell sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', letterSpacing: 0.5 }}>Status</TableCell>
              <TableCell align="right" sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', letterSpacing: 0.5 }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {peticoes?.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.numero}</TableCell>
                <TableCell>{dayjs(p.data).format('DD/MM/YYYY HH:mm')}</TableCell>
                <TableCell>{p.cliente_nome}</TableCell>
                <TableCell>{p.advogado_nome}</TableCell>
                <TableCell>{p.tipo}</TableCell>
                <TableCell>
                  <Chip label={p.status} size="small" color="primary" variant="outlined" />
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Visualizar PDF">
                    <IconButton color="primary" onClick={() => p.pdf_path && handleDownloadPdf(p.pdf_path)}>
                      <PdfIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Excluir">
                    <IconButton color="error" onClick={() => p.id && deleteMutation.mutate(p.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {peticoes?.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">Nenhum registro encontrado.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
