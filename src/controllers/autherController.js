const autherModel = require("../models/autherModel")

const createAuther = async function(req, res) {
    let data = req.body
    let saveData = await autherModel.create(data)
    res.status(201).send({ saveData })
}


module.exports.createAuther = createAuther