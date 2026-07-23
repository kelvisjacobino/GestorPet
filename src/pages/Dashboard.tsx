import React from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Chip,
  CircularProgress
} from '@mui/material';
import { 
  Description as DescriptionIcon, 
  FilePresent as FilePresentIcon
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DashboardData } from '../types';
import dayjs from 'dayjs';

export default function Dashboard() {
  const { data, isLoading } = useQuery<DashboardData>({
    queryKey: ['dashboard'],
    queryFn: () => axios.get('/api/dashboard').then(res => res.data)
  });

  if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;

  const stats = [
    { label: 'Total de Petições', value: data?.totalPeticoes, trend: '+12% este mês' },
    { label: 'Geradas este mês', value: data?.peticoesMes, trend: '+5% vs mês ant.' },
    { label: 'Clientes Ativos', value: data?.totalClientes, trend: 'PF e PJ' },
    { label: 'Modelos Cadastrados', value: data?.totalAdvogados, trend: 'Categorizados' },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ mb: 0.5 }}>Bem-vindo ao Sistema</Typography>
          <Typography variant="body2" color="text.secondary">Visão geral da sua produtividade jurídica hoje.</Typography>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mb: 5 }}>
        {stats.map((stat, idx) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
            <Card sx={{ height: '100%', border: '1px solid', borderColor: 'divider' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="caption" sx={{ display: 'block', mb: 0.5, fontWeight: 600, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  {stat.label}
                </Typography>
                <Typography variant="h4" sx={{ mb: 0.5 }}>
                  {stat.value || 0}
                </Typography>
                <Typography variant="caption" sx={{ color: stat.label.includes('Geradas') ? 'success.main' : 'text.secondary', fontWeight: 600 }}>
                  {stat.trend}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card sx={{ border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
        <Box sx={{ px: 3, py: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontSize: 16 }}>Últimas Petições Criadas</Typography>
          <Button component={Link} to="/historico" size="small" sx={{ fontWeight: 600, color: 'primary.main' }}>Ver Histórico Completo</Button>
        </Box>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: '#f8fafc' }}>
              <TableRow>
                <TableCell sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', letterSpacing: 0.5 }}>Nº</TableCell>
                <TableCell sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', letterSpacing: 0.5 }}>Data</TableCell>
                <TableCell sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', letterSpacing: 0.5 }}>Cliente</TableCell>
                <TableCell sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', letterSpacing: 0.5 }}>Advogado</TableCell>
                <TableCell sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', letterSpacing: 0.5 }}>Tipo</TableCell>
                <TableCell sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', letterSpacing: 0.5 }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.ultimasPeticoes.map((p) => (
                <TableRow key={p.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>#{p.numero}</TableCell>
                  <TableCell>{dayjs(p.data).format('DD/MM/YYYY')}</TableCell>
                  <TableCell>{p.cliente_nome}</TableCell>
                  <TableCell>{p.advogado_nome}</TableCell>
                  <TableCell>{p.tipo}</TableCell>
                  <TableCell>
                    <Box 
                      sx={{ 
                        display: 'inline-block',
                        px: 1.25, 
                        py: 0.5, 
                        borderRadius: 10, 
                        fontSize: 11, 
                        fontWeight: 700,
                        bgcolor: p.status === 'Gerada' ? '#dcfce7' : '#fef9c3',
                        color: p.status === 'Gerada' ? '#166534' : '#854d0e',
                        textTransform: 'uppercase'
                      }}
                    >
                      {p.status === 'Gerada' ? 'Concluído' : 'Pendente'}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              {data?.ultimasPeticoes.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4, color: 'text.secondary' }}>Nenhuma petição encontrada.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Box sx={{ mt: 3, p: 2, bgcolor: 'action.hover', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Entendendo os Status:</Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Pendente:</strong> A petição foi iniciada ou salva temporariamente, mas ainda não foi finalizada ou revisada.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Concluído:</strong> A petição foi totalmente gerada, revisada e está pronta para protocolo ou download.
        </Typography>
      </Box>

    </Box>
  );
}
