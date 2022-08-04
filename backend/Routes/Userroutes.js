const express = require("express")
const router = express.Router()

//controller 
const {register} = require("../controllers/Usercontrolle") 

//router
router.post("/register", register)
router.use("/api/users/register", register )


module.exports = router;