const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000;

// Setup middleware
app.use(bodyParser.json());
app.use(cors());

// Initialize SQLite database
const dbPath = path.join('D:', 'CRUD', 'users.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create a simple route for the root path
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// Create a user
app.post('/api/users', (req, res) => {
  const { username, email, password } = req.body;
  db.run(`INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
    [username, email, password], function(err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID });
    });
});

// Read all users
app.get('/api/users', (req, res) => {
  db.all(`SELECT * FROM users`, (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Read user profile by ID
app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json(row);
  });
});

// Read user profile by email
app.get('/api/users/email/:email', (req, res) => {
  const { email } = req.params;
  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json(row);
  });
});

// Update user profile
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;
  db.run(`UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?`,
    [username, email, password, id], function(err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.status(200).json({ changes: this.changes });
    });
});

// Delete user
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM users WHERE id = ?`, [id], function(err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(200).json({ changes: this.changes });
  });
});

// User login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.get(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, password], (err, row) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (row) {
      res.json({ id: row.id });
    } else {
      res.status(401).json({ message: 'Invalid email or password.' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
