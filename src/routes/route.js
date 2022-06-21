const express = require('express');
const router = express.Router();
const autherController = require('../controllers/autherController')
const blogController = require('../controllers/blogController.js')
const getController = require('../controllers/getController.js')



router.post("/author", autherController.createAuther)

router.post("/blogs", blogController.createBlog)

router.get("/get/Blogs", getController.getBlog)

router.get("/blogs", getController.blogs)


module.exports = router;