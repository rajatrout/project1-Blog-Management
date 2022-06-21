const autherModel= require("../models/autherModel")




const createAuther= async function(req, res) {
    let data= req.body
    let saveData = await autherModel.create(data)
    res.send({ msg: "Created an Entry", data:saveData})
    }



















const createUser= async function (req, res) {
    let data= req.body
    let savedData= await UserModel.create(data)
    res.send({msg: savedData})
}

const getUsersData= async function (req, res) {
    let allUsers= await UserModel.find()
    res.send({msg: allUsers})
}

module.exports.createUser= createUser
module.exports.getUsersData= getUsersData
module.exports.createAuther= createAuther