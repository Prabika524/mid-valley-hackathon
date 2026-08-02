import { Router } from 'express';
import { db } from '../db/database.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = Router();

// GET /api/gems (public - returns only approved hidden gems for main site)
router.get('/gems', (_req, res) => {
  const gems = db.getApprovedHiddenGems();
  res.json(gems);
});

// GET /api/gems/admin (admin/operator - returns all submitted gems including pending)
router.get('/gems/admin', authenticateToken, requireRole('admin', 'operator'), (_req, res) => {
  const gems = db.getAllHiddenGems();
  res.json(gems);
});

// POST /api/gems (public - citizens submit unpopular places)
router.post('/gems', (req, res) => {
  const { name, subtitle, description, location, highlight, imageUrl, submittedBy, contactEmail } = req.body;

  if (!name || !description || !location) {
    return res.status(400).json({ error: 'Name, location, and description are required' });
  }

  const defaultImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCV2m1my58FmfoOR7GuEW2AYXkZfmJE4_yxQ-tMy3efdDmZYxMlDwApvNpaX0QYsuzBjmW_5CAxJqilzE6qGTIIgXac3584MUAw9OCzStc2KNKkif_ZxziErE3uHatIyV60yt58TuwuPBcsSrvza_PFcRNoo032uF2S5AqDL_76Q0UyQ9cRf0SdiCfqUPxMfH1BklS6IqT10LwgLhKXAIs24UEod-R9DM_5NOV3SOuisqaK6sLeXYJdeDRw5kqmiLUSuReDFxBp1MQ';

  const newGem = db.createHiddenGem({
    name,
    subtitle: subtitle || 'Citizen-Suggested Hidden Gem',
    description,
    location,
    highlight: highlight || 'Community Tourism',
    imageUrl: imageUrl && imageUrl.trim() !== '' ? imageUrl : defaultImage,
    submittedBy: submittedBy || 'Anonymous Citizen',
    contactEmail: contactEmail || '',
  });

  res.status(201).json({
    message: 'Hidden gem place submitted successfully for admin review.',
    gem: newGem,
  });
});

// PUT /api/gems/:id/status (admin/operator - approve or reject submission)
router.put('/gems/:id/status', authenticateToken, requireRole('admin', 'operator'), (req, res) => {
  const { status } = req.body;
  if (!['Approved', 'Rejected'].includes(status)) {
    return res.status(400).json({ error: 'Status must be Approved or Rejected' });
  }

  const updated = db.updateHiddenGemStatus(req.params.id, status);
  if (!updated) return res.status(404).json({ error: 'Hidden gem not found' });

  res.json({
    message: `Hidden gem submission ${status.toLowerCase()} successfully.`,
    gem: updated,
  });
});

export default router;
