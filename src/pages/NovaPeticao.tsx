import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, Paper, Grid, MenuItem, TextField, Autocomplete, 
  Stepper, Step, StepLabel, CircularProgress, Divider, Snackbar, Alert, IconButton
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Advogado, Cliente, Modelo, Peticao, TipoPeticao } from '../types';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import dayjs from 'dayjs';
import { marked } from 'marked';
import { useNavigate } from 'react-router-dom';
import AdvogadoDialog from '../components/AdvogadoDialog';
import ClienteDialog from '../components/ClienteDialog';

const TIPOS_PETICAO: TipoPeticao[] = [
  'Petição Inicial', 'Petição Intermediária', 'Contestação', 'Recursos', 'Cumprimento de Sentença'
];

const steps = ['Profissionais', 'Modelo', 'Gerar & Editar', 'Conclusão'];

export default function NovaPeticao() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [activeStep, setActiveStep] = useState(0);
  const [tipo, setTipo] = useState<TipoPeticao>('Petição Inicial');
  const [modelo, setModelo] = useState<Modelo | null>(null);
  const [advogado, setAdvogado] = useState<Advogado | null>(null);
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [textoFinal, setTextoFinal] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  // Dialog states
  const [advogadoDialogOpen, setAdvogadoDialogOpen] = useState(false);
  const [clienteDialogOpen, setClienteDialogOpen] = useState(false);

  const { data: advogados } = useQuery<Advogado[]>({ queryKey: ['advogados'], queryFn: () => axios.get('/api/advogados').then(res => res.data) });
  const { data: clientes } = useQuery<Cliente[]>({ queryKey: ['clientes'], queryFn: () => axios.get('/api/clientes').then(res => res.data) });
  const { data: modelos } = useQuery<Modelo[]>({ queryKey: ['modelos'], queryFn: () => axios.get('/api/modelos').then(res => res.data) });

  const abogadoMutation = useMutation({
    mutationFn: (newAdvogado: Advogado) => axios.post('/api/advogados', newAdvogado),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['advogados'] });
      setAdvogado(res.data);
      setAdvogadoDialogOpen(false);
      setSnackbar({ open: true, message: 'Advogado cadastrado com sucesso!', severity: 'success' });
    }
  });

  const clienteMutation = useMutation({
    mutationFn: (newCliente: Cliente) => axios.post('/api/clientes', newCliente),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] });
      setCliente(res.data);
      setClienteDialogOpen(false);
      setSnackbar({ open: true, message: 'Cliente cadastrado com sucesso!', severity: 'success' });
    }
  });

  const filteredModelos = modelos?.filter(m => {
    const matchesTipo = m.tipo === tipo;
    const isAtivo = m.ativo;
    // Se houver um advogado selecionado, filtrar modelos pelas suas áreas
    const matchesArea = advogado?.areas && advogado.areas.length > 0 
      ? advogado.areas.includes(m.area_id!)
      : true;
    return matchesTipo && isAtivo && matchesArea;
  });

  const handleNext = () => {
    if (activeStep === 1) {
      generateInitialText();
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const generateInitialText = () => {
    if (!modelo || !cliente || !advogado) return;

    let text = modelo.texto;
    const variables = {
      '{{CLIENTE}}': cliente.tipo === 'PF' ? cliente.nome : cliente.razao_social,
      '{{CPF}}': cliente.cpf_cnpj,
      '{{ADVOGADO}}': advogado.nome,
      '{{OAB}}': `${advogado.oab}/${advogado.uf_oab}`,
      '{{DATA}}': dayjs().format('DD/MM/YYYY'),
      '{{ENDERECO}}': cliente.endereco,
      '{{CIDADE}}': cliente.cidade,
      '{{ESTADO}}': cliente.estado,
      '{{TELEFONE}}': cliente.telefone,
      '{{EMAIL}}': cliente.email,
    };

    Object.entries(variables).forEach(([key, value]) => {
      text = text.replace(new RegExp(key, 'g'), value || '');
    });

    const htmlContent = marked.parse(text);
    setTextoFinal(htmlContent as string);
  };

  const saveMutation = useMutation({
    mutationFn: (peticao: any) => axios.post('/api/peticoes', peticao),
    onSuccess: (res) => {
      setSnackbar({ open: true, message: 'Petição gerada com sucesso!', severity: 'success' });
      setActiveStep(3);
    },
    onError: () => {
      setSnackbar({ open: true, message: 'Erro ao salvar petição.', severity: 'error' });
    }
  });

  const handleSave = () => {
    if (!cliente?.id || !advogado?.id || !modelo?.id) return;
    saveMutation.mutate({
      tipo,
      cliente_id: cliente.id,
      advogado_id: advogado.id,
      modelo_id: modelo.id,
      texto_final: textoFinal,
      status: 'Concluída'
    });
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>Gerar Nova Petição</Typography>
      
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}><StepLabel>{label}</StepLabel></Step>
        ))}
      </Stepper>

      <Paper sx={{ p: 4 }}>
        {activeStep === 0 && (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Autocomplete
                  options={advogados || []}
                  getOptionLabel={(option) => `${option.nome} (OAB: ${option.oab})`}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  renderInput={(params) => <TextField {...params} label="Selecionar Advogado" fullWidth />}
                  value={advogado}
                  onChange={(_, newValue) => {
                    setAdvogado(newValue);
                    setModelo(null); // Resetar modelo se o advogado mudar
                  }}
                  sx={{ flexGrow: 1 }}
                />
                <IconButton color="primary" onClick={() => setAdvogadoDialogOpen(true)} title="Novo Advogado">
                  <AddIcon />
                </IconButton>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Autocomplete
                  options={clientes || []}
                  getOptionLabel={(option) => `${option.tipo === 'PF' ? option.nome : option.razao_social} (${option.cpf_cnpj})`}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  renderInput={(params) => <TextField {...params} label="Selecionar Cliente" fullWidth />}
                  value={cliente}
                  onChange={(_, newValue) => setCliente(newValue)}
                  sx={{ flexGrow: 1 }}
                />
                <IconButton color="primary" onClick={() => setClienteDialogOpen(true)} title="Novo Cliente">
                  <AddIcon />
                </IconButton>
              </Box>
            </Grid>
            <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" onClick={handleNext} disabled={!advogado || !cliente}>Próximo</Button>
            </Grid>
          </Grid>
        )}

        {activeStep === 1 && (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField 
                select 
                label="Tipo de Petição" 
                fullWidth 
                value={tipo} 
                onChange={(e) => {
                  setTipo(e.target.value as TipoPeticao);
                  setModelo(null);
                }}
              >
                {TIPOS_PETICAO.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField 
                select 
                label="Modelo de Petição" 
                fullWidth 
                value={modelo?.id || ''} 
                onChange={(e) => setModelo(modelos?.find(m => m.id === Number(e.target.value)) || null)}
                disabled={!tipo}
              >
                {filteredModelos?.map((m) => <MenuItem key={m.id} value={m.id}>{m.nome}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={handleBack}>Voltar</Button>
              <Button variant="contained" onClick={handleNext} disabled={!modelo}>Próximo</Button>
            </Grid>
          </Grid>
        )}

        {activeStep === 2 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>Editor da Petição</Typography>
            <Box sx={{ height: 600, mb: 10 }}>
              <ReactQuill 
                theme="snow" 
                value={textoFinal} 
                onChange={setTextoFinal} 
                style={{ height: '550px' }}
              />
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={handleBack}>Voltar</Button>
              <Button variant="contained" color="success" onClick={handleSave} disabled={saveMutation.isPending}>
                {saveMutation.isPending ? <CircularProgress size={24} /> : 'Salvar e Gerar PDF'}
              </Button>
            </Box>
          </Box>
        )}

        {activeStep === 3 && (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <Typography variant="h5" color="success.main" gutterBottom>Sucesso!</Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>A petição foi salva e o PDF foi gerado corretamente.</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button variant="contained" onClick={() => navigate('/historico')}>Ver Histórico</Button>
              <Button variant="outlined" onClick={() => navigate('/')}>Voltar ao Dashboard</Button>
            </Box>
          </Box>
        )}
      </Paper>

      <AdvogadoDialog 
        open={advogadoDialogOpen} 
        onClose={() => setAdvogadoDialogOpen(false)} 
        onSubmit={(data) => abogadoMutation.mutate(data)} 
      />

      <ClienteDialog 
        open={clienteDialogOpen} 
        onClose={() => setClienteDialogOpen(false)} 
        onSubmit={(data) => clienteMutation.mutate(data)} 
      />

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}
