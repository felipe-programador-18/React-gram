const express = require("express")
const router = express.Router();

//controlled
const { InsertPhoto } = require("../controllers/Photocontrollers")

//testing here
const {register} = require("../controllers/Usercontrolle")


//middleware
const  {photoInsertValidation} = require('../middleware/photoValidation')
const {uploadImage} = require("../middleware/imageUpload")
const authGuard = require("../middleware/authGuard")
const validate = require("../middleware/handleValidation")


//route
router.post("/" ,authGuard,
 uploadImage.single("image")
 , photoInsertValidation()
 , validate
 ,InsertPhoto)





 //testing somethings
 //router.use("/api/photos",register, InsertPhoto)


module.exports =  router ;