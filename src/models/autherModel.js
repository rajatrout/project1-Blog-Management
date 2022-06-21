const mongoose = require('mongoose');

const autherSchema = new mongoose.Schema( {
    fname: {
        type:String,
        required:true
    },
    lname: {
        type:String,
        required:true
    },
    title: {
        type: String,
        enum: ["Mr", "Mrs", "Miss"],
        required: true
    },
    emailId: {
        type:String,
        unique:true,
        requuired:true
    },
    password: {
        type: String,
        required:true
    },
    
}, { timestamps: true });

module.exports = mongoose.model('Auther', autherSchema) 



