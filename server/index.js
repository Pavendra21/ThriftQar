const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const info = require('./Routes/route');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
 

// require('dotenv').config();


const app = express();
app.use(cors({
    origin: 'https://thrift-qar.vercel.app', // Remove trailing slash
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'], // Optional: add headers you expect
    credentials: true, // This is the key part
  }));

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'Uploads')));

// .env files configuration 

// const dbUrl = process.env.DATABASE_URL;
// console.log(dbUrl);
// const port = process.env.PORT;
// console.log(port);
// Mongo db Connection .

mongoose.connect('mongodb+srv://pavendra21:psr123456@cluster1.4lk1w.mongodb.net/ThriftQar?retryWrites=true&w=majority&appName=Cluster1', {
   
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB', error);
});


// defining Port 
const PORT = 8000;

app.use('/api',info)


//Port listening

app.listen(PORT,()=>console.log(`Server connected to ${PORT}`));
