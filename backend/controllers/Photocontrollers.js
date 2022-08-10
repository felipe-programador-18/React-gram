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


module.exports = {
    InsertPhoto
}