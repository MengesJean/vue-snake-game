import express from 'express';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const LEADERBOARD_FILE = join(__dirname, 'leaderboard.json');

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

// Initialize leaderboard file if it doesn't exist
async function initLeaderboard() {
  try {
    await fs.access(LEADERBOARD_FILE);
  } catch {
    await fs.writeFile(LEADERBOARD_FILE, '[]', 'utf8');
  }
}

// Get leaderboard entries
app.get('/api/leaderboard', async (req, res) => {
  try {
    const data = await fs.readFile(LEADERBOARD_FILE, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading leaderboard:', error);
    res.status(500).json({ error: 'Failed to read leaderboard' });
  }
});

// Add new entry
app.post('/api/leaderboard', async (req, res) => {
  try {
    let entries = [];
    try {
      const data = await fs.readFile(LEADERBOARD_FILE, 'utf8');
      entries = JSON.parse(data);
    } catch {
      entries = [];
    }

    entries.push(req.body);
    await fs.writeFile(LEADERBOARD_FILE, JSON.stringify(entries, null, 2), 'utf8');
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving score:', error);
    res.status(500).json({ error: 'Failed to save score' });
  }
});

await initLeaderboard();
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
}); 