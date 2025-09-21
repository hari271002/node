const express = require('express');
const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({path : "./.env"});

const app = express();
const port = 3000;
const DB = process.env.DB_URL.replace('<db_password>',process.env.DB_PASSWORD);
mongoose.connect(DB,{
    useNewUrlParser : true,
    useUnifiedTopology : true}).then(()=>{
        console.log('DB connection successful');
    })

app.use(express.json());

const data = JSON.parse(fs.readFileSync(`${__dirname}/dummy-data.txt`, 'utf-8'));

app.get('/api/v1/data',(req,res)=>{
    res.status(200).json({
        statusCode : 200,
        body : data 
    })
})

app.post('/api/v1/data',(req,res)=>{
    const newData = req.body;
    data.push(newData);
    fs.writeFileSync(`${__dirname}/dummy-data.txt`, JSON.stringify(data));
    res.status(201).json({
        statusCode : 201,
        body : newData
    })
})

app.listen(port,()=>{
    console.log(`App is running on port ${port}`);
})