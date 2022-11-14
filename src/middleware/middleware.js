const jwt = require("jsonwebtoken");
const validator = require('validator');
const authorModel = require("../models/authorModel");
const blogModel = require("../models/blogModel")

const idV = function(value) {
    let a = validator.isMongoId(value)
    if (!a) {
        return true
    } else return false
}

//<-------------------------    ------------Authentication---------------------------------------------->

const auth = function(req, res, next) {

    try {

        let token = req.headers["X-Api-Key"]
        if (!token) token = req.headers["x-api-key"]

        if (!token) { return res.status(401).send({ status: false, msg: "Token must be present in request headers" }) }
  
        jwt.verify(token, "mahesh-rajat-blog",function(err, decodedToken){ 
            
            if(err) return res.status(401).send({ status: false, msg: "Token is Incorrect" })
            req.token = decodedToken.authorId
            next()
            
        })
        

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

//<-----------------------------Authorization to user to only its own data------------------------------------>

const authorisation = async function(req, res, next) {

    try {
    
        let token = req.headers["X-Api-Key"]
        if (!token) token = req.headers["x-api-key"]

        const blogId = req.params.blogId

        if (idV(blogId)) {
            return res.status(404).send({ status: false, msg: "Blog ID is not valid." })
        }

        const blog = await blogModel.findById(blogId).select({ authorId: 1, _id: 0 })
        if (blog == null) {
            return res.status(404).send({ status: false, msg: "Blog document doesn't exist.." })
        }

        const authorId = blog.authorId.toString()

        const decodedToken = jwt.verify(token, "mahesh-rajat-blog");

        if (authorId != decodedToken.authorId) {

            return res.status(403).send({ status: false, msg: 'Access is Denied' })

        }
        console.log('authorization');
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
    next()
}

module.exports.auth = auth
module.exports.authorisation = authorisation
 