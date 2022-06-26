const jwt = require("jsonwebtoken");
const validator = require('validator');
const authorModel = require("../models/authorModel");
const blogModel = require("../models/blogModel")


const stringV = function(value) {
    let a = typeof(value)
    if (a !== 'string') {
        return true
    } else return false
}

const idV = function(value) {
    let a = validator.isMongoId(value)
    if (!a) {
        return true
    } else return false
}

//<-------------------------    ------------Authentication---------------------------------------------->

const auth = async function(req, res, next) {

    try {

        let token = req.headers["X-Api-Key"]
        if (!token) token = req.headers["x-api-key"]

        if (!token) { return res.status(400).send({ status: false, msg: "Token must be present in request headers" }) }

        let decoded = jwt.decode(token)
        if (!decoded) {
            return res.status(400).send({ status: false, msg: "Token is Incorrect" })
        }

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }

    next()
}

//<-----------------------------Authorization to user to only its own data------------------------------------>

const authorisation = async function(req, res, next) {

    try {
        let token = req.headers["X-Api-Key"]
        if (!token) token = req.headers["x-api-key"]

        let blogId = req.params
        let b = Object.values(blogId).toString()

        if (idV(b)) {
            return res.status(404).send({ status: false, msg: "Blog ID is not valid." })
        }

        let a = await blogModel.findById(b).select({ authorId: 1, _id: 0 })
        if (a == null) {
            return res.status(400).send({ status: false, msg: "Blog document doesn't exist with this BlogId." })
        }

        let authorId = a.authorId.toString()

        let decodedToken = jwt.verify(token, "mahesh-rajat-blog");

        if (authorId != decodedToken.authorId) {

            return res.send({ status: false, msg: 'Access is Denied' })

        }
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
    // return console.log("Ok")

    next()
}

module.exports.auth = auth
module.exports.authorisation = authorisation