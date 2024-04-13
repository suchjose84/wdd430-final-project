const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    itemId: {
        type: String

    },
    itemName: {
        type: String
    },
    price: {
        type: String
    },
    stock: {
        type: String
    }
});

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    storeName: {
        type: String
    },
    forSaleItems: [itemSchema]
}, {
    versionKey: false,
    collection: 'users'
});

module.exports = mongoose.model('User', userSchema);
