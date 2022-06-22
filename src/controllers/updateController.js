const blogModel = require("../models/blogModel")
const authorModel = require("../models/autherModel")

const updateBlog = async function(req, res) {
    try {
        let blogId = req.params.blogId
        let title = req.query.title
        let body = req.query.body
        let t = req.query.tags
        let sub = req.query.subCategory

        let b = await blogModel.find().select({ _id: 1 })
        let bArr = b.map((obj) => { return obj._id.toString() })

        if (bArr.includes(blogId)) {

            let m = await blogModel.find({ _id: blogId })

            let result = await blogModel.findOneAndUpdate({ _id: blogId }, {
                title: title,
                body: body,
                $addToSet: { tags: t, subCategory: sub }, //$addToSet :- is basically used to add any element in the array type only for one time
                //$push is used as we can add elemetents in the array for multiple number of times.
                isPublished: true,
                publishedAt: Date.now()
            }, { new: true })

            return res.status(200).send({ status: true, msg: result })

        }
        return res.status(404).send({ status: false, msg: "Blog document doesn't exists." })

    } catch (error) {
        res.status(500).send({ status: false, msg: error })
    }
}

module.exports.updateBlog = updateBlog