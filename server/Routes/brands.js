import express from 'express'
import db from '../server.js'

const router = express.Router();


router.get('/brands', (req, res) => {
  const sql = 'SELECT * FROM product_brand';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error while querying brands:', err);
      return res.status(500).send('Error in brands db query');
    }
    res.status(200).json(result);
  });
});

router.post('/brands/add', (req, res) => {
  const { brand_name } = req.body;
  if (!brand_name) {
    return res.status(400).send('Brand name is required');
  }
  const sql = 'INSERT INTO product_brand (brand_name) VALUES (?)';
  db.query(sql, [brand_name], (err, result) => {
    if (err) {
      console.error('Error while adding brand:', err);
      return res.status(500).send('Failed to add brand to database');
    }
    res.status(201).send('Brand added successfully');
  });
});

router.delete('/brands/dlt/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM product_brand WHERE brand_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error while deleting brand:', err);
      return res.status(500).send('Failed to delete brand from database');
    }
    res.status(200).send('Brand deleted successfully');
  });
});

router.put('/brands/:id', (req, res) => {
  const { id } = req.params;
  const { brand_name } = req.body;

  if (!brand_name) {
    return res.status(400).send('Brand name is required for update');
  }

  const sql = 'UPDATE product_brand SET brand_name = ? WHERE brand_id = ?';
  db.query(sql, [brand_name, id], (err, result) => {
    if (err) {
      console.error('Error while updating brand:', err);
      return res.status(500).send('Failed to update brand in database');
    }
    res.status(200).send('Brand updated successfully');
  });
});

export default router;