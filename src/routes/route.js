const express = require('express');
const router = express.Router();
const autherController = require('../controllers/autherController')
const blogController = require('../controllers/blogController.js')

router.post("/auther", autherController.createAuther)

router.post("/blogs", blogController.createBlog)



module.exports = router;