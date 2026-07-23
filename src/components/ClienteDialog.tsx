import React, { useState, useEffect } from 'react';
import { 
  Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, Tab, Tabs
} from '@mui/material';
import { Cliente } from '../types';
import { useForm, Controller } from 'react-hook-form';

interface ClienteDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Cliente) => void;
  selectedCliente?: Cliente | null;
}

export default function ClienteDialog({ open, onClose, onSubmit, selectedCliente }: ClienteDialogProps) {
  const [tabValue, setTabValue] = useState(0);

  const { control, handleSubmit, reset, watch, setValue } = useForm<Cliente>({
    values: selectedCliente || {
      tipo: 'PF', nome: '', cpf_cnpj: '', rg_ie: '', estado_civil: '', profissao: '', data_nascimento: '', razao_social: '', nome_fantasia: '', representante: '', telefone: '', email: '', cep: '', endereco: '', cidade: '', estado: '', observacoes: ''
    }
  });

  const tipo = watch('tipo');

  useEffect(() => {
    if (selectedCliente) {
      setTabValue(selectedCliente.tipo === 'PF' ? 0 : 1);
    } else {
      setTabValue(0);
    }
  }, [selectedCliente, open]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setValue('tipo', newValue === 0 ? 'PF' : 'PJ');
  };

  const internalOnSubmit = (data: Cliente) => {
    onSubmit(data);
    reset();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{selectedCliente ? 'Editar Cliente' : 'Novo Cliente'}</DialogTitle>
      <form onSubmit={handleSubmit(internalOnSubmit)}>
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
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">Salvar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
