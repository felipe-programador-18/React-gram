const express = require("express")
const router = express.Router();

//controlled
const { InsertPhoto, DeletedPicture,
     GetAllPhoto, GetUserPhoto,  GetUserId,
    UpdatePhoto, LikeFunctionality,
    createdComments, searchPhoto } = require("../controllers/Photocontrollers")


//middleware
const  {photoInsertValidation, photoUpdateValidation, commentsValidation} = require('../middleware/photoValidation')

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

// to make search about my user last router
router.get("/search" , authGuard, searchPhoto)


router.get("/:id", authGuard,  GetUserId )
//to insert dates
router.put("/:id" , authGuard,  photoUpdateValidation(), validate, UpdatePhoto)
router.put("/like/:id" , authGuard,LikeFunctionality)
router.put("/comment/:id" ,authGuard, commentsValidation(),validate,createdComments)




 //testing somethings
 //router.use("/api/photos",register, InsertPhoto)


module.exports =  router ;