import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import supabase from './supabase.js';

const app = express();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'video/mp4',
      'video/quicktime'
    ];
    cb(null, allowedTypes.includes(file.mimetype));
  }
});

const PORT = process.env.PORT || 3010;
const BUCKET_NAME = 'images';

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
app.use(express.json());

// deletar arquivos
app.delete('/files/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { path } = req.body;

    const { error: storageError } = await supabase.storage
      .from('images')
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
    res.status(500).json({ 
      error: error.message || 'Erro ao excluir arquivo' 
    });
  }
});

// Upload endpoint
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) throw new Error('Nenhum arquivo enviado');

    const { originalname, mimetype, buffer } = req.file;
    const fileExt = originalname.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;

    // Upload para o Supabase
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(`public/${fileName}`, buffer, {
        contentType: mimetype,
        upsert: false
      });

    if (uploadError) throw uploadError;

    // Obter URL pública
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(`public/${fileName}`);

    // Salvar metadados no banco
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
    res.status(500).json({ 
      error: error.message,
      details: error.details || null
    });
  }
});

// List files endpoint
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});