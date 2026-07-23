export type TipoPeticao = 'Petição Inicial' | 'Petição Intermediária' | 'Contestação' | 'Recursos' | 'Cumprimento de Sentença';

export interface DashboardData {
  totalPeticoes: number;
  peticoesMes: number;
  totalClientes: number;
  totalAdvogados: number;
  ultimasPeticoes: (Peticao & { cliente_nome: string; advogado_nome: string })[];
}

export interface AreaDireito {
  id?: number;
  nome: string;
  descricao?: string;
  created_at?: string;
}

export interface Advogado {
  id?: number;
  nome: string;
  oab: string;
  uf_oab: string;
  cpf: string;
  telefone: string;
  email: string;
  endereco: string;
  cidade: string;
  estado: string;
  observacoes: string;
  ativo: boolean;
  areas?: number[]; // IDs das áreas
  areas_nomes?: string[]; // Nomes das áreas (para visualização)
  created_at?: string;
  updated_at?: string;
}

export interface Cliente {
  id?: number;
  tipo: 'PF' | 'PJ';
  nome: string;
  cpf_cnpj: string;
  rg_ie: string;
  estado_civil?: string;
  profissao?: string;
  data_nascimento?: string;
  razao_social?: string;
  nome_fantasia?: string;
  representante?: string;
  telefone: string;
  email: string;
  cep: string;
  endereco: string;
  cidade: string;
  estado: string;
  observacoes: string;
  created_at?: string;
  updated_at?: string;
}

export interface Modelo {
  id?: number;
  nome: string;
  tipo: TipoPeticao;
  area_id?: number;
  area_nome?: string;
  descricao: string;
  texto: string;
  ativo: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Peticao {
  id?: number;
  numero?: string;
  tipo: TipoPeticao;
  cliente_id: number;
  advogado_id: number;
  modelo_id: number;
  data?: string;
  texto_final: string;
  pdf_path?: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}
