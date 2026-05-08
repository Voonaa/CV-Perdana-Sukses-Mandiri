import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import fileUpload from 'express-fileupload';
import path from 'path';

dotenv.config();

const app = express();
app.use(express.json());
app.use(fileUpload());

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'CVperdana',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

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
    const [result] = await pool.execute(
      'INSERT INTO contacts (name, email, inquiry_type, message) VALUES (?, ?, ?, ?)',
      [name, email, inquiry_type, message]
    );
    res.status(201).json({ message: 'Contact saved successfully', id: (result as any).insertId });
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
    const [result] = await pool.execute(
      'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
      [email, hashedPassword, role || 'member']
    );
    res.status(201).json({ message: 'User registered' });
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Email already registered' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  try {
    const [rows]: any = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];

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
    const [rows] = await pool.execute('SELECT * FROM products ORDER BY created_at DESC');
    res.json(rows);
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
    const [result] = await pool.execute(
      'INSERT INTO products (name, category, description, specs, image, featured) VALUES (?, ?, ?, ?, ?, ?)',
      [name, category, description, specs, image, featured || false]
    );
    res.status(201).json({ message: 'Product saved successfully', id: (result as any).insertId });
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
    const [result] = await pool.execute(
      'UPDATE products SET name = ?, category = ?, description = ?, specs = ?, image = ?, featured = ? WHERE id = ?',
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
    const [result] = await pool.execute('DELETE FROM products WHERE id = ?', [id]);
    console.log('Delete result:', result);
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
