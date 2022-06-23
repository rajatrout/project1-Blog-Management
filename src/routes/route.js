const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController')
const blogController = require('../controllers/blogController.js')
const getController = require('../controllers/getController.js')
const middlewareAuth = require('../middleware/middleware.js')


router.post("/author", authorController.createAuthor)

router.post("/login", authorController.login)

router.post("/blogs", blogController.createBlog)

router.get("/blogs", middlewareAuth.auth, getController.blogs)

router.put("/blogs/:blogId/:authorId", middlewareAuth.auth, middlewareAuth.authorisation, blogController.updateBlog)

router.delete("/blogs/:blogId", middlewareAuth.auth, middlewareAuth.authorisation, blogController.deleteBlogByParams)

router.delete("/blogs", blogController.deleteBlogByQuery)

router.post("/login/:authorId", middlewareAuth.auth)
router.post("/m/:authorId", middlewareAuth.authorisation)

module.exports = router;