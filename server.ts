import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import dayjs from 'dayjs';
import he from 'he';
import { initialLibrary } from './src/data/library';

const __dirname = path.resolve();

let db: any;

async function initDb() {
  db = await open({
    filename: 'petitions.db',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS areas_direito (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      descricao TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS advogados (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      oab TEXT NOT NULL,
      uf_oab TEXT NOT NULL,
      cpf TEXT,
      telefone TEXT,
      email TEXT,
      endereco TEXT,
      cidade TEXT,
      estado TEXT,
      observacoes TEXT,
      ativo BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tipo TEXT NOT NULL,
      nome TEXT NOT NULL,
      cpf_cnpj TEXT NOT NULL,
      rg_ie TEXT,
      estado_civil TEXT,
      profissao TEXT,
      data_nascimento TEXT,
      razao_social TEXT,
      nome_fantasia TEXT,
      representante TEXT,
      telefone TEXT,
      email TEXT,
      cep TEXT,
      endereco TEXT,
      cidade TEXT,
      estado TEXT,
      observacoes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS modelos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      tipo TEXT NOT NULL,
      area_id INTEGER,
      descricao TEXT,
      texto TEXT NOT NULL,
      ativo BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (area_id) REFERENCES areas_direito(id)
    );

    CREATE TABLE IF NOT EXISTS advogado_areas (
      advogado_id INTEGER NOT NULL,
      area_id INTEGER NOT NULL,
      PRIMARY KEY (advogado_id, area_id),
      FOREIGN KEY (advogado_id) REFERENCES advogados(id) ON DELETE CASCADE,
      FOREIGN KEY (area_id) REFERENCES areas_direito(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS peticoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      numero TEXT,
      tipo TEXT NOT NULL,
      cliente_id INTEGER NOT NULL,
      advogado_id INTEGER NOT NULL,
      modelo_id INTEGER NOT NULL,
      data DATETIME DEFAULT CURRENT_TIMESTAMP,
      texto_final TEXT NOT NULL,
      pdf_path TEXT,
      status TEXT DEFAULT 'Gerada',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (cliente_id) REFERENCES clientes(id),
      FOREIGN KEY (advogado_id) REFERENCES advogados(id),
      FOREIGN KEY (modelo_id) REFERENCES modelos(id)
    );
  `);

  // Migração: Adicionar coluna area_id se não existir (para DBs legados)
  const columns = await db.all("PRAGMA table_info(modelos)");
  const hasAreaId = columns.some((c: any) => c.name === 'area_id');
  if (!hasAreaId) {
    try {
      await db.run('ALTER TABLE modelos ADD COLUMN area_id INTEGER REFERENCES areas_direito(id)');
    } catch (e) {
      console.error('Error adding area_id column to modelos:', e);
    }
  }

  // Seed areas if empty
  const areasCount = (await db.get('SELECT COUNT(*) as count FROM areas_direito')).count;
  if (areasCount === 0) {
    const areas = [
      'Direito Civil', 'Direito de Família', 'Direito Sucessório', 'Direito do Consumidor',
      'Direito Trabalhista', 'Direito Previdenciário', 'Direito Tributário', 'Direito Empresarial',
      'Direito Penal', 'Processo Penal', 'Direito Administrativo', 'Direito Constitucional',
      'Direito Ambiental', 'Direito Imobiliário', 'Direito Bancário', 'Direito Médico',
      'Direito Digital', 'Direito Eleitoral', 'Direito Militar', 'Direito Internacional'
    ];
    for (const area of areas) {
      await db.run('INSERT INTO areas_direito (nome) VALUES (?)', [area]);
    }
  }

  // Seed models if missing
  for (const item of initialLibrary) {
    const existing = await db.get('SELECT id FROM modelos WHERE nome = ?', [item.metadata.titulo]);
    if (!existing) {
      const area = await db.get('SELECT id FROM areas_direito WHERE nome = ?', [item.metadata.area]);
      if (area) {
        await db.run(`
          INSERT INTO modelos (nome, tipo, area_id, descricao, texto, ativo)
          VALUES (?, ?, ?, ?, ?, ?)
        `, [
          item.metadata.titulo,
          item.metadata.tipo,
          area.id,
          `${item.metadata.categoria} - ${item.metadata.subcategoria}`,
          item.markdown,
          1
        ]);
      }
    }
  }
}

const app = express();
app.use(express.json());

// Ensure documents directory exists
const docsDir = path.join(__dirname, 'documentos');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir);
}

// API Routes
app.get('/api/areas', async (req, res) => {
  const rows = await db.all('SELECT * FROM areas_direito ORDER BY nome');
  res.json(rows);
});

app.get('/api/advogados', async (req, res) => {
  const rows = await db.all('SELECT * FROM advogados ORDER BY nome');
  for (const row of rows) {
    const areas = await db.all('SELECT area_id FROM advogado_areas WHERE advogado_id = ?', [row.id]);
    row.areas = areas.map((a: any) => a.area_id);
    const areasNomes = await db.all('SELECT nome FROM areas_direito WHERE id IN (SELECT area_id FROM advogado_areas WHERE advogado_id = ?)', [row.id]);
    row.areas_nomes = areasNomes.map((a: any) => a.nome);
  }
  res.json(rows);
});

app.post('/api/advogados', async (req, res) => {
  const { nome, oab, uf_oab, cpf, telefone, email, endereco, cidade, estado, observacoes, ativo, areas } = req.body;
  const result = await db.run(`
    INSERT INTO advogados (nome, oab, uf_oab, cpf, telefone, email, endereco, cidade, estado, observacoes, ativo)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [nome, oab, uf_oab, cpf, telefone, email, endereco, cidade, estado, observacoes, ativo ? 1 : 0]);
  
  const advogadoId = result.lastID;
  if (areas && Array.isArray(areas)) {
    for (const areaId of areas) {
      await db.run('INSERT INTO advogado_areas (advogado_id, area_id) VALUES (?, ?)', [advogadoId, areaId]);
    }
  }

  const newRow = await db.get('SELECT * FROM advogados WHERE id = ?', [advogadoId]);
  res.json(newRow);
});

app.put('/api/advogados/:id', async (req, res) => {
  const { nome, oab, uf_oab, cpf, telefone, email, endereco, cidade, estado, observacoes, ativo, areas } = req.body;
  await db.run(`
    UPDATE advogados SET nome=?, oab=?, uf_oab=?, cpf=?, telefone=?, email=?, endereco=?, cidade=?, estado=?, observacoes=?, ativo=?, updated_at=CURRENT_TIMESTAMP
    WHERE id=?
  `, [nome, oab, uf_oab, cpf, telefone, email, endereco, cidade, estado, observacoes, ativo ? 1 : 0, req.params.id]);
  
  await db.run('DELETE FROM advogado_areas WHERE advogado_id = ?', [req.params.id]);
  if (areas && Array.isArray(areas)) {
    for (const areaId of areas) {
      await db.run('INSERT INTO advogado_areas (advogado_id, area_id) VALUES (?, ?)', [req.params.id, areaId]);
    }
  }
  res.json({ success: true });
});

app.delete('/api/advogados/:id', async (req, res) => {
  await db.run('DELETE FROM advogados WHERE id=?', [req.params.id]);
  res.json({ success: true });
});

app.get('/api/clientes', async (req, res) => {
  const rows = await db.all('SELECT * FROM clientes ORDER BY nome');
  res.json(rows);
});

app.post('/api/clientes', async (req, res) => {
  const { tipo, nome, cpf_cnpj, rg_ie, estado_civil, profissao, data_nascimento, razao_social, nome_fantasia, representante, telefone, email, cep, endereco, cidade, estado, observacoes } = req.body;
  const result = await db.run(`
    INSERT INTO clientes (tipo, nome, cpf_cnpj, rg_ie, estado_civil, profissao, data_nascimento, razao_social, nome_fantasia, representante, telefone, email, cep, endereco, cidade, estado, observacoes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [tipo, nome, cpf_cnpj, rg_ie, estado_civil, profissao, data_nascimento, razao_social, nome_fantasia, representante, telefone, email, cep, endereco, cidade, estado, observacoes]);
  const newRow = await db.get('SELECT * FROM clientes WHERE id = ?', [result.lastID]);
  res.json(newRow);
});

app.put('/api/clientes/:id', async (req, res) => {
  const { tipo, nome, cpf_cnpj, rg_ie, estado_civil, profissao, data_nascimento, razao_social, nome_fantasia, representante, telefone, email, cep, endereco, cidade, estado, observacoes } = req.body;
  await db.run(`
    UPDATE clientes SET tipo=?, nome=?, cpf_cnpj=?, rg_ie=?, estado_civil=?, profissao=?, data_nascimento=?, razao_social=?, nome_fantasia=?, representante=?, telefone=?, email=?, cep=?, endereco=?, cidade=?, estado=?, observacoes=?, updated_at=CURRENT_TIMESTAMP
    WHERE id=?
  `, [tipo, nome, cpf_cnpj, rg_ie, estado_civil, profissao, data_nascimento, razao_social, nome_fantasia, representante, telefone, email, cep, endereco, cidade, estado, observacoes, req.params.id]);
  res.json({ success: true });
});

app.delete('/api/clientes/:id', async (req, res) => {
  await db.run('DELETE FROM clientes WHERE id=?', [req.params.id]);
  res.json({ success: true });
});

app.get('/api/modelos', async (req, res) => {
  const rows = await db.all(`
    SELECT m.*, a.nome as area_nome 
    FROM modelos m
    LEFT JOIN areas_direito a ON m.area_id = a.id
    ORDER BY m.nome
  `);
  res.json(rows);
});

app.post('/api/modelos', async (req, res) => {
  const { nome, tipo, area_id, descricao, texto, ativo } = req.body;
  const result = await db.run(`
    INSERT INTO modelos (nome, tipo, area_id, descricao, texto, ativo)
    VALUES (?, ?, ?, ?, ?, ?)
  `, [nome, tipo, area_id, descricao, texto, ativo ? 1 : 0]);
  const newRow = await db.get('SELECT * FROM modelos WHERE id = ?', [result.lastID]);
  res.json(newRow);
});

app.put('/api/modelos/:id', async (req, res) => {
  const { nome, tipo, area_id, descricao, texto, ativo } = req.body;
  await db.run(`
    UPDATE modelos SET nome=?, tipo=?, area_id=?, descricao=?, texto=?, ativo=?, updated_at=CURRENT_TIMESTAMP
    WHERE id=?
  `, [nome, tipo, area_id, descricao, texto, ativo ? 1 : 0, req.params.id]);
  res.json({ success: true });
});

app.delete('/api/modelos/:id', async (req, res) => {
  await db.run('DELETE FROM modelos WHERE id=?', [req.params.id]);
  res.json({ success: true });
});

app.get('/api/peticoes', async (req, res) => {
  const rows = await db.all(`
    SELECT p.*, c.nome as cliente_nome, a.nome as advogado_nome 
    FROM peticoes p
    JOIN clientes c ON p.cliente_id = c.id
    JOIN advogados a ON p.advogado_id = a.id
    ORDER BY p.data DESC
  `);
  res.json(rows);
});

app.post('/api/peticoes', async (req, res) => {
  const { tipo, cliente_id, advogado_id, modelo_id, texto_final, status } = req.body;
  
  const now = dayjs();
  const year = now.format('YYYY');
  const monthMap: Record<string, string> = {
    '01': 'Janeiro', '02': 'Fevereiro', '03': 'Marco', '04': 'Abril',
    '05': 'Maio', '06': 'Junho', '07': 'Julho', '08': 'Agosto',
    '09': 'Setembro', '10': 'Outubro', '11': 'Novembro', '12': 'Dezembro'
  };
  const monthName = monthMap[now.format('MM')];
  
  const yearDir = path.join(docsDir, year);
  if (!fs.existsSync(yearDir)) fs.mkdirSync(yearDir);
  const monthDir = path.join(yearDir, monthName);
  if (!fs.existsSync(monthDir)) fs.mkdirSync(monthDir);

  const result = await db.run(`
    INSERT INTO peticoes (tipo, cliente_id, advogado_id, modelo_id, texto_final, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `, [tipo, cliente_id, advogado_id, modelo_id, texto_final, status || 'Gerada']);
  
  const peticaoId = result.lastID;
  const numero = peticaoId.toString().padStart(5, '0');
  await db.run('UPDATE peticoes SET numero = ? WHERE id = ?', [numero, peticaoId]);

  const pdfFileName = `Peticao_${numero}.pdf`;
  const pdfPath = path.join(monthDir, pdfFileName);
  const relativePdfPath = `/documentos/${year}/${monthName}/${pdfFileName}`;

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(pdfPath));
  
  // Clean HTML to text
  let cleanText = texto_final
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<li>/gi, '• ')
    .replace(/<[^>]*>?/gm, '');
  
  // Decode HTML entities (like &nbsp;)
  // Using he.decode and also explicit replacement for common ones
  try {
    cleanText = he.decode(cleanText);
  } catch (e) {
    console.error('Error decoding HTML entities:', e);
  }
  
  // Final cleanup of non-breaking spaces and other common artifacts
  cleanText = cleanText
    .replace(/\u00A0/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'");

  doc.fontSize(12).text(cleanText, { align: 'justify', lineGap: 2 });
  doc.end();

  await db.run('UPDATE peticoes SET pdf_path = ? WHERE id = ?', [relativePdfPath, peticaoId]);
  res.json({ id: peticaoId, numero, pdf_path: relativePdfPath });
});

app.delete('/api/peticoes/:id', async (req, res) => {
  const peticao = await db.get('SELECT pdf_path FROM peticoes WHERE id=?', [req.params.id]);
  if (peticao?.pdf_path) {
    const fullPath = path.join(__dirname, peticao.pdf_path);
    if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
  }
  await db.run('DELETE FROM peticoes WHERE id=?', [req.params.id]);
  res.json({ success: true });
});

app.post('/api/peticoes/:id/regenerar-pdf', async (req, res) => {
  const peticao = await db.get('SELECT * FROM peticoes WHERE id=?', [req.params.id]);
  if (!peticao) return res.status(404).json({ error: 'Petição não encontrada' });

  const now = dayjs(peticao.data);
  const year = now.format('YYYY');
  const monthMap: Record<string, string> = {
    '01': 'Janeiro', '02': 'Fevereiro', '03': 'Marco', '04': 'Abril',
    '05': 'Maio', '06': 'Junho', '07': 'Julho', '08': 'Agosto',
    '09': 'Setembro', '10': 'Outubro', '11': 'Novembro', '12': 'Dezembro'
  };
  const monthName = monthMap[now.format('MM')];
  
  const yearDir = path.join(docsDir, year);
  if (!fs.existsSync(yearDir)) fs.mkdirSync(yearDir);
  const monthDir = path.join(yearDir, monthName);
  if (!fs.existsSync(monthDir)) fs.mkdirSync(monthDir);

  const pdfFileName = `Peticao_${peticao.numero}.pdf`;
  const pdfPath = path.join(monthDir, pdfFileName);
  const relativePdfPath = `/documentos/${year}/${monthName}/${pdfFileName}`;

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(pdfPath));
  
  let cleanText = peticao.texto_final
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<li>/gi, '• ')
    .replace(/<[^>]*>?/gm, '');
  
  try {
    cleanText = he.decode(cleanText);
  } catch (e) {
    console.error('Error decoding HTML entities:', e);
  }
  
  cleanText = cleanText
    .replace(/\u00A0/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'");

  doc.fontSize(12).text(cleanText, { align: 'justify', lineGap: 2 });
  doc.end();

  await db.run('UPDATE peticoes SET pdf_path = ? WHERE id = ?', [relativePdfPath, peticao.id]);
  res.json({ success: true, pdf_path: relativePdfPath });
});

app.get('/api/peticoes/relatorio', async (req, res) => {
  const { data_inicio, data_fim, cliente_id, advogado_id, tipo } = req.query;
  let query = `
    SELECT p.*, c.nome as cliente_nome, a.nome as advogado_nome 
    FROM peticoes p
    JOIN clientes c ON p.cliente_id = c.id
    JOIN advogados a ON p.advogado_id = a.id
    WHERE 1=1
  `;
  const params: any[] = [];

  if (data_inicio) {
    query += ' AND p.data >= ?';
    params.push(data_inicio);
  }
  if (data_fim) {
    query += ' AND p.data <= ?';
    params.push(data_fim);
  }
  if (cliente_id) {
    query += ' AND p.cliente_id = ?';
    params.push(cliente_id);
  }
  if (advogado_id) {
    query += ' AND p.advogado_id = ?';
    params.push(advogado_id);
  }
  if (tipo) {
    query += ' AND p.tipo = ?';
    params.push(tipo);
  }

  query += ' ORDER BY p.data DESC';
  const rows = await db.all(query, params);
  res.json(rows);
});

app.get('/api/dashboard', async (req, res) => {
  const totalPeticoes = (await db.get('SELECT COUNT(*) as count FROM peticoes')).count;
  const peticoesMes = (await db.get("SELECT COUNT(*) as count FROM peticoes WHERE strftime('%Y-%m', data) = strftime('%Y-%m', 'now')")).count;
  const totalClientes = (await db.get('SELECT COUNT(*) as count FROM clientes')).count;
  const totalAdvogados = (await db.get('SELECT COUNT(*) as count FROM advogados')).count;
  const ultimasPeticoes = await db.all(`
    SELECT p.*, c.nome as cliente_nome, a.nome as advogado_nome 
    FROM peticoes p
    JOIN clientes c ON p.cliente_id = c.id
    JOIN advogados a ON p.advogado_id = a.id
    ORDER BY p.data DESC LIMIT 5
  `);

  res.json({
    totalPeticoes,
    peticoesMes,
    totalClientes,
    totalAdvogados,
    ultimasPeticoes
  });
});

// Serve documents
app.use('/documentos', express.static(path.join(__dirname, 'documentos')));

async function startServer() {
  await initDb();
  const PORT = 3000;

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
