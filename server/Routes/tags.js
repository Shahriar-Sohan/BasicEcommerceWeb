import express from 'express'
import db from '../server.js'

const router = express.Router()

router.get('/tags',(req,res)=>{
    const sql = 'SELECT * FROM product_tags'
    db.query(sql, (err,result)=>{
        if(err){
            console.error("error while fetching sql in tags: ",err)
            return res.status(500).send('error in tags db query');
        }else{
            res.json(result)
        }
    })
})

router.post('/tags/add', (req, res) => {
    const { tag_name } = req.body;
    if (!tag_name) {
      return res.status(400).send("Tag name is required");
    }

    const sql = 'INSERT INTO product_tags (tag_name) VALUES (?)';
    db.query(sql, [tag_name], (err, result) => {
      if (err) {
        console.error("Error while adding tag:", err);
        return res.status(500).send("Failed to add tag to database");
      }
      res.status(201).send("Tag added successfully");
    });
})

router.delete('/tags/dlt/:id', (req, res)=>{
    const { id } = req.params;
    const sql = 'DELETE FROM product_tags WHERE tag_id = ?'

    db.query(sql ,[id] ,(err, result)=>{
        if(err){
            console.error("failed to delete tag: ", err)
            return res.status(500).send("failed to delete tag from database")
        }else{
            if(result.affectedRows === 0){
                return res.status(404).send('tag not found in database')
            }
            res.send('tag has been deleted successfully')
        }
    })
})
router.put('/tags/:id', (req, res) => {
  const { id } = req.params;
  const { tag_name } = req.body;

  if (!tag_name) {
    return res.status(400).send('Tag name is required for update');
  }

  const sql = 'UPDATE product_tags SET tag_name = ? WHERE tag_id = ?';
  db.query(sql, [tag_name, id], (err, result) => {
    if (err) {
      console.error('Error while updating tag:', err);
      return res.status(500).send('Failed to update tag in database');
    }
    res.status(200).send('Tag updated successfully');
  });
});

export default router;