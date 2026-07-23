import React, { useState } from 'react';
import { 
  Box, Typography, Paper, Grid, TextField, Button, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, MenuItem, Divider
} from '@mui/material';
import { Search as SearchIcon, FileDownload as FileDownloadIcon } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Advogado, Cliente, TipoPeticao, Peticao } from '../types';
import dayjs from 'dayjs';

const TIPOS_PETICAO: TipoPeticao[] = [
  'Petição Inicial', 'Petição Intermediária', 'Contestação', 'Recursos', 'Cumprimento de Sentença'
];

export default function Relatorios() {
  const [filters, setFilters] = useState({
    data_inicio: '',
    data_fim: '',
    cliente_id: '',
    advogado_id: '',
    tipo: ''
  });

  const { data: advogados } = useQuery<Advogado[]>({ queryKey: ['advogados'], queryFn: () => axios.get('/api/advogados').then(res => res.data) });
  const { data: clientes } = useQuery<Cliente[]>({ queryKey: ['clientes'], queryFn: () => axios.get('/api/clientes').then(res => res.data) });

  const { data: results, refetch, isFetching } = useQuery<(Peticao & { cliente_nome: string; advogado_nome: string })[]>({
    queryKey: ['relatorio', filters],
    queryFn: () => axios.get('/api/peticoes/relatorio', { params: filters }).then(res => res.data),
    enabled: false
  });

  const handleSearch = () => refetch();

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>Relatórios</Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField label="Data Inicial" type="date" fullWidth slotProps={{ inputLabel: { shrink: true } }} value={filters.data_inicio} onChange={(e) => setFilters({ ...filters, data_inicio: e.target.value })} />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField label="Data Final" type="date" fullWidth slotProps={{ inputLabel: { shrink: true } }} value={filters.data_fim} onChange={(e) => setFilters({ ...filters, data_fim: e.target.value })} />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField select label="Tipo" fullWidth value={filters.tipo} onChange={(e) => setFilters({ ...filters, tipo: e.target.value })}>
              <MenuItem value="">Todos</MenuItem>
              {TIPOS_PETICAO.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField select label="Advogado" fullWidth value={filters.advogado_id} onChange={(e) => setFilters({ ...filters, advogado_id: e.target.value })}>
              <MenuItem value="">Todos</MenuItem>
              {advogados?.map(a => <MenuItem key={a.id} value={a.id}>{a.nome}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField select label="Cliente" fullWidth value={filters.cliente_id} onChange={(e) => setFilters({ ...filters, cliente_id: e.target.value })}>
              <MenuItem value="">Todos</MenuItem>
              {clientes?.map(c => <MenuItem key={c.id} value={c.id}>{c.tipo === 'PF' ? c.nome : c.razao_social}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Button variant="contained" fullWidth startIcon={<SearchIcon />} onClick={handleSearch} disabled={isFetching}>Filtrar</Button>
          </Grid>
        </Grid>
      </Paper>

      {results && (
        <TableContainer component={Paper} sx={{ border: '1px solid', borderColor: 'divider' }}>
          <Table>
            <TableHead sx={{ bgcolor: '#f8fafc' }}>
              <TableRow>
                <TableCell sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', letterSpacing: 0.5 }}>Número</TableCell>
                <TableCell sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', letterSpacing: 0.5 }}>Cliente</TableCell>
                <TableCell sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', letterSpacing: 0.5 }}>Advogado</TableCell>
                <TableCell sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', letterSpacing: 0.5 }}>Tipo</TableCell>
                <TableCell sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', letterSpacing: 0.5 }}>Data</TableCell>
                <TableCell sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', letterSpacing: 0.5 }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.numero}</TableCell>
                  <TableCell>{r.cliente_nome}</TableCell>
                  <TableCell>{r.advogado_nome}</TableCell>
                  <TableCell>{r.tipo}</TableCell>
                  <TableCell>{dayjs(r.data).format('DD/MM/YYYY')}</TableCell>
                  <TableCell>{r.status}</TableCell>
                </TableRow>
              ))}
              {results.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">Nenhum resultado para os filtros aplicados.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
