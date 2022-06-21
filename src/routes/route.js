const express = require('express');
const router = express.Router();
const CowinController= require("../controllers/cowinController")
const memesController = require('../controllers/memeController')



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.get("/cowin/states", CowinController.getStates)
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
router.get("/cowin/getByPin", CowinController.getByPin)

//session in district
router.get('/districtSeesion', CowinController.districtSession)

// getting tempreture of few cities
router.get('/getTemp', CowinController.getTemp)
router.get('/getTempOfCities', CowinController.getTempOfCities)


//getAllMemes
router.post('/getAllMemes', memesController.getAllMemes)



router.post("/cowin/getOtp", CowinController.getOtp)



// WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" for any given district id and for any given date



module.exports = router;