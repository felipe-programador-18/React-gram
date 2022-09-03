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

// create function to get UserId of my users

const GetUserId = async(req, res) => {
  
  const {id} = req.params

  try{
    const photo= await PhotoUser.findById(mongoose.Types.ObjectId(id))
    // check up if exist photo
    if(!photo){
      res.status(404).json({errors:["Foto não encontrada !!"]})
      return;
    } 
    
    res.status(200).json(photo)
  }catch(err){
   res.status(422).json({errors:["Ocorreu um erro, por favor tente mais tarde"]})
  }
  

}

//creating function to photo updated

const UpdatePhoto = async (req,res) => {
  const {id} = req.params ;
  const {title}= req.body ;
  
  const reqUser = req.user ;
  const photo = await PhotoUser.findById(id) 
  console.log("my photo here", photo)
  
  if(!photo){
    res
    .status(404)
    .json({errors:["Foto não encontrada !"]})
   return ;
  }

   //check if photo belongs user!!
   if(!photo.userId.equals(reqUser._id)){
    res
    .status(422)
    .json({errors:["Ocorreu um erro, tente mais tarde"]})
    return ;
   }

   // here verify title about my photo!  
  if(title){
    photo.title = title
  }

  await photo.save()
  
  res.status(200).json({photo, message:"Photo atualizada com sucesso!" })    
}

const LikeFunctionality = async(req, res) => {
  const {id}= req.params;
  const reqUser = req.user ;
  try{
    const photo = await PhotoUser.findById(id)
    //verify with user if not exist
    if(!photo){
      res.status(404).json({erros: ['Foto Não encontrada!']})
      return ;
    }
    
    //verify if my user liked picture
    if(photo.likes.includes(reqUser._id)){
      res.status(422).json({errors:["Voce já curtiu a foto"]})
      return;
    }

    // put in user in likes array
   photo.likes.push(reqUser._id)
   photo.save()

   res
   .status(200)
   .json({photoId:id, userId:reqUser._id ,message:"A foto foi curtida." })

  }catch(err){
    res.status(422).json({errors:["Ocorreu erro, aqui tente novamente mais tarde"]})
    return;
  }

}

const createdComments = async(req,res) => {
  const {id} = req.params;
  const {comment } = req.body;
  
  const reqUser= req.user ;
  
    const user = await User.findById(reqUser._id)
    const photo = await PhotoUser.findById(id)
    
    if(!photo){
      res.status(404).json({errors:["Foto não existe !"]})
    return ;
    }
     
    const userComment = {
      comment,
      userName : user.name,
      userImage: user.profileImage,
      userId : user._id
    }
   
    photo.comments.push(userComment)
    await photo.save()

   res.status(200).json({comment:userComment,
    message:"comentário foi adicionado com sucesso"})

  
}


// search photo by title 

const searchPhoto = async (req,res) => {
  const {q} = req.query ;
  console.log("my q parameters",q)
  
  const photos = await PhotoUser.find({title: new RegExp(q,'i')}).exec()
  console.log('my photos here', photos)

  res.status(200).json({photos})  

}







module.exports = {
    InsertPhoto,
    DeletedPicture,
    GetAllPhoto,
    GetUserPhoto,
    GetUserId,
    UpdatePhoto,
    LikeFunctionality,
    createdComments,
    searchPhoto 
}