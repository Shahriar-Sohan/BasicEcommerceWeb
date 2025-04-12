import express from 'express'
import dotenv from 'dotenv'
import mysql from 'mysql2'

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Create a MySQL connection
const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    }
);


// Connect to MySQL
db.connect((err)=>{
    if(err){
        console.error('Error connecting to MySQL: ', err.stack);
        return;
    }
    console.log('Connected to MySQL as ID '+ db.threadId);
})


// Middleware to parse JSON
app.use(express.json())


app.get('/',(req,res)=>{
    res.send('Backend is running!');
})

app.get('/products')

app.get('/about')