import { Router } from 'express';
import { db } from '../db/database.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = Router();

// GET /api/bookings
router.get('/bookings', (_req, res) => {
  const { site, status, date } = _req.query;
  let bookings = db.getBookings();

  if (site && site !== 'All Sites & Routes' && site !== 'All') {
    bookings = bookings.filter(b => b.siteName.toLowerCase().includes(String(site).toLowerCase()) || b.siteId === site);
  }
  if (status && status !== 'All Statuses' && status !== 'All') {
    bookings = bookings.filter(b => b.status.toLowerCase() === String(status).toLowerCase());
  }
  if (date) {
    bookings = bookings.filter(b => b.visitDate === date);
  }

  res.json(bookings);
});

// GET /api/bookings/:id
router.get('/bookings/:id', (req, res) => {
  const booking = db.getBookingById(req.params.id);
  if (!booking) return res.status(404).json({ error: 'Booking not found' });
  res.json(booking);
});

// POST /api/bookings
router.post('/bookings', (req, res) => {
  const { clientName, email, phone, passportNumber, nationality, siteId, siteName, visitDate, guests, totalPriceUSD, paymentMethod } = req.body;

  if (!clientName || !email || !siteName || !visitDate) {
    return res.status(400).json({ error: 'Client name, email, site name, and visit date are required' });
  }

  const numGuests = Number(guests) || 1;
  const price = Number(totalPriceUSD) || 15 * numGuests;
  const commissionUSD = Math.round(price * 0.15 * 100) / 100;

  const newBooking = db.createBooking({
    clientName,
    email,
    phone: phone || '',
    passportNumber: passportNumber || '',
    nationality: nationality || 'International',
    siteId: siteId || 'bhaktapur',
    siteName,
    visitDate,
    guests: numGuests,
    totalPriceUSD: price,
    paymentMethod: paymentMethod || 'Card',
    status: 'Confirmed',
    entryGate: 'Main Gate Entrance',
    ticketType: `Standard Entry (${numGuests} Guest${numGuests > 1 ? 's' : ''})`,
    commissionUSD,
  });

  res.status(201).json(newBooking);
});

// PUT /api/bookings/:id/notes (admin / operator)
router.put('/bookings/:id/notes', authenticateToken, requireRole('admin', 'operator'), (req, res) => {
  const { notes } = req.body;
  const updated = db.updateBookingNotes(req.params.id, notes || '');
  if (!updated) return res.status(404).json({ error: 'Booking not found' });
  res.json(updated);
});

// PUT /api/bookings/:id/status (admin / operator)
router.put('/bookings/:id/status', authenticateToken, requireRole('admin', 'operator'), (req, res) => {
  const { status } = req.body;
  if (!['Confirmed', 'Pending', 'Cancelled'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  const updated = db.updateBookingStatus(req.params.id, status);
  if (!updated) return res.status(404).json({ error: 'Booking not found' });
  res.json(updated);
});

export default router;
