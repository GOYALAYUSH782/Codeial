const express=require('express');
const router=express.Router();
const usersControllers=require('../controllers/users_controller');
const User=require('../models/user');

router.get('/profile',usersControllers.profile);
router.get('/comments',usersControllers.comment);
router.get('/sign-up',usersControllers.signUp);
router.get('/sign-in',usersControllers.signIn);
router.post('/create-user',usersControllers.createUser);
module.exports=router;