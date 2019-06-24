const express = require('express');
const router = express.Router();
const passport= require('passport');
const postsControllers=require('../controllers/posts_controller');

//console.log('post router');
router.post('/create-post',passport.checkAuthentication,postsControllers.Createpost);
router.get('/destroy/:id',passport.checkAuthentication,postsControllers.destroy);
module.exports = router;