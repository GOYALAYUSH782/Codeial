const express=require('express');
const router=express.Router();
const usersControllers=require('../controllers/users_controller');

router.get('/profile',usersControllers.profile);
router.get('/comments',usersControllers.comment);
module.exports=router;