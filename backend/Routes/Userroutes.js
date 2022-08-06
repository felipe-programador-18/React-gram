const express = require("express")
const router = express.Router()

//controller 
const {register, login, getCurrentUser} = require("../controllers/Usercontrolle") 

//middleware
const validate = require('../middleware/handleValidation')
const {userCreateValidation,
     loginValidation} = require("../middleware/User.validations")

const AuthGuard = require("../middleware/authGuard")


//router
router.post("/register", userCreateValidation(), validate,register)
router.post("/login", loginValidation(), validate,login)
router.get("/profile", AuthGuard,getCurrentUser)



// this use i need agreed here 
router.use("/api/users/register", register)
router.use("api/users/login",login)
//router.use("api/users/profile", getCurrentUser)


module.exports = router;