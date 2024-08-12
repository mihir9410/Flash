const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.configDotenv();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.PASSWORD,
  database: 'flashcard_db'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

app.post('/api/batches', (req, res) => {
  const { name } = req.body;
  const query = 'INSERT INTO batches (name) VALUES (?)';
  db.query(query, [name], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: result.insertId, name });
  });
});

app.get('/api/batches', (req, res) => {
  const query = 'SELECT * FROM batches';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
});

app.post('/api/flashcards', (req, res) => {
  const { batch_id, question, answer } = req.body;
  const query = 'INSERT INTO flashcards (batch_id, question, answer) VALUES (?, ?, ?)';
  db.query(query, [batch_id, question, answer], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: result.insertId, batch_id, question, answer });
  });
});

app.get('/api/flashcards/:batch_id', (req, res) => {
  const { batch_id } = req.params;
  const query = 'SELECT * FROM flashcards WHERE batch_id = ?';
  db.query(query, [batch_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
});

app.delete('/api/batches/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM batches WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: 'Batch deleted successfully' });
    });
  });
  
app.delete('/api/flashcards/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM batches WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: 'Batch deleted successfully' });
    });
  });
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
