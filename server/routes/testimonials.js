import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// GET all testimonials
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM testimonials ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching testimonials:', err);
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

// POST add new testimonial
router.post('/', async (req, res) => {
  try {
    const { name, title, avatar, stars, quote } = req.body;
    const result = await pool.query(
      `INSERT INTO testimonials (name, title, avatar, stars, quote)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        name,
        title,
        avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        stars || '★★★★★',
        quote
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding testimonial:', err);
    res.status(500).json({ error: 'Failed to add testimonial' });
  }
});

// PUT update testimonial
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, title, avatar, stars, quote } = req.body;

    const result = await pool.query(
      `UPDATE testimonials
       SET name = $1, title = $2, avatar = $3, stars = $4, quote = $5
       WHERE id = $6
       RETURNING *`,
      [name, title, avatar, stars, quote, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating testimonial:', err);
    res.status(500).json({ error: 'Failed to update testimonial' });
  }
});

// DELETE testimonial
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM testimonials WHERE id = $1', [id]);
    res.json({ success: true, message: 'Testimonial deleted successfully.' });
  } catch (err) {
    console.error('Error deleting testimonial:', err);
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
});

export default router;
