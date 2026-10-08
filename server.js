import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

app.use(express.json());
app.use(express.static(__dirname));

// In-memory comments store
let comments = [
  {
    id: 1,
    name: 'Partner Ruth',
    text: 'Amen! Connecting live from Abuja. Glory to God!',
    timestamp: '2:15 pm'
  },
  {
    id: 2,
    name: 'Brother David',
    text: 'Praying with Pastor and all partners across Zone 1.',
    timestamp: '2:18 pm'
  }
];

app.get('/api/comments', (req, res) => {
  res.json(comments);
});

app.post('/api/comments', (req, res) => {
  const { name, text } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Comment text is required' });
  }
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  const newComment = {
    id: Date.now(),
    name: name && name.trim() ? name.trim() : 'Partner',
    text: text.trim(),
    timestamp: timeStr
  };
  comments.push(newComment);
  res.status(201).json(newComment);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
