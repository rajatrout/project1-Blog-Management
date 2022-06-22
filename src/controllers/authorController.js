const authorModel = require("../models/authorModel")

const createAuthor = async function(req, res) {
    try {
        let data = req.body
        let duplicate = await authorModel.findOne({ emailId: data.emailId })
        if (duplicate) {
            res.status(400).send({ status: false, msg: "Email Id is already registered." })
        }

        let saveData = await authorModel.create(data)
        res.status(201).send({ status: true, data: saveData })

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports.createAuthor = createAuthor