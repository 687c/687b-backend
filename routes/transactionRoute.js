const transactionRoute = require('express').Router();
const transactionController = require('../controllers/transactionController');

transactionRoute.post("/buy", transactionController.buyProduct);

transactionRoute.post("/confirmed", transactionController.confirmPaid);

module.exports = transactionRoute;
