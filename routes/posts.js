const express = require('express');
const router = express.Router();
const postsControllers=require('../controllers/posts_controller');
router.get('/first',postsControllers.post);

module.exports = router;