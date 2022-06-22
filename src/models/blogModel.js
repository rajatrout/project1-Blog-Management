const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    authorId: {
        type: ObjectId,
        ref: "Author",
        required: true
    },
    tags: [],
    category: {
        type: String,
        required: true
    },
    subCategory: [],
    isPublished: {
        type: Boolean,
        default: false
    },
    publishedAt: Date,
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, { timestamps: true });

module.exports = mongoose.model('Blogs', blogSchema)