const { count } = require("console")
const blogModel = require("../models/blogModel")

const createBlog = async function(req, res) {
    let data = req.body
    let saveData = await blogModel.create(data)
    res.status(201).send({ saveData })
}
module.exports.createBlog = createBlog