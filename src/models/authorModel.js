const mongoose = require('mongoose');
const validator = require('validator');

const authorSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    title: {
        type: String,
        enum: ["Mr", "Mrs", "Miss"],
        required: true
    },
    emailId: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },

}, { timestamps: true });

module.exports = mongoose.model('Auther', authorSchema)