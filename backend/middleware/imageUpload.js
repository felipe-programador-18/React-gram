const multer = require("multer")
const path = require("path")

//destination store
const imageStore = multer.diskStorage({
    destination: (req, file, cb) => {
         
        let folder =""
        if(req.baseUrl.includes("users")){
           folder = "users"
        }else if (req.baseUrl.includes("photos")) {
            folder= "photos"
        }
       // this structure care about picture destiny!
        cb(null, `uploads/${folder}/`)
    },
    
    // this structure generate date and generate new name of file !!
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname) )
    }
})

//create function to do upload

const uploadImage = multer({
    storage: imageStore,
    fileFilter(req, file, cb){
     if(!file.originalname.match(/\.(png|jpg)$/)){
      
        //upload of jpg and png file
        
        return cb( new Error("Por favor envie apenas fotos, jpg ou png!") )
     }
     cb(undefined, true)
    }
})





module.exports = {
 uploadImage
};