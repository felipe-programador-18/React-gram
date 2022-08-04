const express = require("express")
const router = express.Router()

//controller 
const {register} = require("../controllers/Usercontrolle") 

//middleware
const validate = require('../middleware/handleValidation')
const {userCreateValidation} = require("../middleware/User.validations")

//router
router.post("/register", userCreateValidation(), validate ,register)

// this use i need agreed here 
router.use("/api/users/register", register )

module.exports = router;