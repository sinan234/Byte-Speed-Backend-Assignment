const express = require("express");
const identifyController=require('../controller/identifyController')
const router = express.Router();

router.post('/',identifyController.user)

module.exports=router