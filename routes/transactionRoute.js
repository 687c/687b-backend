const transactionRoute = require('express').Router();
const transactionController = require('../controllers/transactionController');

transactionRoute.post("/buy", transactionController.buyProduct);

module.exports = transactionRoute;
