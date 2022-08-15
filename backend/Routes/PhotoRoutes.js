const express = require("express")
const router = express.Router();

//controlled
const { InsertPhoto, DeletedPicture, GetAllPhoto, GetUserPhoto,  GetUserId } = require("../controllers/Photocontrollers")


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

router.delete("/:id" ,authGuard, DeletedPicture ) 
router.get("/", authGuard, GetAllPhoto )
router.get("/user/:id", authGuard, GetUserPhoto )
router.get("/:id", authGuard,  GetUserId )



 //testing somethings
 //router.use("/api/photos",register, InsertPhoto)


module.exports =  router ;