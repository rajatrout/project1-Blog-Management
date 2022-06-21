const { count } = require("console")
const blogModel = require("../models/blogModel")
const authorModel = require("../models/autherModel")

const createBlog = async function(req, res) {
    try {
        let blog = req.body
        let authorId = await authorModel.find().select({ _id: 1 })
        let authorIdArr = authorId.map((obj) => { return obj._id.toString() }) // Array formation of all the author id from our Author Collections
        console.log(authorIdArr)

        if (blog.authorId !== undefined) {
            return res.status(400).send({ status: false, msg: "Invale Request" })
        }
        if (authorIdArr.includes(blog.authorId)) {
            return res.status(400).send({ status: false, msg: "Invale Request" })
        }

        let saveData = await blogModel.create(blog)
        res.status(201).send({ status: true, msg: saveData })

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}
module.exports.createBlog = createBlog