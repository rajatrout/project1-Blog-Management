const { count } = require("console")
const blogModel = require("../models/blogModel")
const authorModel = require("../models/authorModel")

const createBlog = async function(req, res) {
    try {
        let data = req.body
        let authorId = await authorModel.find().select({ _id: 1 })
        let authorIdArr = authorId.map((obj) => { return obj._id.toString() })

        // Edge Case 1 :- If user did not give any authorId 

        if ((data.authorId) == null) {
            return res.status(400).send({ status: false, msg: "Invalid Request" })
        }

        // Edge Case 2 :- If user give invalid authorId (which is not available inside author documents or the id is wrong)

        if (!authorIdArr.includes(data.authorId)) {
            return res.status(400).send({ status: false, msg: "Invalid Author ID" })
        }


        // Edge Case 3 :- The blog is created. 

        if (authorIdArr.includes(data.authorId)) {

            let saveData = await blogModel.create(data)
            return res.status(201).send({ status: true, data: saveData })

        }
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports.createBlog = createBlog