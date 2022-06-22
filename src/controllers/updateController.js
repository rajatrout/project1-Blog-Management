const blogModel = require("../models/blogModel")
const authorModel = require("../models/authorModel")
const mongoose = require('mongoose')

const updateBlog = async function(req, res) {

    let data = req.params.blogId
    const { title, body, tags, subCategory } = req.body

    // Edge Case 1 :- If the blog Id entered by user is not valid.

    if (!mongoose.Types.ObjectId.isValid(data)) {
        return res.status(404).send({ status: false, msg: "Blog ID is not valid." })
    }

    let b = await blogModel.findById(data).select({ _id: 1, isDeleted: 1 })

    // Edge Case 2 :- If the blog Id entered by user is not exists.

    if (b == null) {
        return res.status(400).send({ status: false, msg: "Blog document doesn't exists." })
    }

    // Blog document successfully updated

    let result = await blogModel.findOneAndUpdate({ _id: data }, {
        title: title,
        body: body,
        $addToSet: { tags: tags, subCategory: subCategory }, //$addToSet :- is basically used to add any element in the array type only for one time
        //$push is used as we can add elemetents in the array for multiple number of times.
        isPublished: true,
        publishedAt: Date.now()
    }, { new: true })

    return res.status(200).send({ status: true, data: result })

}




module.exports.updateBlog = updateBlog