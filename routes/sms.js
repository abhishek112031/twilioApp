const express=require('express');
const router=express.Router();

//controller:
const sendMessageController=require('../controllers/sms')

router.post('/sms',sendMessageController.sendMessage)

module.exports=router;