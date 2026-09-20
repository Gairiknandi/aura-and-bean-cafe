import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// GET all event inquiries
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM event_inquiries ORDER BY target_date DESC, id DESC');
    const rows = result.rows.map(e => ({
      ...e,
      reference_number: e.ticket_code,
      full_name: e.host_name,
      email: e.host_email,
      phone: e.host_phone,
      guests: e.guest_count,
      event_date: e.target_date instanceof Date ? e.target_date.toISOString().split('T')[0] : e.target_date,
      catering_needed: e.package_title,
      message: e.notes
    }));
    res.json(rows);
  } catch (err) {
    console.error('Error fetching event inquiries:', err);
    res.status(500).json({ error: 'Failed to fetch event inquiries' });
  }
});

// POST submit new event inquiry
router.post('/', async (req, res) => {
  try {
    const code = req.body.ticketCode || req.body.ticket_code || req.body.reference_number || ('#EVT-' + Math.floor(1000 + Math.random() * 9000));
    const type = req.body.eventType || req.body.event_type || 'Corporate Meeting / Workshop';
    const date = req.body.targetDate || req.body.target_date || req.body.event_date;
    const count = parseInt(req.body.guestCount || req.body.guest_count || req.body.guests || 25, 10);
    const budget = req.body.estimatedBudget || req.body.estimated_budget || req.body.budget || '';
    const name = req.body.hostName || req.body.host_name || req.body.full_name;
    const company = req.body.hostCompany || req.body.host_company || '';
    const email = req.body.hostEmail || req.body.host_email || req.body.email;
    const phone = req.body.hostPhone || req.body.host_phone || req.body.phone;
    const pkgTitle = req.body.packageTitle || req.body.package_title || req.body.catering_needed || '';
    const pkgInvestment = req.body.packageInvestment || req.body.package_investment || null;
    const notes = req.body.notes || req.body.message || '';

    const result = await pool.query(
      `INSERT INTO event_inquiries (
        ticket_code, event_type, target_date, guest_count, estimated_budget,
        host_name, host_company, host_email, host_phone,
        package_title, package_investment, notes, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, 'pending')
      RETURNING *`,
      [
        code,
        type,
        date,
        count,
        budget,
        name,
        company,
        email,
        phone,
        pkgTitle,
        pkgInvestment ? parseFloat(pkgInvestment) : null,
        notes
      ]
    );

    const newEvent = result.rows[0];
    newEvent.reference_number = newEvent.ticket_code;
    newEvent.full_name = newEvent.host_name;
    newEvent.email = newEvent.host_email;
    newEvent.phone = newEvent.host_phone;
    newEvent.guests = newEvent.guest_count;
    newEvent.event_date = newEvent.target_date;
    res.status(201).json({ event: newEvent, ...newEvent });
  } catch (err) {
    console.error('Error saving event inquiry:', err);
    res.status(500).json({ error: 'Failed to save event inquiry' });
  }
});

// PATCH update inquiry status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await pool.query(
      'UPDATE event_inquiries SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating inquiry status:', err);
    res.status(500).json({ error: 'Failed to update inquiry status' });
  }
});

// DELETE inquiry
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM event_inquiries WHERE id = $1', [id]);
    res.json({ success: true, message: 'Inquiry deleted' });
  } catch (err) {
    console.error('Error deleting inquiry:', err);
    res.status(500).json({ error: 'Failed to delete inquiry' });
  }
});

export default router;
