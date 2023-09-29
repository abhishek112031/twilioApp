const express=require('express');
const router=express.Router();

//controllers:
const sendWhatsappMessageController=require('../controllers/whatsapp')

router.post('/whatsapp',sendWhatsappMessageController.sendWhatsappMessage);

module.exports=router;