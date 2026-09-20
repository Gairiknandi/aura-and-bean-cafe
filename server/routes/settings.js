import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// GET all settings
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM store_settings');
    const settings = {};
    result.rows.forEach((row) => {
      settings[row.key] = row.value;
    });
    res.json(settings);
  } catch (err) {
    console.error('Error fetching settings:', err);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// PUT update any setting by key (e.g. store_status, announcement)
router.put('/:key', async (req, res) => {
  try {
    const { key } = req.params;
    let val = req.body;

    if (key === 'store_status') {
      const mode = req.body.value || req.body.mode || 'auto';
      val = {
        mode,
        value: mode,
        manual_state: mode === 'force_closed' ? 'closed' : 'open',
        banner_note: req.body.banner_note || ''
      };
    } else if (req.body.value !== undefined) {
      val = typeof req.body.value === 'string' ? { value: req.body.value } : req.body.value;
    }

    const result = await pool.query(
      `INSERT INTO store_settings (key, value)
       VALUES ($1, $2)
       ON CONFLICT (key) DO UPDATE SET value = $2
       RETURNING *`,
      [key, JSON.stringify(val)]
    );

    res.json(result.rows[0].value);
  } catch (err) {
    console.error('Error updating setting:', err);
    res.status(500).json({ error: 'Failed to update setting' });
  }
});

export default router;
