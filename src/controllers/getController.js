const { count } = require("console")
const blogModel = require("../models/blogModel")
const authorModel = require("../models/authorModel")


const blogs = async(req, res) => {
    try {
        let blog = await blogModel.find({
            isDeleted: false,
            isPublished: true
        })
        if (blog === null) {
            return res.status(404).send({ status: false, msg: "Document Not Found" })
        }

        let result = {}
        let authorId = req.query.authorId
        let category = req.query.category
        let tags = req.query.tags
        let subCategory = req.query.subCategory
        console.log(authorId)

        if (authorId != undefined)
            result.authorId = authorId
        if (category != undefined)
            result.category = category
        if (tags != undefined)
            result.tags = { $in: tags.split(',') }
        if (subCategory != undefined)
            result.subCategory = { $in: tags.split(',') }

        console.log(tags.split(','))

        console.log(result)
        let final = await blogModel.find(result)
        console.log(final)

        res.status(200).send({ status: true, data: final })

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}



module.exports.blogs = blogs
    //module.exports.blogs1 = blogs1