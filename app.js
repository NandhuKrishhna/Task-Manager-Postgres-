const { error } = require('console');
const express = require('express');
const app = express();
const PORT = 8000;
const {Client} = require('pg');


const client = new Client({
    user : 'postgres',
    host : 'localhost',
    database : 'bank',
    password : 'Nandhu@1528Krishna',
    port : 5432
})

client.connect()
.then(() => console.log("Connected to PostgreSQL"))
.catch(err => console.error('Conenection error', err.stack));
app.get('/', (req,res)=>{
    res.send("HelLo world")
})


app.get("/users", async(req,res)=>{
    try {
        const result = await client.query('SELECT dept , COUNT(dept) FROM employees GROUP BY dept');
        res.send(result.rows)
    } catch (error) {
        console.error('Error executing query', error.stack);
        res.status(500).send("Server Error");
    }
})

app.listen(PORT, ()=>{
    console.log(`server has been started at PORT ${PORT}`);
})