const { count } = require("console")
const blogModel = require("../models/blogModel")
const authorModel = require("../models/authorModel")
const validator = require('validator');
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");


const stringV = function(value) {
    let a = typeof(value)
    if (a !== 'string') {
        return true
    } else return false
}

const idV = function(value) {
    let a = validator.isMongoId(value)
    if (!a) {
        return true
    } else return false
}

//<--------------------------------------------Creating Blog------------------------------------------------->

const createBlog = async function(req, res) {

    try {
        const { title, body, authorId, tags, category, subCategory, isPublished } = req.body

        if ((authorId) == null) {
            return res.status(400).send({ status: false, msg: "Invalid Request" })
        }

        if (stringV(title)) {
            return res.status(400).send({ status: false, msg: "Title is not valid" })
        }
        if (stringV(body)) {
            return res.status(400).send({ status: false, msg: "Body is not valid" })
        }

        if (stringV(authorId) || idV(authorId)) {
            return res.status(404).send({ status: false, msg: "Author ID is not valid." })
        }

        if (typeof(tags) !== `object`) {
            return res.status(400).send({ status: false, msg: "Tags are not valid" })
        }

        if (stringV(category) || !validator.isAlpha(category)) {
            return res.status(400).send({ status: false, msg: "Category is not valid" })
        }

        if (typeof(subCategory) !== `object`) {
            return res.status(400).send({ status: false, msg: "Sub-Category is not valid" })
        }

        let a = await authorModel.findById(authorId).select({ _id: 1 })
        if (a == null) {
            return res.status(400).send({ status: false, msg: "Author ID doesn't exist's." })
        }

        if (isPublished == true) {
            req.body.publishedAt = Date.now()
            let saveData = await blogModel.create(req.body)
            return res.status(201).send({ status: true, data: saveData })
        }

        let saveData = await blogModel.create(req.body)
        return res.status(201).send({ status: true, data: saveData })

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}


//<--------------------------------------------Get Blog details------------------------------------------------->

const getblogs = async(req, res) => {
    try {
        let result = { isDeleted: false, isPublished: true }
        let { authorId, category, tags, subCategory } = req.query

        if (authorId) {
            if (idV(authorId)) {
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
        if (blog == null) {
            return res.status(404).send({ status: true, msg: "No document found." })
        }

        return res.status(200).send({ status: true, data: blog })
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}


//<--------------------------------------------Update Blog------------------------------------------------->

const updateBlog = async function(req, res) {

    try {
        let data = req.params.blogId
        const { title, body, tags, subCategory } = req.body

        if (!(title && body && tags && subCategory)) {
            return res.status(400).send({ status: false, msg: "Please enter all details (Title, Body, tags, subCategory)." })
        }

        let b = await blogModel.findById(data).select({ _id: 1, isDeleted: 1 })
        if (b.isDeleted == true) {
            return res.status(404).send({ status: false, msg: "Blog is deleted" })
        }

        let result = await blogModel.findOneAndUpdate({ _id: data }, {
            title: title,
            body: body,
            $addToSet: { tags: tags, subCategory: subCategory }, //$addToSet :- is basically used to add any element in the array type only for one time
            //$push is used as we can add elemetents in the array for multiple number of times.
            isPublished: true,
            publishedAt: Date.now()
        }, { new: true })

        return res.status(200).send({ status: true, data: result })

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}


//<--------------------------------------Delete Blog by Path Parameters---------------------------------------->

const deleteBlogByParams = async function(req, res) {
    try {
        let data = req.params.blogId

        let b = await blogModel.findById(data).select({ _id: 1, isDeleted: 1 })

        if (b.isDeleted == true) {
            return res.status(404).send({ status: false, msg: "Blog already deleted" })
        }

        let a = await blogModel.updateOne({ _id: data, isDeleted: false }, { isDeleted: true, deletedAt: Date.now() })
        return res.status(200).send({ status: true, data: "The blog is deleted" })

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}


//<--------------------------------------------Delete Blog by Query Parameters------------------------------------------------->

const deleteBlogByQuery = async function(req, res) {
    const { category, authorId, isPublished, tags, subCategory } = req.query

    if (!(category || authorId || isPublished || tags || subCategory)) {
        return res.status(400).send({ status: false, msg: "Kindly enter any value" })
    }

    if (stringV(authorId) || idV(authorId)) {
        return res.status(400).send({ status: false, msg: "Author ID is not valid." })
    }
    // console.log(authorId)

    let b = await blogModel.find({ authorId: authorId }).select({ _id: 1, isDeleted: 1 })

    if (b == null) {
        return res.status(404).send({ status: false, msg: "Blog document doesn't exists." })
    }

    let token = req.headers["x-Api-key"]
    if (!token) token = req.headers["x-api-key"]
    let decodedToken = jwt.verify(token, "mahesh-rajat-blog");


    let authorLoggedIn = decodedToken.authorId

    if (authorId != authorLoggedIn) {

        return res.status(403).send({ status: false, msg: 'Access is Denied' })

    }

    const d = await blogModel.updateMany({
        $or: [{ category: category },
            { authorId: authorId },
            { tags: { $in: [tags] } },
            { subCategory: { $in: [subCategory] } }
        ]
    }, { isDeleted: true, deletedAt: Date.now(), new: true })

    return res.status(200).send({ status: true, data: d })
}




module.exports.createBlog = createBlog
module.exports.getblogs = getblogs;
module.exports.updateBlog = updateBlog
module.exports.deleteBlogByParams = deleteBlogByParams
module.exports.deleteBlogByQuery = deleteBlogByQuery