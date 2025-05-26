import express from 'express';
import db from '../server.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();
const SECRET = process.env.JWT_SECRET || 'your_fallback_secret_key'; // Add your env var JWT_SECRET

// Register a new user
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send('All fields are required');
  }

  // Check if user exists
  db.query('SELECT * FROM users WHERE email = ? OR username = ?', [email, username], async (err, users) => {
    if (err) {
      console.error('DB error during user check:', err);
      return res.status(500).send('Database error');
    }
    if (users.length > 0) {
      return res.status(409).send('User with this email or username already exists');
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      db.query(sql, [username, email, hashedPassword], (err, result) => {
        if (err) {
          console.error('Registration error:', err);
          return res.status(500).send('Error registering user');
        }
        res.status(201).send('User registered');
      });
    } catch (error) {
      console.error('Hashing error:', error);
      res.status(500).send('Server error');
    }
  });
});

// Login an existing user
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error('DB error during login:', err);
      return res.status(500).send('Database error');
    }

    if (results.length === 0) {
      return res.status(401).send('Invalid credentials');
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).send('Invalid credentials');

    const token = jwt.sign(
      { user_id: user.user_id, username: user.username },
      SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  });
});

export default router;