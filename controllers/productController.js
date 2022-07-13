// const User = require('../models/user');
const Product = require('../models/product');

const getAllProducts = async (req, res) => {
    // try {
    //     const resp = await Product.find({});
    //     res.json(resp);
    // } catch (err) {
    //     console.log("error encountered while fetching all products ->", err);
    //     resp.status(500).json({ "error": err.message });
    // }
    res.send("this is the one");
}

const createProduct = async (req, res) => {
    const { body } = req;

    //do  uploading to ipfs here
    //after grabbing the image from the body object

    const productObject = {
        title: body.title,
        price: body.price,
        description: body.description,
        image_uri: body.image_uri,
        hash: body.hash,
    }

    try {
        // const resp = await Product.save(productObject);
        // res.json(resp);
        res.json(productObject); //REMOVE THIS
    } catch (err) {
        console.error("error creating a product", err);
        res.json({ "error": err.message });
    }
}

const testFail = async (req, res) => {
	res.status(500).send({message: "you messed up"});
}

module.exports = { getAllProducts, createProduct, testFail }
