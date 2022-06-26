const authorModel = require("../models/authorModel")
const validator = require('validator');
const jwt = require('jsonwebtoken')

// Checks the validity of requested body is string or not
const stringV = function(value) {
    let a = typeof(value)
    if (a !== 'string') {
        return true
    } else return false
}

const createAuthor = async function(req, res) {
    try {

        const { fname, lname, title, emailId, password } = req.body

        if (!(fname && lname && title && emailId && password)) {
            return res.status(400).send({ status: false, msg: "Please enter all the details." })
        } // Here we can also add more edge cases so that if any of the details is absent if(fanme.length ==0)

        if (stringV(fname) || !validator.isAlpha(fname)) {
            return res.status(400).send({ status: false, msg: "First name is not valid" })
        }
        if (stringV(lname) || !validator.isAlpha(lname)) {
            return res.status(400).send({ status: false, msg: "Last name is not valid" })
        }

        if ((title != 'Mr') && (title != 'Mrs') && (title != 'Miss')) {
            return res.status(400).send({ status: false, msg: "Please enter the correct title (Mr, Mrs, Miss)" })
        }

        if (stringV(emailId) || !validator.isEmail(emailId)) {
            return res.status(400).send({ status: false, mgs: "Email Id is not in correct format." })
        }

        let duplicate = await authorModel.findOne({ emailId: emailId })
        if (duplicate) {
            return res.status(400).send({ status: false, msg: "Email Id is already registered." })
        }

        if (stringV(password)) {
            return res.status(400).send({ status: false, msg: "Password is not in correct format" })
        }

        if (password.length < 8) {
            return res.status(400).send({ status: false, msg: "Password should have atleast 8 charactes." })
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).send({ status: false, msg: "Kindly use atleast one uppercase alphabets, numbers and special characters for strong password." })
        }

        let duplicatePassword = await authorModel.findOne({ password: password })
        if (duplicatePassword) {
            return res.status(400).send({ status: false, msg: "Password is very common, try to use different password." })
        }

        let saveData = await authorModel.create(req.body)

        // if (!saveData) {
        //     return res.status(400).send({ status: false, msg: "Data is not created" })
        // }

        res.status(201).send({ status: true, data: saveData })

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

const login = async(req, res) => {
    try {
        let username = req.body.emailId
        let password = req.body.password

        if (!username || !password) {
            return res.status(400).send({ status: false, msg: "Please Enter email id and password both." })
        }

        let author = await authorModel.findOne({ emailId: username }).select({ emailId: 1, password: 1 })
        if (!author) {
            return res.status(404).send({ status: false, msg: "Please enter correct email." })
        }


        if (password !== author.password) {
            return res.status(400).send({ status: false, msg: "Email Id and password are not matched. Enter the correct password." })
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