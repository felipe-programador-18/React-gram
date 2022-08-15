const express = require("express")
const router = express.Router();

//controlled
const { InsertPhoto, DeletedPicture,
     GetAllPhoto, GetUserPhoto,  GetUserId,
    UpdatePhoto } = require("../controllers/Photocontrollers")


//middleware
const  {photoInsertValidation, photoUpdateValidation} = require('../middleware/photoValidation')

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

//to insert dates
router.put("/:id" , authGuard,  photoUpdateValidation(), validate, UpdatePhoto)



 //testing somethings
 //router.use("/api/photos",register, InsertPhoto)


module.exports =  router ;