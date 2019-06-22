const express = require('express');
const router = express.Router();


const postsControllers=require('../controllers/posts_controller');
//console.log('post router');
router.post('/create-post',postsControllers.Createpost);

module.exports = router;