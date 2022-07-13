const User = require('../models/user');

const getAllUsers = async (req, res) => {
    try {
        const resp = await User.find({});
        res.json(resp);
    } catch (err) {
        console.log("error encoutered while fetching all users ->", err);
        resp.status(500).json({ "error": err.message });
    }
}

module.exports = { getAllUsers }
//when a user connects wallet check if his/her address is listed on our db
//if not add it if he/she consents
