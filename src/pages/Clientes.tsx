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

export default function ClientesList() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const { data: clientes, isLoading } = useQuery<Cliente[]>({
    queryKey: ['clientes'],
    queryFn: () => axios.get('/api/clientes').then(res => res.data)
  });

  const { control, handleSubmit, reset, watch, setValue } = useForm<Cliente>({
    defaultValues: {
      tipo: 'PF', nome: '', cpf_cnpj: '', rg_ie: '', estado_civil: '', profissao: '', data_nascimento: '', razao_social: '', nome_fantasia: '', representante: '', telefone: '', email: '', cep: '', endereco: '', cidade: '', estado: '', observacoes: ''
    }
  });

  const tipo = watch('tipo');

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
      reset();
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
    if (cliente) {
      setSelectedCliente(cliente);
      reset(cliente);
      setTabValue(cliente.tipo === 'PF' ? 0 : 1);
    } else {
      setSelectedCliente(null);
      reset({
        tipo: 'PF', nome: '', cpf_cnpj: '', rg_ie: '', estado_civil: '', profissao: '', data_nascimento: '', razao_social: '', nome_fantasia: '', representante: '', telefone: '', email: '', cep: '', endereco: '', cidade: '', estado: '', observacoes: ''
      });
      setTabValue(0);
    }
    setOpen(true);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setValue('tipo', newValue === 0 ? 'PF' : 'PJ');
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

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{selectedCliente ? 'Editar Cliente' : 'Novo Cliente'}</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
              <Tab label="Pessoa Física" />
              <Tab label="Pessoa Jurídica" />
            </Tabs>

            <Grid container spacing={2}>
              {tipo === 'PF' ? (
                <>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Controller name="nome" control={control} render={({ field }) => <TextField {...field} label="Nome Completo" fullWidth required />} />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Controller name="cpf_cnpj" control={control} render={({ field }) => <TextField {...field} label="CPF" fullWidth required />} />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Controller name="rg_ie" control={control} render={({ field }) => <TextField {...field} label="RG" fullWidth />} />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Controller name="estado_civil" control={control} render={({ field }) => <TextField {...field} label="Estado Civil" fullWidth />} />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Controller name="profissao" control={control} render={({ field }) => <TextField {...field} label="Profissão" fullWidth />} />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Controller name="data_nascimento" control={control} render={({ field }) => <TextField {...field} label="Data Nascimento" type="date" slotProps={{ inputLabel: { shrink: true } }} fullWidth />} />
                  </Grid>
                </>
              ) : (
                <>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Controller name="razao_social" control={control} render={({ field }) => <TextField {...field} label="Razão Social" fullWidth required />} />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Controller name="nome_fantasia" control={control} render={({ field }) => <TextField {...field} label="Nome Fantasia" fullWidth />} />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Controller name="cpf_cnpj" control={control} render={({ field }) => <TextField {...field} label="CNPJ" fullWidth required />} />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Controller name="rg_ie" control={control} render={({ field }) => <TextField {...field} label="Inscrição Estadual" fullWidth />} />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Controller name="representante" control={control} render={({ field }) => <TextField {...field} label="Representante Legal" fullWidth />} />
                  </Grid>
                </>
              )}

              <Grid size={{ xs: 12, md: 4 }}>
                <Controller name="telefone" control={control} render={({ field }) => <TextField {...field} label="Telefone" fullWidth />} />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <Controller name="email" control={control} render={({ field }) => <TextField {...field} label="Email" fullWidth />} />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <Controller name="cep" control={control} render={({ field }) => <TextField {...field} label="CEP" fullWidth />} />
              </Grid>
              <Grid size={{ xs: 12, md: 9 }}>
                <Controller name="endereco" control={control} render={({ field }) => <TextField {...field} label="Endereço" fullWidth />} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller name="cidade" control={control} render={({ field }) => <TextField {...field} label="Cidade" fullWidth />} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller name="estado" control={control} render={({ field }) => <TextField {...field} label="Estado" fullWidth />} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Controller name="observacoes" control={control} render={({ field }) => <TextField {...field} label="Observações" multiline rows={2} fullWidth />} />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancelar</Button>
            <Button type="submit" variant="contained">Salvar</Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}
