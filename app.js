//imports
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const multer = require('multer');
const config = require('./utils/config');

const productRoute = require('./routes/productRoute');
const transactionRoute = require('./routes/transactionRoute');
// const categoryRoute = require('./routes/categoryRoute');

//app
const app = express();
app.use(cors())
app.use(express.static('build'));

const upload = multer({ dest: './tmp' });

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

app.use(express.json());

//logging
app.use(morgan('tiny'));

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Headers, *, Access-Control-Allow-Origin', 'Origin, X-Requested-with, Content_Type,Accept,Authorization','http://localhost:4200');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/api/v1/product', upload.single("imageFile"), productRoute);

app.use('/api/v1/transact', transactionRoute);

mongoose.connect(config.MONGO_URI)
    .then(() => console.log("connected to mongDB"))
    .catch(err => console.error("error connecting to mongoDB", err))

module.exports = app;