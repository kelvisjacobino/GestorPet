import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';

import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Advogados from './pages/Advogados';
import Clientes from './pages/Clientes';
import Modelos from './pages/Modelos';
import NovaPeticao from './pages/NovaPeticao';
import Historico from './pages/Historico';
import Relatorios from './pages/Relatorios';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="advogados" element={<Advogados />} />
              <Route path="clientes" element={<Clientes />} />
              <Route path="modelos" element={<Modelos />} />
              <Route path="peticoes" element={<Historico />} />
              <Route path="peticoes/nova" element={<NovaPeticao />} />
              <Route path="historico" element={<Historico />} />
              <Route path="relatorios" element={<Relatorios />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
