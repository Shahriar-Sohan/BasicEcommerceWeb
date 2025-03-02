const express = require('express');
const mongoose =  require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

mongoose.connect('mongodb+srv://rivaloncode:1943Sohan@cluster0.29byc.mongodb.net/')

.then(()=>console.log('mongodb connected successful'))
.catch(error=>console.log(error))


const app = express()
const PORT = process.env.PORT || 5001 ;


app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET','POST','DELETE','PUT'],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma"
    ],credentials: true
}))

app.use(cookieParser())
app.use(express.json())


app.listen(PORT,()=>console.log(`server is runnin on port: ${PORT}`))

