import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import supabase from './supabase.js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.dev' });

const app = express();
const PORT = process.env.PORT || 3010;
const BUCKET_NAME = 'images';

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
app.use(express.json());

// Configuração do Multer para upload de arquivos
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 },  // Limite de 25MB por arquivo
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/quicktime'];
    cb(null, allowedTypes.includes(file.mimetype));
  }
});

// Listar arquivos
app.get('/files', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('uploads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar arquivos' });
  }
});

// Upload de arquivo
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) throw new Error('Nenhum arquivo enviado');

    const { originalname, mimetype, buffer } = req.file;
    const fileExt = originalname.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(`public/${fileName}`, buffer, {
        contentType: mimetype,
        upsert: false
      });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(`public/${fileName}`);

    const { data, error: dbError } = await supabase
      .from('uploads')
      .insert([{
        name: originalname,
        path: `public/${fileName}`,
        url: publicUrl,
        mimetype,
        size: req.file.size
      }])
      .select();

    if (dbError) throw dbError;

    res.status(201).json(data[0]);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message || 'Erro ao fazer upload' });
  }
});

// Deletar arquivo
app.delete('/files/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { path } = req.body;

    const { error: storageError } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([path]);

    if (storageError) throw storageError;

    const { error: dbError } = await supabase
      .from('uploads')
      .delete()
      .eq('id', id);

    if (dbError) throw dbError;

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: error.message || 'Erro ao excluir arquivo' });
  }
});

// Enviar email com HTML
app.post('/send-email', async (req, res) => {
  const { to, html } = req.body;

  if (!to || !html) {
    return res.status(400).json({ error: 'Campos "to" e "html" são obrigatórios.' });
  }

  try {
    console.log('Iniciando o envio de email');

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log('Transporter configurado');

    const info = await transporter.sendMail({
      from: `"SnapBox" <${process.env.EMAIL_USER}>`,
      to: Array.isArray(to) ? to.join(',') : to,
      subject: 'Mensagem via SnapBox 📦',
      html,
    });

    console.log('Email enviado:', info.messageId);
    res.status(200).json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    res.status(500).json({ error: 'Erro ao enviar e-mail' });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
