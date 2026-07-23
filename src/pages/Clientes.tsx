import React, { useState } from 'react';
import { 
  Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, MenuItem,
  Snackbar, Alert, Tab, Tabs
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Cliente } from '../types';
import { useForm, Controller } from 'react-hook-form';

import ClienteDialog from '../components/ClienteDialog';

export default function ClientesList() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const { data: clientes, isLoading } = useQuery<Cliente[]>({
    queryKey: ['clientes'],
    queryFn: () => axios.get('/api/clientes').then(res => res.data)
  });

  const mutation = useMutation({
    mutationFn: (newCliente: Cliente) => {
      if (selectedCliente?.id) {
        return axios.put(`/api/clientes/${selectedCliente.id}`, newCliente);
      }
      return axios.post('/api/clientes', newCliente);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] });
      setOpen(false);
      setSnackbar({ open: true, message: 'Cliente salvo com sucesso!', severity: 'success' });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => axios.delete(`/api/clientes/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] });
      setSnackbar({ open: true, message: 'Cliente excluído com sucesso!', severity: 'success' });
    }
  });

  const handleOpen = (cliente?: Cliente) => {
    setSelectedCliente(cliente || null);
    setOpen(true);
  };

  const onSubmit = (data: Cliente) => {
    mutation.mutate(data);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Clientes</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>Novo Cliente</Button>
      </Box>

      <TableContainer component={Paper} sx={{ border: '1px solid', borderColor: 'divider' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8fafc' }}>
            <TableRow>
              <TableCell sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', letterSpacing: 0.5 }}>Nome/Razão Social</TableCell>
              <TableCell sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', letterSpacing: 0.5 }}>Tipo</TableCell>
              <TableCell sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', letterSpacing: 0.5 }}>CPF/CNPJ</TableCell>
              <TableCell sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', letterSpacing: 0.5 }}>Telefone</TableCell>
              <TableCell sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', letterSpacing: 0.5 }}>Cidade/UF</TableCell>
              <TableCell align="right" sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', letterSpacing: 0.5 }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientes?.map((cli) => (
              <TableRow key={cli.id}>
                <TableCell>{cli.tipo === 'PF' ? cli.nome : cli.razao_social}</TableCell>
                <TableCell>{cli.tipo}</TableCell>
                <TableCell>{cli.cpf_cnpj}</TableCell>
                <TableCell>{cli.telefone}</TableCell>
                <TableCell>{cli.cidade} / {cli.estado}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpen(cli)}><EditIcon /></IconButton>
                  <IconButton color="error" onClick={() => cli.id && deleteMutation.mutate(cli.id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ClienteDialog 
        open={open} 
        onClose={() => setOpen(false)} 
        onSubmit={onSubmit} 
        selectedCliente={selectedCliente} 
      />

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}
