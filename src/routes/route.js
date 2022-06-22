const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController')
const blogController = require('../controllers/blogController.js')
const getController = require('../controllers/getController.js')
const updateController = require('../controllers/updateController')
const deleteController = require('../controllers/deleteController.js')

router.post("/author", authorController.createAuthor)

router.post("/blogs", blogController.createBlog)

router.get("/blogs", getController.blogs)

router.put("/blogs/:blogId", updateController.updateBlog)

router.delete("/blogs/:blogId", deleteController.deleteBlogByParams)

router.delete("/blogs", deleteController.deleteBlogByQuery)

module.exports = router;