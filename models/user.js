const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    //the seller / buyer address
    walletAddress: {
        type: String,
        required: true
    },
    avatarUrl: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    }
});

userSchema.set('toJSON', {
    transform: (document, transformedUser) => {
        transformedUser.id = transformedUser._id.toString();
        delete transformedUser._id;
    }
});

module.exports = mongoose.model('User', userSchema);