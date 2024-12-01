import express from 'express';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Create MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Keyon_4417498', // Update this with your MySQL password
  database: 'earthly_cure',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection
pool.getConnection()
  .then(connection => {
    console.log('Successfully connected to MySQL');
    connection.release();
  })
  .catch(err => {
    console.error('Error connecting to MySQL:', err);
  });

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';

// Login endpoint with detailed error handling
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required'
      });
    }

    // Get user from database
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    const user = rows[0];

    // Compare password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.userID, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Send success response
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.userID,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      message: 'An error occurred during login. Please try again.'
    });
  }
});

// Registration endpoint with improved error handling
router.post('/register', async (req, res) => {
  const { firstname, lastname, email, password, location } = req.body;

  try {
    // Validate input
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({
        message: 'All fields are required'
      });
    }

    // Check if email exists
    const [existing] = await pool.execute(
      'SELECT userID FROM users WHERE email = ?',
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        message: 'Email already exists'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user
    const [result] = await pool.execute(
      'INSERT INTO users (firstname, lastname, email, password, location) VALUES (?, ?, ?, ?, ?)',
      [firstname, lastname, email, hashedPassword, location || '']
    );

    // Generate token
    const token = jwt.sign(
      { userId: result.insertId, email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Send success response
    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        id: result.insertId,
        firstname,
        lastname,
        email
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      message: 'An error occurred during registration. Please try again.'
    });
  }
});

export default router;