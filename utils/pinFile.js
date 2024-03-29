const axios = require('axios');
const formData = require('form-data');
const config = require('../utils/config');
const fs = require('fs');

const uploadToPinata = async (filePath, name) => {
    const data = new formData();
    data.append('file', fs.createReadStream(filePath));
    data.append('pinataOptions', '{"cidVersion": 1}');
    data.append('pinataMetadata', `{"name": "${name}"}`);

    const pinataData = {
        method: 'post',
        url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
        headers: {
            'Authorization': `Bearer ${config.PINATA_JWT_KEY}`,
            ...data.getHeaders()
        },
        data: data
    };

    try {
        const resp = await axios(pinataData);
        return resp;
    } catch (err) {
        console.error("error pinning file -> ", err.message);
        return err;
    }
};

//call this to remove a product's image when a seller wants to delete his product 
const removeFromPinata = () => { };


module.exports = { uploadToPinata, removeFromPinata }