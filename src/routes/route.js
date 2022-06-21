const express = require('express');
const router = express.Router();
const autherController = require('../controllers/autherController')




router.post("/auther", autherController.createAuther)



module.exports = router;