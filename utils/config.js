require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;

const PINATA_API_KEY = process.env.PINATA_API_KEY;

const PINATA_SECRET_API_KEY = process.env.PINATA_SECRET_API_KEY;

const PINATA_JWT_KEY = process.env.PINATA_JWT_KEY;

module.exports = {
    MONGO_URI, PORT, PINATA_API_KEY, PINATA_SECRET_API_KEY, PINATA_JWT_KEY
}