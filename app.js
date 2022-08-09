//imports
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const config = require('./utils/config');

const productRoute = require('./routes/productRoute');
const transactionRoute = require('./routes/transactionRoute');

//app
const app = express();

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

const upload = multer({ dest: './tmp' });

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

app.use(express.json());

//logging
app.use(morgan('tiny'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers, *, Access-Control-Allow-Origin', 'Origin, X-Requested-with, Content_Type,Accept,Authorization', 'http://localhost:4200');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/api/v1/product', upload.single("imageFile"), productRoute);

app.use('/api/v1/transact', transactionRoute);

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './build', 'index.html'));
});

mongoose.connect(config.MONGO_URI)
    .then(() => console.log("connected to mongDB"))
    .catch(err => console.error("error connecting to mongoDB", err))

module.exports = app;