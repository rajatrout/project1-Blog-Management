const { count } = require("console")
const blogModel = require("../models/blogModel")
const authorModel = require("../models/autherModel")

const updateBlog = async function(req, res) {
    try {
        let blogId = req.params.blogId
        let title = req.query.title
        let body = req.query.body
        let t = req.query.tags
        let sub = req.query.subcategory

        console.log(t)

        let b = await blogModel.find().select({ _id: 1 })
        let bArr = b.map((obj) => { return obj._id.toString() })
        console.log(bArr.includes(blogId))

        if (bArr.includes(blogId) == true) {

            let m = await blogModel.find({ _id: blogId })
            let x = m.tags.push(t)
            let y = m.subcategory.push(sub)

            let result = await blogModel.updateOne({ _id: blogId }, { title: title, body: body, tags: x, subcategory: y, isPublished: true, publishedAt: Date.now() }, { new: true })
            return res.status(200).send({ status: true, msg: result })

        }
        return res.status(404).send({ status: false, msg: "Blog document doesn't exists." })

    } catch (error) {
        res.status(500).send({ status: false, msg: error })
    }
}

module.exports.updateBlog = updateBlog