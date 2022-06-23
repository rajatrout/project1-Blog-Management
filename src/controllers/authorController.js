const authorModel = require("../models/authorModel")

const createAuthor = async function(req, res) {
    try {
        let data = req.body
        const { fname, lname, title, emailId, password } = data

        if (!(fname && lname && title && emailId && password)) {
            return res.status(400).send({ status: false, msg: "Please enter all the details." })
        }
        let duplicate = await authorModel.findOne({ emailId: data.emailId })

        if (duplicate) {
            res.status(400).send({ status: false, msg: "Email Id is already registered." })
        }

        if ((title != 'Mr') && (title != 'Mrs') && (title != 'Miss')) {
            return res.status(400).send({ status: false, msg: "Please enter the correct title (Mr, Mrs, Miss)" })
        }

        if (typeof(fname) !== 'string') {
            return res.status(400).send({ status: false, msg: "First name is not valid" })
        }
        if (typeof(lname) !== 'string') {
            return res.status(400).send({ status: false, msg: "Last name is not valid" })
        }
        if (typeof(emailId) !== 'string') {
            return res.status(400).send({ status: false, msg: "Email is not valid" })
        }
        if (typeof(password) !== 'string') {
            return res.status(400).send({ status: false, msg: "Password is not valid" })
        }

        let saveData = await authorModel.create(data)

        if (!saveData) {
            return res.status(400).send({ status: false, msg: "Data is not created" })
        }

        res.status(201).send({ status: true, data: saveData })

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

const login = async(req, res) => {
    try {
        let username = req.body.emailId
        let password = req.body.password

        let author = await authorModel.findOne({ emailId: username, password: password }).select({ emailId: 1, password: 1 })
        if (!author) {
            return res.status(404).send({ status: false, msg: "Email Id and password are not matched." })
        }

        let token = jwt.sign({ authorId: author._id.toString(), batch: "Radon" }, //payload
            "mahesh-rajat-blog" //secret key
        );
        res.setHeader("x-api-key", token)
        res.status(201).send({ status: true, data: token })

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}


module.exports.createAuthor = createAuthor
module.exports.login = login