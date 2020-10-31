var mongoose = require('mongoose');

var accountSchema = new mongoose.Schema({
    accountId: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    passwordhash: {
        type: String,
        unique: false,
        required: true,
    },
    firstname: {
        type: String,
        unique: false,
        required: true,
    },
    lastname: {
        type: String,
        unique: false,
        required: true,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Account', accountSchema);