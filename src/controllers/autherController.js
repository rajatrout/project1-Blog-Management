const autherModel = require("../models/autherModel")

const createAuther = async function(req, res) {
    try {
        let data = req.body
        let saveData = await autherModel.create(data)
        res.status(201).send({ status: true, msg: saveData })

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports.createAuther = createAuther