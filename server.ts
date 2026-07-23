import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import dayjs from 'dayjs';

const __dirname = path.resolve();

let db: any;

async function initDb() {
  db = await open({
    filename: 'petitions.db',
    driver: sqlite3.Database
  });

  await db.exec(`
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
      descricao TEXT,
      texto TEXT NOT NULL,
      ativo BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
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
}

const app = express();
app.use(express.json());

// Ensure documents directory exists
const docsDir = path.join(__dirname, 'documentos');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir);
}

// API Routes
app.get('/api/advogados', async (req, res) => {
  const rows = await db.all('SELECT * FROM advogados ORDER BY nome');
  res.json(rows);
});

app.post('/api/advogados', async (req, res) => {
  const { nome, oab, uf_oab, cpf, telefone, email, endereco, cidade, estado, observacoes, ativo } = req.body;
  const result = await db.run(`
    INSERT INTO advogados (nome, oab, uf_oab, cpf, telefone, email, endereco, cidade, estado, observacoes, ativo)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [nome, oab, uf_oab, cpf, telefone, email, endereco, cidade, estado, observacoes, ativo ? 1 : 0]);
  res.json({ id: result.lastID });
});

app.put('/api/advogados/:id', async (req, res) => {
  const { nome, oab, uf_oab, cpf, telefone, email, endereco, cidade, estado, observacoes, ativo } = req.body;
  await db.run(`
    UPDATE advogados SET nome=?, oab=?, uf_oab=?, cpf=?, telefone=?, email=?, endereco=?, cidade=?, estado=?, observacoes=?, ativo=?, updated_at=CURRENT_TIMESTAMP
    WHERE id=?
  `, [nome, oab, uf_oab, cpf, telefone, email, endereco, cidade, estado, observacoes, ativo ? 1 : 0, req.params.id]);
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
  res.json({ id: result.lastID });
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
  const rows = await db.all('SELECT * FROM modelos ORDER BY nome');
  res.json(rows);
});

app.post('/api/modelos', async (req, res) => {
  const { nome, tipo, descricao, texto, ativo } = req.body;
  const result = await db.run(`
    INSERT INTO modelos (nome, tipo, descricao, texto, ativo)
    VALUES (?, ?, ?, ?, ?)
  `, [nome, tipo, descricao, texto, ativo ? 1 : 0]);
  res.json({ id: result.lastID });
});

app.put('/api/modelos/:id', async (req, res) => {
  const { nome, tipo, descricao, texto, ativo } = req.body;
  await db.run(`
    UPDATE modelos SET nome=?, tipo=?, descricao=?, texto=?, ativo=?, updated_at=CURRENT_TIMESTAMP
    WHERE id=?
  `, [nome, tipo, descricao, texto, ativo ? 1 : 0, req.params.id]);
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
  const cleanText = texto_final.replace(/<[^>]*>?/gm, '\n');
  doc.fontSize(12).text(cleanText, { align: 'justify', indent: 20 });
  doc.end();

  await db.run('UPDATE peticoes SET pdf_path = ? WHERE id = ?', [relativePdfPath, peticaoId]);
  res.json({ id: peticaoId, numero, pdf_path: relativePdfPath });
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
