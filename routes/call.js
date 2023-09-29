const express=require('express');
const router=express.Router();

//impoting controller:
const makeCallController=require('../controllers/call')

router.post('/call',makeCallController.makeCall)

module.exports=router;