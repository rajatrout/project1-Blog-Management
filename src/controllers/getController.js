const blogModel = require("../models/blogModel")
const authorModel = require("../models/authorModel")
const validator = require('validator')

const blogs1 = async(req, res) => {
    try {

        let result = {}
        let { authorId, category, tags, subCategory } = req.query

        if (!(authorId || category || tags || subCategory)) {
            return res.status(400).send({ status: false, msg: "Kindly enter any value" })
        }

        // if (authorId != undefined)
        //     result.authorId = authorId
        // if (category != undefined)
        //     result.category = category
        // if (tags != undefined)
        //     result.tags = tags
        // if (subCategory != undefined)
        //     result.subCategory = subCategory

        try {
            console.log(result)
            let final = await blogModel.find({
                $or: [{ authorId: authorId }, { category: category }, {
                    tags: { $in: tags },
                    subCategory: { $in: subCategory }
                }],
                isDeleted: false,
                isPublished: true
            })

            console.log(final)

            return res.status(200).send({ status: true, data: final })

        } catch (error) {
            res.status(500).send({ status: false, msg: error.message })
        }

        let blog = await blogModel.find({
            isDeleted: false,
            isPublished: true
        })
        if (blog === null) {
            return res.status(404).send({ status: false, msg: "Document Not Found" })
        }

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}


const blogs = async(req, res) => {

    let result = { isDeleted: false, isPublished: true }
    let { authorId, category, tags, subCategory } = req.query

    if (authorId) {
        if (!validator.isMongoId(authorId)) {
            return res.status(400).send({ status: false, msg: "Enter valid authorId" })
        } else {
            result.authorId = authorId
        }
    }

    if (category) {
        result.category = category
    }

    if (tags) {
        result.tags = { $in: [tags] }
    }
    if (subCategory) {
        result.subCategory = { $in: [subCategory] }
    }

    console.log(result)

    let blog = await blogModel.find(result)
    console.log(blog)
    return res.status(200).send({ status: true, data: blog })
}

module.exports.blogs = blogs;