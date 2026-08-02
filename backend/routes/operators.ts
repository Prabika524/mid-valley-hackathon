import { Router } from 'express';
import { db } from '../db/database.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = Router();

// GET /api/operators/applications (admin / operator)
router.get('/applications', authenticateToken, requireRole('admin', 'operator'), (_req, res) => {
  const apps = db.getOperatorApplications();
  res.json(apps);
});

// PUT /api/operators/applications/:id/status (admin only)
router.put('/applications/:id/status', authenticateToken, requireRole('admin', 'operator'), (req, res) => {
  const { status } = req.body;
  if (!['Approved', 'Rejected'].includes(status)) {
    return res.status(400).json({ error: 'Status must be Approved or Rejected' });
  }

  const updated = db.updateOperatorApplicationStatus(req.params.id, status);
  if (!updated) return res.status(404).json({ error: 'Application not found' });

  res.json({
    message: `Application ${status.toLowerCase()} successfully`,
    application: updated,
  });
});

// GET /api/operators/dashboard-stats
router.get('/dashboard-stats', (_req, res) => {
  const metrics = db.getDashboardMetrics();
  const activities = db.getActivities();
  const recentBookings = db.getBookings().slice(0, 5);

  res.json({
    metrics,
    activities,
    recentBookings,
  });
});

export default router;
