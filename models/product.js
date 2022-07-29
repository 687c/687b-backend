const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    ipfsHash: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    sellerAddress : {
        type: String,
        required: true 
    },
    paid : {
        type: Boolean,
        required: true, 
        default: false
    }
});

productSchema.set('toJSON', {
    transform: (document, transformedUser) => {
        transformedUser.id = transformedUser._id.toString();
        delete transformedUser._id;
    }
});

module.exports = mongoose.model('Product', productSchema);
