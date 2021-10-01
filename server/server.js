require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');


const app = express();

app.use(express.json());

// DB config
const db = process.env.MongoURI
mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));


// route


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));