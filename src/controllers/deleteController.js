const blogModel = require("../models/blogModel")
const authorModel = require("../models/authorModel")
const mongoose = require('mongoose')


const deleteBlogByParams = async function(req, res) {
    try {
        let data = req.params.blogId

        // Edge Case 1 :- If the blog Id entered by user is not valid.

        if (!mongoose.Types.ObjectId.isValid(data)) {
            return res.status(404).send({ status: false, msg: "Blog ID is not valid." })
        }

        let b = await blogModel.findById(data).select({ _id: 1, isDeleted: 1 })

        // Edge Case 2 :- If the blog Id entered by user is not exists.

        if (b == null) {
            return res.status(400).send({ status: false, msg: "Blog document doesn't exists." })
        }

        // Edge Case 3 :- If the blog Id entered by user is already deleted.

        if (b.isDeleted == true) {
            return res.status(400).send({ status: false, msg: "Blog already deleted" })
        }

        // Blog document successfully deleted.

        let a = await blogModel.updateOne({ _id: data, isDeleted: false }, { isDeleted: true, deletedAt: Date.now() })
        return res.status(200).send({ status: true, data: a })

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}


const deleteBlogByQuery = async function(req, res) {
    try {
        let blogData = {}
        let category = req.query.category
        let authorId = req.query.authorId
        let tags = req.query.tags
        let isPublished = req.query.isPublished
        let blogId = req.query.blogId

        if (category)
            blogData.category = category
        if (authorId)
            blogData.authorId = authorId
        if (tags)
            blogData.tags = { $in: tags.split(',') }
        if (isPublished)
            blogData.isPublished = isPublished

        console.log(blogData)

        let b = await blogModel.find().select({ _id: 1 })

        let bArr = b.map((obj) => { return obj._id.toString() })

        console.log(bArr.includes(blogId))
        if (bArr.includes(blogId)) {

            let a = await blogModel.updateMany(blogData, { isDeleted: true, deletedAt: Date.now() })
            return res.status(200).send({ status: true, data: a })

        }
        return res.status(404).send({ status: false, msg: "Blog document doesn't exists." })

    } catch (error) {
        res.status(500).send({ status: false, msg: error })
    }
}



module.exports.deleteBlogByParams = deleteBlogByParams

module.exports.deleteBlogByQuery = deleteBlogByQuery