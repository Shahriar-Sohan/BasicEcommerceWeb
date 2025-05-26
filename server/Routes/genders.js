import express from 'express';
import db from '../server.js';

const router = express.Router();

// GET /genders: Fetch all genders
router.get('/genders', (req, res) => {
  const sql = 'SELECT * FROM product_gender';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching genders from DB:', err);
      return res.status(500).send('Error in genders DB query');
    } else {
      res.json(result);
    }
  });
});

// POST /genders/add: Add a new gender
router.post('/genders/add', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Gender name is required');
  }

  const sql = 'INSERT INTO product_gender (gender_name) VALUES (?)';
  db.query(sql, [name], (err, result) => {
    if (err) {
      console.error('Error while adding gender:', err);
      return res.status(500).send('Failed to add gender to database');
    }
    res.status(201).send('Gender added successfully');
  });
});

// DELETE /genders/dlt/:id: Delete a gender by ID
router.delete('/genders/dlt/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM product_gender WHERE gender_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error while deleting gender:', err);
      return res.status(500).send('Failed to delete gender from database');
    }
    res.status(200).send('Gender deleted successfully');
  });
});

// PUT /genders/:id: Update a gender by ID
router.put('/genders/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Gender name is required for update');
  }

  const sql = 'UPDATE product_gender SET gender_name = ? WHERE gender_id = ?';
  db.query(sql, [name, id], (err, result) => {
    if (err) {
      console.error('Error while updating gender:', err);
      return res.status(500).send('Failed to update gender in database');
    }
    res.status(200).send('Gender updated successfully');
  });
});

export default router;