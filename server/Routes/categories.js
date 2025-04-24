import express from 'express'
import db from '../server.js'

const router = express.Router();

router.get('/categories', (req,res)=>{
    const sql = 'SELECT * FROM product_categories'
    db.query(sql, (err, result)=>{
        if(err){
            console.error("having problem on fetching categories via db", err)
        }else{
            res.json(result)
        }
    })
})

export default router;