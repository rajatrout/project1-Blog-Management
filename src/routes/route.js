const express = require('express');
const router = express.Router();
const autherController = require('../controllers/autherController')
const blogController = require('../controllers/blogController')
const updateController = require('../controllers/updateController')
const deleteController = require('../controllers/deleteController.js')
const getController = require('../controllers/getController.js')


router.post("/author", autherController.createAuther)

router.post("/blogs", blogController.createBlog)

router.put("/blogs/:blogId", updateController.updateBlog)

router.delete("/blogs/:blogId", deleteController.deleteBlogByParams)

router.delete("/blogs", deleteController.deleteBlogByQuery)

router.get("/get/Blogs", getController.getBlog)

router.get("/blogs", getController.blogs)



module.exports = router;