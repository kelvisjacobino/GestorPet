import React, { useState } from 'react';
import { 
  Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, Switch, FormControlLabel,
  Snackbar, Alert
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Advogado } from '../types';
import { useForm, Controller } from 'react-hook-form';

export default function AdvogadosList() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [selectedAdvogado, setSelectedAdvogado] = useState<Advogado | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const { data: advogados, isLoading } = useQuery<Advogado[]>({
    queryKey: ['advogados'],
    queryFn: () => axios.get('/api/advogados').then(res => res.data)
  });

  const { control, handleSubmit, reset } = useForm<Advogado>({
    defaultValues: {
      nome: '', oab: '', uf_oab: '', cpf: '', telefone: '', email: '', endereco: '', cidade: '', estado: '', observacoes: '', ativo: true
    }
  });

  const mutation = useMutation({
    mutationFn: (newAdvogado: Advogado) => {
      if (selectedAdvogado?.id) {
        return axios.put(`/api/advogados/${selectedAdvogado.id}`, newAdvogado);
      }
      return axios.post('/api/advogados', newAdvogado);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['advogados'] });
      setOpen(false);
      reset();
      setSelectedAdvogado(null);
      setSnackbar({ open: true, message: 'Advogado salvo com sucesso!', severity: 'success' });
    },
    onError: () => {
      setSnackbar({ open: true, message: 'Erro ao salvar advogado.', severity: 'error' });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => axios.delete(`/api/advogados/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['advogados'] });
      setSnackbar({ open: true, message: 'Advogado excluído com sucesso!', severity: 'success' });
    }
  });

  const handleOpen = (advogado?: Advogado) => {
    if (advogado) {
      setSelectedAdvogado(advogado);
      reset(advogado);
    } else {
      setSelectedAdvogado(null);
      reset({
        nome: '', oab: '', uf_oab: '', cpf: '', telefone: '', email: '', endereco: '', cidade: '', estado: '', observacoes: '', ativo: true
      });
    }
    setOpen(true);
  };

  const onSubmit = (data: Advogado) => {
    mutation.mutate(data);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Advogados</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>Novo Advogado</Button>
      </Box>

      <TableContainer component={Paper} sx={{ border: '1px solid', borderColor: 'divider' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8fafc' }}>
            <TableRow>
              <TableCell sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', letterSpacing: 0.5 }}>Nome</TableCell>
              <TableCell sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', letterSpacing: 0.5 }}>OAB</TableCell>
              <TableCell sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', letterSpacing: 0.5 }}>UF</TableCell>
              <TableCell sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', letterSpacing: 0.5 }}>Telefone</TableCell>
              <TableCell sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', letterSpacing: 0.5 }}>Email</TableCell>
              <TableCell sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', letterSpacing: 0.5 }}>Status</TableCell>
              <TableCell align="right" sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', letterSpacing: 0.5 }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {advogados?.map((adv) => (
              <TableRow key={adv.id}>
                <TableCell>{adv.nome}</TableCell>
                <TableCell>{adv.oab}</TableCell>
                <TableCell>{adv.uf_oab}</TableCell>
                <TableCell>{adv.telefone}</TableCell>
                <TableCell>{adv.email}</TableCell>
                <TableCell>{adv.ativo ? 'Ativo' : 'Inativo'}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpen(adv)}><EditIcon /></IconButton>
                  <IconButton color="error" onClick={() => adv.id && deleteMutation.mutate(adv.id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{selectedAdvogado ? 'Editar Advogado' : 'Novo Advogado'}</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller name="nome" control={control} render={({ field }) => <TextField {...field} label="Nome" fullWidth required />} />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <Controller name="oab" control={control} render={({ field }) => <TextField {...field} label="OAB" fullWidth required />} />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <Controller name="uf_oab" control={control} render={({ field }) => <TextField {...field} label="UF OAB" fullWidth required />} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller name="cpf" control={control} render={({ field }) => <TextField {...field} label="CPF" fullWidth />} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller name="telefone" control={control} render={({ field }) => <TextField {...field} label="Telefone" fullWidth />} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller name="email" control={control} render={({ field }) => <TextField {...field} label="Email" fullWidth />} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
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
              <Grid size={{ xs: 12 }}>
                <Controller 
                  name="ativo" 
                  control={control} 
                  render={({ field }) => (
                    <FormControlLabel control={<Switch checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />} label="Ativo" />
                  )} 
                />
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
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}
