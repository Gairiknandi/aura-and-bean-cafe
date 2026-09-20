import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// GET all menu items
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM menu_items ORDER BY id ASC');
    // Format to match frontend structure (numericPrice, etc.)
    const items = result.rows.map((row) => ({
      id: row.id,
      name: row.title,
      title: row.title,
      category: row.category,
      price: row.price.startsWith('₹') ? row.price : `₹${row.price}`,
      numericPrice: row.numeric_price,
      description: row.description,
      dietary: row.dietary || [],
      image: row.image,
      featured: row.featured,
      badge: row.tag,
      tag: row.tag,
      is_available: true
    }));
    res.json(items);
  } catch (err) {
    console.error('Error fetching menu items:', err);
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

// POST add new menu item
router.post('/', async (req, res) => {
  try {
    const {
      id,
      title,
      name,
      category,
      price,
      numericPrice,
      description,
      dietary,
      image,
      featured,
      tag,
      badge
    } = req.body;

    const dishTitle = title || name || 'New Dish';
    const itemId = id || dishTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const numPrice = numericPrice ? parseInt(numericPrice, 10) : parseInt(String(price).replace(/[^0-9]/g, '') || '0', 10);
    const priceFormatted = String(price).startsWith('₹') ? price : `₹${numPrice}`;

    const result = await pool.query(
      `INSERT INTO menu_items (id, title, category, price, numeric_price, description, dietary, image, featured, tag)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [
        itemId,
        dishTitle,
        category || 'coffee',
        priceFormatted,
        numPrice,
        description || '',
        dietary || [],
        image || 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80',
        featured === true,
        tag || badge || ''
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding menu item:', err);
    res.status(500).json({ error: 'Failed to add menu item' });
  }
});

// PUT update menu item
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      name,
      category,
      price,
      numericPrice,
      description,
      dietary,
      image,
      featured,
      tag,
      badge
    } = req.body;

    // Support partial updates
    const existing = await pool.query('SELECT * FROM menu_items WHERE id = $1', [id]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    const current = existing.rows[0];

    const dishTitle = title || name || current.title;
    const cat = category || current.category;
    const numPrice = numericPrice !== undefined
      ? parseInt(numericPrice, 10)
      : price !== undefined
      ? parseInt(String(price).replace(/[^0-9]/g, '') || '0', 10)
      : current.numeric_price;
    const priceFormatted = price !== undefined
      ? (String(price).startsWith('₹') ? price : `₹${numPrice}`)
      : current.price;
    const desc = description !== undefined ? description : current.description;
    const diet = dietary !== undefined ? dietary : current.dietary;
    const img = image !== undefined ? image : current.image;
    const feat = featured !== undefined ? featured : current.featured;
    const t = tag !== undefined ? tag : badge !== undefined ? badge : current.tag;

    const result = await pool.query(
      `UPDATE menu_items
       SET title = $1, category = $2, price = $3, numeric_price = $4, description = $5, dietary = $6, image = $7, featured = $8, tag = $9
       WHERE id = $10
       RETURNING *`,
      [
        dishTitle,
        cat,
        priceFormatted,
        numPrice,
        desc,
        diet || [],
        img,
        feat === true,
        t,
        id
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating menu item:', err);
    res.status(500).json({ error: 'Failed to update menu item' });
  }
});

// DELETE menu item
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM menu_items WHERE id = $1', [id]);
    res.json({ success: true, message: 'Item deleted.' });
  } catch (err) {
    console.error('Error deleting menu item:', err);
    res.status(500).json({ error: 'Failed to delete menu item' });
  }
});

export default router;
