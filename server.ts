import express from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import fileUpload from 'express-fileupload';
import path from 'path';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// Initialize PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Create tables if they don't exist
const initDb = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'member'
      );
      
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        inquiry_type VARCHAR(100) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        specs TEXT NOT NULL,
        image VARCHAR(255) NOT NULL,
        featured BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Database tables initialized');
  } catch (err) {
    console.error('Error initializing database tables:', err);
  }
};

initDb();

const JWT_SECRET = process.env.JWT_SECRET || 'secret_super_aman_123';

// Middleware for Auth
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Contact Route
app.post('/api/contacts', async (req, res) => {
  const { name, email, inquiry_type, message } = req.body;

  if (!name || !email || !inquiry_type || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO contacts (name, email, inquiry_type, message) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, email, inquiry_type, message]
    );
    res.status(201).json({ message: 'Contact saved successfully', id: result.rows[0].id });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Auth Routes
app.post('/api/register', async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (email, password, role) VALUES ($1, $2, $3)',
      [email, hashedPassword, role || 'member']
    );
    res.status(201).json({ message: 'User registered' });
  } catch (error: any) {
    if (error.code === '23505') { // PostgreSQL unique violation code
      return res.status(400).json({ error: 'Email already registered' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Product Routes
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/products', authenticateToken, async (req: any, res) => {
  if (req.user.role !== 'admin') return res.sendStatus(403);

  const { name, category, description, specs, image, featured } = req.body;
  if (!name || !category || !description || !specs || !image) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO products (name, category, description, specs, image, featured) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      [name, category, description, specs, image, featured || false]
    );
    res.status(201).json({ message: 'Product saved successfully', id: result.rows[0].id });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/upload', authenticateToken, async (req: any, res) => {
  if (req.user.role !== 'admin') return res.sendStatus(403);

  try {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
      return res.status(400).json({ error: 'No file uploaded with name "image".' });
    }

    const file = req.files.image as any; 
    
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({ error: 'Only image files are allowed.' });
    }

    const ext = path.extname(file.name);
    const filename = `${Date.now()}${ext}`;
    const uploadPath = path.join(process.cwd(), 'public', 'images', filename);

    file.mv(uploadPath, (err: any) => {
      if (err) {
        console.error('File move error:', err);
        return res.status(500).json({ error: 'Failed to save file.' });
      }
      res.json({ message: 'File uploaded successfully', path: `/images/${filename}` });
    });
  } catch (error) {
    console.error('Upload route error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/products/:id', authenticateToken, async (req: any, res) => {
  if (req.user.role !== 'admin') return res.sendStatus(403);

  const { id } = req.params;
  const { name, category, description, specs, image, featured } = req.body;

  if (!name || !category || !description || !specs || !image) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    await pool.query(
      'UPDATE products SET name = $1, category = $2, description = $3, specs = $4, image = $5, featured = $6 WHERE id = $7',
      [name, category, description, specs, image, featured || false, id]
    );
    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/products/:id', authenticateToken, async (req: any, res) => {
  if (req.user.role !== 'admin') return res.sendStatus(403);

  const { id } = req.params;
  console.log('DELETE request received for ID:', id);

  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1', [id]);
    console.log('Delete result:', result.rowCount);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
