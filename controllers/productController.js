// const User = require('../models/user');
const axios = require('axios');
const config = require('../utils/config');
const { uploadToPinata } = require('../utils/pinFile');
const Product = require('../models/product');

const getAllProducts = async (req, res) => {
    try {
        const resp = await Product.find({});
        res.json(resp);
    } catch (err) {
        console.error("error finding the products", err);
        res.status(500).send({ message: "error fetching products from Mongo" });
    }
}

const createProduct = async (req, res) => {
    const { body, file } = req;

    //CHECK IF THE FILE && BODY EXIST, ELSE SEND A 404
    if (!file || !body) {
        res.status(404).send({ error: "missing body argument" });
        return;
    }

    let resp;
    try {
        const { path, originalname } = file;
        resp = await uploadToPinata(path, originalname);
    } catch (err) {
        res.status(500).send({ err: err.message }).end();
        console.error(err);
        return;
    }

    const ipfsHash = resp.data.IpfsHash;

    const productObject = new Product({
        title: body.title,
        price: body.price,
        description: body.description,
        sellerAddress: body.sellerAddress,
        ipfsHash
    });

    try {
        const resp = await productObject.save();
        res.json(resp);
        // res.json(productObject); //REMOVE THIS
    } catch (err) {
        console.error("error creating a product", err);
        res.status(500).json({ "error": err.message });
    }
}

const testAuthentication = async (req, res) => {
    const url = "https://api.pinata.cloud/data/testAuthentication";

    try {
        const resp = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${config.PINATA_JWT_KEY}`
            }
        });

        res.json(resp.data);
    } catch (err) {
        console.error("error testing auth", err.message);
    }
}

const testFail = async (req, res) => {
    res.status(500).send({ message: "you messed up" });
}

module.exports = { getAllProducts, createProduct, testFail, testAuthentication }
