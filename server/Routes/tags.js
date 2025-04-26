import express from 'express'
import db from '../server.js'

const router = express.Router()

router.get('/tags',(req,res)=>{
    const sql = 'SELECT * FROM product_tags'
    db.query(sql, (err,result)=>{
        if(err){
            console.error("error while fetching sql in tags: ",err)
        }else{
            res.json(result)
        }
    })
})

export default router;