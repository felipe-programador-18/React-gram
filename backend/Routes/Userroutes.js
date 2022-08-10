const express = require("express")
const router = express.Router()

//controller 
const {register, login, getCurrentUser, update, getUserById } = require("../controllers/Usercontrolle") 

//middleware
const validate = require('../middleware/handleValidation')
const {userCreateValidation,
     loginValidation,
     userUpdateValidation
} = require("../middleware/User.validations")

const AuthGuard = require("../middleware/authGuard")
const { uploadImage } = require("../middleware/imageUpload")


//router
router.post("/register", userCreateValidation(), validate,register)
router.post("/login", loginValidation(), validate,login)

router.put("/", AuthGuard, userUpdateValidation(), validate , uploadImage.single("profileImage"),
update)

router.get("/profile", AuthGuard,getCurrentUser)
router.get("/:id",getUserById)


// this use i need agreed here 
router.use("/api/users/register", register)
router.use("api/users/login",login)
//router.use("api/users/profile", getCurrentUser)


module.exports = router;