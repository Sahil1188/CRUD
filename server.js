const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Setup middleware
app.use(bodyParser.json());
app.use(cors());

// Setup PostgreSQL connection
const pool = new Pool({
  user: 'postgres',        // Replace with your PostgreSQL username
  host: 'localhost',
  database: 'users',     // Replace with your PostgreSQL database name
  password: 'Sahil@123',     // Replace with your PostgreSQL password
  port: 5432,                    // PostgreSQL port (default is 5432)
});

// Create users table if it doesn't exist
const createUsersTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      password VARCHAR(100)
    );
  `;
  try {
    await pool.query(query);
    console.log("Users table created or already exists.");
  } catch (err) {
    console.error("Error creating users table:", err.message);
  }
};

// Automatically create the table when server starts
createUsersTable();

// Create a simple route for the root path
app.get('/', (req, res) => {
  res.send('Server is up and running with PostgreSQL!');
});

// Create a user
app.post('/api/users', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id`,
      [username, email, password]
    );
    res.status(201).json({ id: result.rows[0].id });
  } catch (err) {
    console.error('Error creating user:', err.message);
    res.status(400).json({ error: err.message });
  }
});

// Read all users
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('Error reading users:', err.message);
    res.status(400).json({ error: err.message });
  }
});

// Read user profile by ID
app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error reading user:', err.message);
    res.status(400).json({ error: err.message });
  }
});

// Read user profile by email
app.get('/api/users/email/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error reading user by email:', err.message);
    res.status(400).json({ error: err.message });
  }
});

// Update user profile
app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;
  try {
    const result = await pool.query(
      `UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4`,
      [username, email, password, id]
    );
    res.status(200).json({ changes: result.rowCount });
  } catch (err) {
    console.error('Error updating user:', err.message);
    res.status(400).json({ error: err.message });
  }
});

// Delete user
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1', [id]);
    res.status(200).json({ changes: result.rowCount });
  } catch (err) {
    console.error('Error deleting user:', err.message);
    res.status(400).json({ error: err.message });
  }
});

// User login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1 AND password = $2',
      [email, password]
    );
    if (result.rows.length > 0) {
      res.json({ id: result.rows[0].id });
    } else {
      res.status(401).json({ message: 'Invalid email or password.' });
    }
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(400).json({ error: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
