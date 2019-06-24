const express=require('express');
const router=express.Router();
const usersControllers=require('../controllers/users_controller');
const User=require('../models/user');
const passport = require('passport');

router.get('/profile',passport.checkAuthentication,usersControllers.profile);
router.get('/sign-up',usersControllers.signUp);
router.get('/sign-in',usersControllers.signIn);
router.post('/create-user',usersControllers.createUser);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
),usersControllers.createSession);
router.get('/sign-out',usersControllers.destroySession);
module.exports=router;