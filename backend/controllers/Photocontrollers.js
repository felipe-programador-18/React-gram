const PhotoUser = require("../models/Photo")
const User = require("../models/User")
const mongoose = require("mongoose")


// Insert picture User here!!

const InsertPhoto = async (req,res) => {
  const{title} = req.body;
  const image =  req.file.filename
   
    const reqUser = req.user
    const user = await User.findById(reqUser._id)
    console.log("my users here", user)

    const newPhoto = await PhotoUser.create({
     title,
     image,
     userId: user._id,
     userName: user.name,
    })

    //if picture was created with sucefully return dates about picture!!
    if(!newPhoto){
        res.status(422).json({
        errors:["Houve um problema, por favor tente mais tarde !!"]
        })
    }

 
    res.status(201).json(newPhoto)

}

//created new users to deleted picture

const DeletedPicture =  async( req, res) => {
    const {id} = req.params ;
    console.log("testing my parameter!", id)
    const reqUser = req.user;
    
    console.log("testing about my code", reqUser )

   try{ 
   
    const photo = await PhotoUser.findById(mongoose.Types.ObjectId(id))
     
    // verify if photo exist 
     if(!photo){
        res.status(404).json({errors: ["Foto não encontrada"]})
        return ;
      }
       
    // check if picture belongs to user
    
    if(!photo.userId.equals(reqUser._id)){
        res.status(422).json({errors:['Ocorreu um erro, por favor tente novamente mais tarde.']})
    }

      await PhotoUser.findByIdAndDelete(photo._id)

    res
    .status(200)
    .json({id:photo._id, message:' Foto excluída com sucesso.'})
    

    }catch(err){
    
    res.status(404).json({errors:['Ocorreu um erro,tente daqui a pouco.']})
    
    return; 
    } 
}

// get all photos!!
const GetAllPhoto = async (req,res) =>{
  
  const photos = await PhotoUser.find({})
  .sort([["createdAt", -1]])
  .exec();

  return res.status(200).json(photos)
}

//get user photos

const GetUserPhoto = async(req, res) => {
  const {id}= req.params ;

  const photo = await PhotoUser
  .find({userId: id})
  .sort([["createdAt", -1]]).exec()

  return res.status(200).json(photo)

}

module.exports = {
    InsertPhoto,
    DeletedPicture,
    GetAllPhoto,
    GetUserPhoto
}