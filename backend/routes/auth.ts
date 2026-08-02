import { Router, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db/database.js';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'nepal_heritage_jwt_secret_key_2026';

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = db.getUserByEmail(email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const validPassword = bcrypt.compareSync(password, user.passwordHash);
  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
    companyName: user.companyName,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

  return res.json({
    token,
    user: payload,
  });
});

// POST /api/auth/register
router.post('/register', (req, res) => {
  const { name, email, password, role, companyName, licenseNumber, phone } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  const existing = db.getUserByEmail(email);
  if (existing) {
    return res.status(400).json({ error: 'User with this email already exists' });
  }

  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, salt);

  const newUser = db.createUser({
    name,
    email,
    passwordHash,
    role: role === 'operator' ? 'operator' : 'user',
    companyName,
    licenseNumber,
    phone,
  });

  const payload = {
    id: newUser.id,
    email: newUser.email,
    role: newUser.role,
    name: newUser.name,
    companyName: newUser.companyName,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

  return res.status(201).json({
    token,
    user: payload,
  });
});

// POST /api/auth/apply-operator
router.post('/apply-operator', (req, res) => {
  const { companyName, licenseNumber, contactPerson, email, phone, officeAddress, documentName } = req.body;

  if (!companyName || !licenseNumber || !contactPerson || !email) {
    return res.status(400).json({ error: 'Company name, license number, contact person, and email are required' });
  }

  const application = db.createOperatorApplication({
    companyName,
    licenseNumber,
    contactPerson,
    email,
    phone: phone || '',
    officeAddress: officeAddress || '',
    documentName: documentName || 'business_license.pdf',
  });

  return res.status(201).json({
    message: 'Application submitted successfully. It will be reviewed within 48 hours.',
    application,
  });
});

// GET /api/auth/me
router.get('/me', authenticateToken, (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
  const user = db.getUserById(req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  return res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      companyName: user.companyName,
      licenseNumber: user.licenseNumber,
      phone: user.phone,
    },
  });
});

export default router;
