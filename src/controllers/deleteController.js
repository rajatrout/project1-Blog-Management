const { count } = require("console")
const blogModel = require("../models/blogModel")
const authorModel = require("../models/autherModel")

const deleteBlogByParams = async function(req, res) {
    try {
        let blogId = req.params.blogId

        let b = await blogModel.find().select({ _id: 1 })
        let bArr = b.map((obj) => { return obj._id.toString() })
        console.log(bArr.includes(blogId))
        if (bArr.includes(blogId) == true) {

            let a = await blogModel.updateOne({ _id: blogId, isDeleted: false }, { isDeleted: true, deletedAt: Date.now() })
            return res.send({ status: true, msg: a })

        }
        return res.status(404).send({ status: false, msg: "Blog document doesn't exists." })

    } catch (error) {
        res.status(500).send({ status: false, msg: error })
    }
}


const deleteBlogByQuery = async function(req, res) {
    try {
        let blogData = {}
        let category = req.query.category
        let authorId = req.query.authorId
        let tag = req.query.tag
        let isPublished = req.query.isPublished

        if (category)
            blogData.category = category
        if (authorId)
            blogData.authorId = authorId
        if (tag)
            blogData.tag = tag.toString()
        if (isPublished)
            blogData.isPublished = isPublished

        console.log(blogData)

        let a = await blogModel.updateMany({ blogData }, { isDeleted: true, deletedAt: Date.now() })






        blogData.category = { $in: category }
        let b = await blogModel.find().select({ _id: 1 })
        let bArr = b.map((obj) => { return obj._id.toString() })
        console.log(bArr.includes(blogId))
        if (bArr.includes(blogId) == true) {

            let a = await blogModel.updateOne({ _id: blogId, isDeleted: false }, { isDeleted: true, deletedAt: Date.now() })
            return res.send({ status: true, msg: a })

        }
        return res.status(404).send({ status: false, msg: "Blog document doesn't exists." })

    } catch (error) {
        res.status(500).send({ status: false, msg: error })
    }
}



module.exports.deleteBlogByParams = deleteBlogByParams

module.exports.deleteBlogByQuery = deleteBlogByQuery