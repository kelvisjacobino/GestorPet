import React from 'react';
import { 
  Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, Switch, FormControlLabel
} from '@mui/material';
import { Advogado, AreaDireito } from '../types';
import { useForm, Controller } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Autocomplete, Chip } from '@mui/material';

interface AdvogadoDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Advogado) => void;
  selectedAdvogado?: Advogado | null;
}

export default function AdvogadoDialog({ open, onClose, onSubmit, selectedAdvogado }: AdvogadoDialogProps) {
  const { data: areas } = useQuery<AreaDireito[]>({ 
    queryKey: ['areas'], 
    queryFn: () => axios.get('/api/areas').then(res => res.data) 
  });

  const { control, handleSubmit, reset } = useForm<Advogado>({
    values: selectedAdvogado || {
      nome: '', oab: '', uf_oab: '', cpf: '', telefone: '', email: '', endereco: '', cidade: '', estado: '', observacoes: '', ativo: true, areas: []
    }
  });

  const internalOnSubmit = (data: Advogado) => {
    onSubmit(data);
    reset();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{selectedAdvogado ? 'Editar Advogado' : 'Novo Advogado'}</DialogTitle>
      <form onSubmit={handleSubmit(internalOnSubmit)}>
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
              <Controller
                name="areas"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    multiple
                    options={areas || []}
                    getOptionLabel={(option) => option.nome}
                    value={(areas || []).filter(a => field.value?.includes(a.id!))}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    onChange={(_, newValue) => field.onChange(newValue.map(v => v.id))}
                    renderInput={(params) => (
                      <TextField {...params} label="Áreas de Atuação" placeholder="Selecione as áreas" fullWidth />
                    )}
                  />
                )}
              />
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
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">Salvar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
