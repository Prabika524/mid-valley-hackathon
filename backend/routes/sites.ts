import { Router } from 'express';
import { db } from '../db/database.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = Router();

// GET /api/sites
router.get('/sites', (_req, res) => {
  const sites = db.getSites();
  res.json(sites);
});

// GET /api/sites/:id
router.get('/sites/:id', (req, res) => {
  const site = db.getSiteById(req.params.id);
  if (!site) return res.status(404).json({ error: 'Site not found' });
  res.json(site);
});

// POST /api/sites (admin/operator only)
router.post('/sites', authenticateToken, requireRole('admin', 'operator'), (req, res) => {
  const { name, category, managedBy, foreignFeeUSD, saarcFeeNPR, nepaliFee, operatingHours, description, region } = req.body;

  if (!name || !category) {
    return res.status(400).json({ error: 'Name and category are required' });
  }

  const newSite = db.createSite({
    name,
    category: category || 'Heritage Site',
    managedBy: managedBy || 'Nepal Heritage Platform',
    foreignFeeUSD: Number(foreignFeeUSD) || 0,
    saarcFeeNPR: Number(saarcFeeNPR) || 0,
    nepaliFee: nepaliFee || 'Free',
    operatingHours: operatingHours || '09:00 - 17:00',
    description: description || '',
    imageUrl: req.body.imageUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9zDoHJ832MWuu6GOQo8OprehtIaUeEpfGWQo8xb6u4qQnLL2ngFYcjnQOy3_6QCqDLeerBFnkxbwMcNTt-EfiKRWvHPPwa9ucBkbJQNrFiZwTfm85TjQkAAAt0wzPO84H_IIjGWzVQ28Hn7ASmXJfyX2EwPrRZyW4YoOEqj8r9VUlhA98B6PprQXWYKyqDN3N9jHFZ4p_AaKw4kGmGigTJppZ-6nFEGlRnA3bkTCtj59bbgbFpNhKxKHnOEGUmZKGzJgxzjsPLII',
    region: region || 'Kathmandu Valley',
  });

  res.status(201).json(newSite);
});

// PUT /api/sites/:id
router.put('/sites/:id', authenticateToken, requireRole('admin', 'operator'), (req, res) => {
  const updated = db.updateSite(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Site not found' });
  res.json(updated);
});

// GET /api/treks
router.get('/treks', (_req, res) => {
  const treks = db.getTreks();
  res.json(treks);
});

// GET /api/treks/:id
router.get('/treks/:id', (req, res) => {
  const trek = db.getTrekById(req.params.id);
  if (!trek) return res.status(404).json({ error: 'Trek not found' });
  res.json(trek);
});

export default router;
