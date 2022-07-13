//imports
// const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require('./utils/config');

const productRoute = require('./routes/productRoute');
// const categoryRoute = require('./routes/categoryRoute');

//app
const app = express();

// app.use(cors);
app.use(express.json());

//logging
app.use(morgan('tiny'));

app.use('/api/v1/product', productRoute);

// app.use('/api/v1/category', categoryRoute);

// mongoose.connect(config.MONGO_URI)
//     .then(() => console.log("connected to mongDB"))
//     .catch(err => console.error("error connecting to mongoDB", err))

module.exports = app;