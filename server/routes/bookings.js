import express from 'express';
import { pool } from '../db.js';
import { sendBookingConfirmationEmail } from '../mailer.js';

const router = express.Router();

// GET all bookings (with optional ?status= filter)
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    let query = 'SELECT * FROM bookings';
    const params = [];

    if (status && status !== 'all') {
      query += ' WHERE status = $1';
      params.push(status);
    }
    query += ' ORDER BY booking_date DESC, id DESC';

    const result = await pool.query(query, params);
    const rows = result.rows.map(b => ({
      ...b,
      reference_number: b.booking_code,
      full_name: b.guest_name,
      email: b.guest_email,
      phone: b.guest_phone,
      guests: b.party_size,
      seating_preference: b.seating_area,
      booking_date: b.booking_date instanceof Date ? b.booking_date.toISOString().split('T')[0] : b.booking_date
    }));
    res.json(rows);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ error: 'Failed to retrieve bookings' });
  }
});

// POST create new booking
router.post('/', async (req, res) => {
  try {
    const name = req.body.guestName || req.body.guest_name || req.body.full_name;
    const email = req.body.guestEmail || req.body.guest_email || req.body.email;
    const phone = req.body.guestPhone || req.body.guest_phone || req.body.phone;
    const date = req.body.bookingDate || req.body.booking_date;
    const time = req.body.bookingTime || req.body.booking_time;
    const size = parseInt(req.body.partySize || req.body.party_size || req.body.guests || 2, 10);
    const area = req.body.seatingArea || req.body.seating_area || req.body.seating_preference || 'Main Roastery Hall';
    const occ = req.body.occasion || 'Casual Gathering';
    const requests = req.body.specialRequests || req.body.special_requests || '';
    const code = req.body.bookingCode || req.body.booking_code || req.body.reference_number || ('#AB-' + Math.floor(1000 + Math.random() * 9000));

    if (!name || !email || !phone || !date || !time) {
      return res.status(400).json({ error: 'Required booking fields are missing.' });
    }

    const result = await pool.query(
      `INSERT INTO bookings (booking_code, guest_name, guest_email, guest_phone, party_size, booking_date, booking_time, seating_area, occasion, special_requests, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'pending')
       RETURNING *`,
      [code, name, email, phone, size, date, time, area, occ, requests]
    );

    const newBooking = result.rows[0];
    newBooking.reference_number = newBooking.booking_code;
    newBooking.full_name = newBooking.guest_name;
    newBooking.email = newBooking.guest_email;
    newBooking.phone = newBooking.guest_phone;
    newBooking.guests = newBooking.party_size;
    newBooking.seating_preference = newBooking.seating_area;
    res.status(201).json({ booking: newBooking, ...newBooking });
  } catch (err) {
    console.error('Error creating booking:', err);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// PATCH update booking status (e.g., 'confirmed', 'cancelled')
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value.' });
    }

    // Fetch existing booking
    const existing = await pool.query('SELECT * FROM bookings WHERE id = $1', [id]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found.' });
    }

    const booking = existing.rows[0];
    let emailResult = null;

    // If accepting/confirming the booking, dispatch email to client!
    if (status === 'confirmed') {
      try {
        emailResult = await sendBookingConfirmationEmail(booking);
      } catch (mailErr) {
        console.error('Failed to send confirmation email:', mailErr.message);
      }
    }

    const emailSent = emailResult ? true : booking.email_sent;

    const updateRes = await pool.query(
      `UPDATE bookings
       SET status = $1, email_sent = $2
       WHERE id = $3
       RETURNING *`,
      [status, emailSent, id]
    );

    res.json({
      booking: updateRes.rows[0],
      emailDispatched: !!emailResult,
      email_dispatched: !!emailResult,
      emailPreviewUrl: emailResult?.previewUrl || null,
      preview_url: emailResult?.previewUrl || null
    });
  } catch (err) {
    console.error('Error updating booking status:', err);
    res.status(500).json({ error: 'Failed to update booking status' });
  }
});

// DELETE booking
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM bookings WHERE id = $1', [id]);
    res.json({ success: true, message: 'Booking deleted successfully.' });
  } catch (err) {
    console.error('Error deleting booking:', err);
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});

export default router;
