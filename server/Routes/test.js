import express from 'express'


const router = express.Router();

router.get('/test', (req,res)=>{
    res.status(201).send('router works!')
})

export default router;