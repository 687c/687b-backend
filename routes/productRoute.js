const productRoute = require('express').Router();
const productController = require('../controllers/productController');

productRoute.get("/", productController.getAllProducts);

productRoute.post("/create", productController.createProduct);

productRoute.get("/fail", productController.testFail);

module.exports = productRoute;
