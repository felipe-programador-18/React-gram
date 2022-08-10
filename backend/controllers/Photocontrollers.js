const PhotoUser = require("../models/photo")
const mongoose = require("mongoose")


// Insert picture User here!!

const InsertPhoto = async (req,res) => {
  const{title} = req.body;
 console.log("test", title)
  const image =  req.file.filename
  console.log("test fdsfs", image)
  console.log(req.body)
   
  res.send("Photo inserted!!")
}


module.exports = {
    InsertPhoto
}