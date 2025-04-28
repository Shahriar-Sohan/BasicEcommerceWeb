import express from 'express'
import db from '../server.js'

const router = express.Router();

router.get('/categories', (req,res)=>{
    const sql = 'SELECT * FROM product_categories'
    db.query(sql, (err, result)=>{
        if(err){
            console.error("having problem on fetching categories via db", err)
            return res.status(500).send('error in categories db query');
        }else{
            res.json(result)
        }
    })
})

router.post('/categories/add', (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).send('Category name and description are required');
  }

  const sql = 'INSERT INTO product_categories (category_name, category_description) VALUES (?, ?)';
  db.query(sql, [name, description], (err, result) => {
    if (err) {
      console.error('Error while adding category:', err);
      return res.status(500).send('Failed to add category to database');
    }
    res.status(201).send('Category added successfully');
  });
});

router.delete('/categories/dlt/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM product_categories WHERE category_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error while deleting category:', err);
      return res.status(500).send('Failed to delete category from database');
    }
    res.status(200).send('Category deleted successfully');
  });
});

export default router;