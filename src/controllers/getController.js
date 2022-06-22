const blogModel = require("../models/blogModel")
const authorModel = require("../models/autherModel")


const blogs = async(req, res) => {
    try {
        let blog = await blogModel.find({
            isDeleted: false,
            isPublished: true
        })
        if (blog === null) {
            return res.status(404).send({ status: false, msg: "Document Not Found" })
        }
        res.status(200).send({ status: true, msg: blog })

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

const getBlog = async(req, res) => {
    try {
        let authorId = req.query.authorId
        let category = req.query.category
        let tags = req.query.tags
        let subcategory = req.query.subcategory

        const blogs = await blogModel.find({ authorId: authorId } || { category: category } || { tags: tags } || { subCategory: subcategory })

        res.send({ status: true, msg: blogs })

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}
module.exports.getBlog = getBlog
module.exports.blogs = blogs