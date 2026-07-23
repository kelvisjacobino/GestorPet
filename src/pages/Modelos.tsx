import React, { useState } from 'react';
import { 
  Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, MenuItem,
  Snackbar, Alert, Switch, FormControlLabel
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Modelo } from '../types';
import { useForm, Controller } from 'react-hook-form';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const TIPOS_PETICAO = [
  'Petição Inicial', 'Petição Intermediária', 'Contestação', 'Recursos', 'Cumprimento de Sentença'
];

export default function ModelosList() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [selectedModelo, setSelectedModelo] = useState<Modelo | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const { data: modelos, isLoading } = useQuery<Modelo[]>({
    queryKey: ['modelos'],
    queryFn: () => axios.get('/api/modelos').then(res => res.data)
  });

  const { control, handleSubmit, reset } = useForm<Modelo>({
    defaultValues: {
      nome: '', tipo: 'Petição Inicial', descricao: '', texto: '', ativo: true
    }
  });

  const mutation = useMutation({
    mutationFn: (newModelo: Modelo) => {
      if (selectedModelo?.id) {
        return axios.put(`/api/modelos/${selectedModelo.id}`, newModelo);
      }
      return axios.post('/api/modelos', newModelo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['modelos'] });
      setOpen(false);
      reset();
      setSnackbar({ open: true, message: 'Modelo salvo com sucesso!', severity: 'success' });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => axios.delete(`/api/modelos/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['modelos'] });
      setSnackbar({ open: true, message: 'Modelo excluído com sucesso!', severity: 'success' });
    }
  });

  const handleOpen = (modelo?: Modelo) => {
    if (modelo) {
      setSelectedModelo(modelo);
      reset(modelo);
    } else {
      setSelectedModelo(null);
      reset({
        nome: '', tipo: 'Petição Inicial', descricao: '', texto: '', ativo: true
      });
    }
    setOpen(true);
  };

  const onSubmit = (data: Modelo) => {
    mutation.mutate(data);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Modelos de Petições</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>Novo Modelo</Button>
      </Box>

      <TableContainer component={Paper} sx={{ border: '1px solid', borderColor: 'divider' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8fafc' }}>
            <TableRow>
              <TableCell sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', letterSpacing: 0.5 }}>Nome</TableCell>
              <TableCell sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', letterSpacing: 0.5 }}>Tipo</TableCell>
              <TableCell sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', letterSpacing: 0.5 }}>Descrição</TableCell>
              <TableCell sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', letterSpacing: 0.5 }}>Status</TableCell>
              <TableCell align="right" sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', letterSpacing: 0.5 }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {modelos?.map((mod) => (
              <TableRow key={mod.id}>
                <TableCell>{mod.nome}</TableCell>
                <TableCell>{mod.tipo}</TableCell>
                <TableCell>{mod.descricao}</TableCell>
                <TableCell>{mod.ativo ? 'Ativo' : 'Inativo'}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpen(mod)}><EditIcon /></IconButton>
                  <IconButton color="error" onClick={() => mod.id && deleteMutation.mutate(mod.id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" fullWidth>
        <DialogTitle>{selectedModelo ? 'Editar Modelo' : 'Novo Modelo'}</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller name="nome" control={control} render={({ field }) => <TextField {...field} label="Nome do Modelo" fullWidth required />} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller 
                  name="tipo" 
                  control={control} 
                  render={({ field }) => (
                    <TextField {...field} select label="Tipo de Petição" fullWidth required>
                      {TIPOS_PETICAO.map((option) => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                      ))}
                    </TextField>
                  )} 
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Controller name="descricao" control={control} render={({ field }) => <TextField {...field} label="Descrição Curta" fullWidth />} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" gutterBottom sx={{ mb: 1 }}>Texto do Modelo (Use variáveis como {"{{CLIENTE}}"}{", "} {"{{ADVOGADO}}"}{", etc."})</Typography>
                <Controller 
                  name="texto" 
                  control={control} 
                  render={({ field }) => (
                    <Box sx={{ height: 400, mb: 6 }}>
                      <ReactQuill 
                        theme="snow" 
                        value={field.value} 
                        onChange={field.onChange} 
                        style={{ height: '350px' }}
                      />
                    </Box>
                  )} 
                />
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
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setOpen(false)}>Cancelar</Button>
            <Button type="submit" variant="contained">Salvar Modelo</Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}
