const express = require("express")
const route = express.Router();

//controlled



//middleware
const  {photoInsertValidation} = require('../middleware/photoValidation')

const authGuard = require("../middleware/authGuard")
const validate = require("../middleware/handleValidation")

//route




module.exports =  route ;